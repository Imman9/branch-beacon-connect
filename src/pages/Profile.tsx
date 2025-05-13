
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/types/auth";
import BranchSelector from "@/components/ui-custom/BranchSelector";
import { UserRound, Mail, UploadCloud } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  branchId: z.string().optional(),
});

const Profile = () => {
  const { authState, switchBranch } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    authState.user?.avatar || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: authState.user?.firstName || "",
      lastName: authState.user?.lastName || "",
      branchId: authState.user?.branchId || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      // Create a URL for the preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!authState.user?.id) return;
    
    setIsLoading(true);
    try {
      // Update profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          branch_id: values.branchId,
        })
        .eq("id", authState.user.id);

      if (profileError) throw profileError;
      
      // Upload avatar if a new one was selected
      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const filePath = `${authState.user.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from("avatars")
          .upload(filePath, avatar, { upsert: true });
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: publicUrlData } = supabase
          .storage
          .from("avatars")
          .getPublicUrl(filePath);
          
        // Update the profile with the new avatar URL
        await supabase
          .from("profiles")
          .update({ avatar: publicUrlData.publicUrl })
          .eq("id", authState.user.id);
      }
      
      // If branch was changed, update the context
      if (values.branchId && values.branchId !== authState.user.branchId) {
        await switchBranch(values.branchId);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <div className="grid gap-6">
            {/* Avatar Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Update your profile picture. This will be visible to other members.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Avatar className="w-32 h-32 mb-6">
                  <AvatarImage src={previewUrl || undefined} alt="Profile" />
                  <AvatarFallback className="text-2xl bg-church-100 text-church-700">
                    {authState.user?.firstName?.[0]}
                    {authState.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="avatar-upload" 
                    className="flex items-center justify-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-4 rounded-md transition-colors"
                  >
                    <UploadCloud className="h-5 w-5" />
                    <span>Upload New Picture</span>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
            
            {/* Profile Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and branch affiliation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Your first name" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
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
                              <div className="relative">
                                <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Your last name" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <div className="relative mb-6">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={authState.user?.email || ""} 
                          disabled 
                          className="pl-10 bg-muted/50" 
                        />
                        <p className="text-xs text-muted-foreground mt-1 ml-1">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="branchId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Church Branch</FormLabel>
                          <FormControl>
                            <BranchSelector
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            Select the church branch you attend.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Account Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium">Account Type</span>
                  <p className="text-muted-foreground capitalize">
                    {authState.user?.role.replace('_', ' ')}
                  </p>
                </div>
                <Separator />
                <div>
                  <span className="text-sm font-medium">Member Since</span>
                  <p className="text-muted-foreground">
                    {authState.user?.createdAt && formatDistanceToNow(new Date(authState.user.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Change Password</Button>
                <Button variant="destructive">Delete Account</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
