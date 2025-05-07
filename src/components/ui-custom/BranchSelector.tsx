
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
import { Loader2 } from "lucide-react";
import { fetchBranches } from "@/services/supabaseAuth";

const BranchSelector: React.FC = () => {
  const { authState, switchBranch } = useAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadBranches = async () => {
      setIsLoading(true);
      try {
        const branchData = await fetchBranches();
        setBranches(branchData);
      } catch (error) {
        console.error("Failed to load branches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBranches();
  }, []);
  
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
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(isSwitching || isLoading) && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
    </div>
  );
};

export default BranchSelector;
