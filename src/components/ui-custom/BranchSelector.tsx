
import { useState } from "react";
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

// Mock branches data
const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Main Branch",
    location: "123 Main St, City",
    description: "Our main church branch",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "East Side Branch",
    location: "456 East St, City",
    description: "Our east side branch",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "West Side Branch",
    location: "789 West St, City",
    description: "Our west side branch",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const BranchSelector: React.FC = () => {
  const { authState, switchBranch } = useAuth();
  const [isSwitching, setIsSwitching] = useState(false);
  
  const handleBranchChange = async (branchId: string) => {
    setIsSwitching(true);
    try {
      await switchBranch(branchId);
    } catch (error) {
      console.error("Failed to switch branch:", error);
    } finally {
      setIsSwitching(false);
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium mb-1" htmlFor="branch-selector">
        Select Branch
      </label>
      <div className="flex items-center gap-2">
        <Select 
          value={authState.branch?.id} 
          onValueChange={handleBranchChange}
          disabled={isSwitching}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {mockBranches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isSwitching && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
    </div>
  );
};

export default BranchSelector;
