
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/auth";
import { fetchBranches } from "@/services/supabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import ProfilePictureUpload from "@/components/features/ProfilePictureUpload";

const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
});

type ProfileValues = z.infer<typeof profileSchema>;

const BranchSelector = ({ onBranchSelect }: { onBranchSelect: (branchId: string) => void }) => {
  const [branches, setBranches] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const branchesData = await fetchBranches();
        setBranches(branchesData);
      } catch (error) {
        toast({
          title: "Error fetching branches",
          description: "Failed to load branches. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadBranches();
  }, [toast]);

  const handleBranchChange = (value: string) => {
    onBranchSelect(value);
  };

  return (
    <Select onValueChange={handleBranchChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        {branches.map((branch: any) => (
          <SelectItem key={branch.id} value={branch.id}>
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const Profile = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [branch, setBranch] = useState<string | null>(null);

  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
    }
  }, [authState.user]);

  useEffect(() => {
    if (authState.user?.branchId) {
      setBranch(authState.user.branchId);
    }
  }, [authState.user?.branchId]);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: authState.user?.firstName || "",
      lastName: authState.user?.lastName || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      firstName: authState.user?.firstName || "",
      lastName: authState.user?.lastName || "",
    });
  }, [authState.user, form]);

  const handleUpdateProfile = async (values: ProfileValues) => {
    setUser({
      ...authState.user!,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    toast({
      title: "Profile updated successfully!",
      description: "Your profile has been updated.",
    });
  };

  const handleAvatarUpdate = (avatarUrl: string) => {
    if (user) {
      setUser({
        ...user,
        avatar: avatarUrl,
      });
    }
  };

  const getInitials = () => {
    if (!user) return "?";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  };

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>View and manage your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <ProfilePictureUpload
              currentAvatar={user?.avatar}
              userId={user?.id || ""}
              userInitials={getInitials()}
              onAvatarUpdate={handleAvatarUpdate}
            />

            <div className="text-center space-y-1">
              <h4 className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</h4>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <BranchSelector onBranchSelect={setBranch} />
                    </div>
                  </FormControl>
                  <FormDescription>The branch you are affiliated with</FormDescription>
                </FormItem>

                <Button type="submit" className="w-full church-gradient" disabled={!form.formState.isValid}>
                  Update Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
