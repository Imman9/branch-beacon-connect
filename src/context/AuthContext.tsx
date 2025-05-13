
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthState, User, Branch } from "../types/auth";
import { supabase } from "@/integrations/supabase/client";
import { 
  fetchUserProfile, 
  fetchBranchById, 
  loginWithEmail, 
  signUpWithEmail, 
  logout as signOut,
  updateUserBranch,
  LoginCredentials,
  SignUpCredentials
} from "@/services/supabaseAuth";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  switchBranch: (branchId: string) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  branch: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setAuthState((prevState) => ({ ...prevState, isLoading: true }));
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Use setTimeout to prevent potential deadlock with onAuthStateChange
          setTimeout(async () => {
            if (newSession?.user) {
              try {
                const user = await fetchUserProfile(newSession.user.id);
                let branch = null;
                
                if (user?.branchId) {
                  branch = await fetchBranchById(user.branchId);
                }
                
                // Even if fetchUserProfile fails, we should still authenticate with basic user info
                setAuthState({
                  user: user || {
                    id: newSession.user.id,
                    email: newSession.user.email || '',
                    firstName: '',
                    lastName: '',
                    role: 'member',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  branch,
                  isAuthenticated: true,
                  isLoading: false,
                });
              } catch (error) {
                console.error("Error in auth state change:", error);
                // Still authenticate the user even on error
                setAuthState({
                  user: {
                    id: newSession.user.id,
                    email: newSession.user.email || '',
                    firstName: '',
                    lastName: '',
                    role: 'member',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  branch: null,
                  isAuthenticated: true,
                  isLoading: false,
                });
              }
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setAuthState({...initialState, isLoading: false});
        }
        
        setSession(newSession);
      }
    );

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession?.user) {
        // Use setTimeout to prevent potential deadlock
        setTimeout(async () => {
          try {
            const user = await fetchUserProfile(currentSession.user.id);
            let branch = null;
            
            if (user?.branchId) {
              branch = await fetchBranchById(user.branchId);
            }
            
            // Even if profile fetch fails, still authenticate with basic user info
            setAuthState({
              user: user || {
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                firstName: '',
                lastName: '',
                role: 'member',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              },
              branch,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error("Error in initial session check:", error);
            // Still authenticate the user even on error
            setAuthState({
              user: {
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                firstName: '',
                lastName: '',
                role: 'member',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              },
              branch: null,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        }, 0);
      } else {
        setAuthState({ ...initialState, isLoading: false });
      }
      
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState({ ...authState, isLoading: true });
    
    try {
      await loginWithEmail(credentials);
      // Auth state will be updated by the listener
      toast({
        title: "Login successful",
        description: "Welcome back to Repentance and Holiness!",
      });
    } catch (error) {
      const err = error as Error;
      setAuthState({ ...authState, isLoading: false });
      toast({
        title: "Login failed",
        description: err.message || "Check your email and password.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (credentials: SignUpCredentials) => {
    setAuthState({ ...authState, isLoading: true });
    
    try {
      const response = await signUpWithEmail(credentials);
      
      // In development mode, sign in the user automatically after registration
      // instead of waiting for email confirmation
      if (response.user) {
        toast({
          title: "Registration successful",
          description: "Your account has been created and you're now logged in.",
        });
        // The auth listener will handle setting up the session
      } else {
        setAuthState({ ...authState, isLoading: false });
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      const err = error as Error;
      setAuthState({ ...authState, isLoading: false });
      toast({
        title: "Registration failed",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    setAuthState({ ...authState, isLoading: true });
    
    try {
      await signOut();
      // Auth state will be updated by the listener
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      const err = error as Error;
      setAuthState({ ...authState, isLoading: false });
      toast({
        title: "Logout failed",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const switchBranch = async (branchId: string) => {
    if (!authState.user) return;
    
    setAuthState({ ...authState, isLoading: true });
    
    try {
      await updateUserBranch(authState.user.id, branchId);
      const branch = await fetchBranchById(branchId);
      
      setAuthState({
        ...authState,
        branch,
        isLoading: false,
      });
      
      toast({
        title: "Branch switched",
        description: `You are now connected to ${branch?.name}`,
      });
    } catch (error) {
      const err = error as Error;
      setAuthState({ ...authState, isLoading: false });
      toast({
        title: "Failed to switch branch",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, switchBranch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
