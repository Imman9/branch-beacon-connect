
import { supabase } from "@/integrations/supabase/client";
import { User, Branch, AuthState, UserRole } from "@/types/auth";

export interface SignUpCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  branchId: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Get user profile data from profiles table
export const fetchUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, branches:branch_id(*)")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  if (!data) return null;

  const branch = data.branches ? {
    id: data.branches.id,
    name: data.branches.name,
    location: data.branches.location,
    description: data.branches.description,
    logo: data.branches.logo,
    createdAt: data.branches.created_at,
    updatedAt: data.branches.updated_at
  } : null;

  return {
    id: data.id,
    email: "", // Email is not stored in profiles table for security
    firstName: data.first_name,
    lastName: data.last_name,
    branchId: data.branch_id,
    role: data.role as UserRole,
    avatar: data.avatar,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Fetch all branches for branch selector - Modified to work for unauthenticated users
export const fetchBranches = async (): Promise<Branch[]> => {
  try {
    // Use the anon key for this request since it's needed for registration
    const { data, error } = await supabase
      .from("branches")
      .select("*");

    if (error) {
      console.error("Error fetching branches:", error);
      return [];
    }

    return data.map(branch => ({
      id: branch.id,
      name: branch.name,
      location: branch.location,
      description: branch.description,
      logo: branch.logo,
      createdAt: branch.created_at,
      updatedAt: branch.updated_at
    }));
  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
};

// Fetch a specific branch by ID
export const fetchBranchById = async (branchId: string): Promise<Branch | null> => {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("id", branchId)
    .single();

  if (error || !data) {
    console.error("Error fetching branch:", error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    location: data.location,
    description: data.description,
    logo: data.logo,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Login with email and password
export const loginWithEmail = async ({ email, password }: LoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Signup with email, password, and profile info
export const signUpWithEmail = async ({ email, password, firstName, lastName, branchId }: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        branch_id: branchId,
      },
    },
  });

  if (error) throw error;
  return data;
};

// Logout the current user
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Update user's branch
export const updateUserBranch = async (userId: string, branchId: string) => {
  const { error } = await supabase
    .from("profiles")
    .update({ branch_id: branchId })
    .eq("id", userId);

  if (error) throw error;
};
