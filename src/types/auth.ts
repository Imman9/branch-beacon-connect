export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  branchId?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'branch_admin' | 'member' | 'guest';

export interface Branch {
  id: string;
  name: string;
  location: string;
  description?: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  branch: Branch | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
