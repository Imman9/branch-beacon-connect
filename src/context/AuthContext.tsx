
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState, User, Branch } from "../types/auth";

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchBranch: (branchId: string) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  branch: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Mock data for demonstration
  const mockUser: User = {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    branchId: "1",
    role: "member",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockBranch: Branch = {
    id: "1",
    name: "Main Branch",
    location: "123 Main St, City",
    description: "Our main church branch",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true });
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Successful login
      setAuthState({
        user: mockUser,
        branch: mockBranch,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({ ...initialState, isLoading: false });
      throw error;
    }
  };

  const logout = () => {
    setAuthState(initialState);
  };

  const switchBranch = async (branchId: string) => {
    setAuthState({ ...authState, isLoading: true });
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to get the branch details
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newBranch: Branch = {
        id: branchId,
        name: `Branch ${branchId}`,
        location: `Location ${branchId}`,
        description: `Description for Branch ${branchId}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setAuthState({
        ...authState,
        branch: newBranch,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({ ...authState, isLoading: false });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, switchBranch }}>
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
