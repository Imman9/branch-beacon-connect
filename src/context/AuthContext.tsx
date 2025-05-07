
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
              const user = await fetchUserProfile(newSession.user.id);
              let branch = null;
              
              if (user?.branchId) {
                branch = await fetchBranchById(user.branchId);
              }
              
              setAuthState({
                user: {
                  ...user!,
                  email: newSession.user.email || '',
                },
                branch,
                isAuthenticated: true,
                isLoading: false,
              });
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setAuthState(initialState);
        }
        
        setSession(newSession);
      }
    );

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession?.user) {
        // Use setTimeout to prevent potential deadlock
        setTimeout(async () => {
          const user = await fetchUserProfile(currentSession.user.id);
          let branch = null;
          
          if (user?.branchId) {
            branch = await fetchBranchById(user.branchId);
          }
          
          setAuthState({
            user: {
              ...user!,
              email: currentSession.user.email || '',
            },
            branch,
            isAuthenticated: !!user,
            isLoading: false,
          });
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
        description: "Welcome back to Church Connect!",
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
      await signUpWithEmail(credentials);
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
      setAuthState({ ...authState, isLoading: false });
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
