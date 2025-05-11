
import { useState, useEffect } from "react";
import { Branch } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCcw } from "lucide-react";
import { fetchBranches } from "@/services/supabaseAuth";
import { useToast } from "@/hooks/use-toast";

const BranchSelector: React.FC = () => {
  const { authState, switchBranch } = useAuth();
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const loadBranches = async () => {
      setIsLoading(true);
      try {
        const branchData = await fetchBranches();
        console.log("Branches loaded:", branchData);
        setBranches(branchData);
        if (branchData.length === 0) {
          toast({
            title: "No branches available",
            description: "Please try refreshing or contact an administrator",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Failed to load branches:", error);
        toast({
          title: "Failed to load branches",
          description: "Please try refreshing or contact an administrator",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBranches();
  }, [retryCount, toast]);
  
  const handleRefresh = () => {
    setRetryCount(prev => prev + 1);
  };
  
  const handleBranchChange = async (branchId: string) => {
    if (branchId === authState.branch?.id) return;
    
    setIsSwitching(true);
    try {
      await switchBranch(branchId);
    } catch (error) {
      console.error("Failed to switch branch:", error);
    } finally {
      setIsSwitching(false);
    }
  };
  
  if (!authState.isAuthenticated) return null;
  
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium mb-1" htmlFor="branch-selector">
        Select Branch
      </label>
      <div className="flex items-center gap-2">
        <Select 
          value={authState.branch?.id} 
          onValueChange={handleBranchChange}
          disabled={isSwitching || isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.length > 0 ? branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            )) : (
              <div className="p-2 text-sm text-muted-foreground">
                No branches available
              </div>
            )}
          </SelectContent>
        </Select>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            title="Refresh branches"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BranchSelector;
