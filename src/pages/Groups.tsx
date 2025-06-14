
import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import GroupCard from "@/components/features/GroupCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Group } from "@/types/content";

// Mock groups data for demonstration
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Youth Ministry",
    description: "A vibrant community for young adults to grow in faith together.",
    isOpen: true,
    memberCount: 25,
    admins: ["admin1"],
    members: ["user1", "user2"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Prayer Warriors",
    description: "Dedicated to intercession and spiritual warfare through prayer.",
    isOpen: false,
    memberCount: 15,
    admins: ["admin1"],
    members: ["user3", "user4"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bible Study Circle",
    description: "Weekly Bible study focusing on in-depth scripture exploration.",
    isOpen: true,
    memberCount: 30,
    admins: ["admin1"],
    members: ["user5", "user6"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Groups = () => {
  const [groups] = useState<Group[]>(mockGroups);
  const { authState } = useAuth();
  
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "branch_admin";

  return (
    <>
      <Hero 
        title="Church Groups" 
        subtitle="Connect with like-minded believers and grow together in faith through our various ministry groups"
        imageUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Groups</h2>
          {isAdmin && (
            <Button className="church-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          )}
        </div>
        
        <CardGrid>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Groups;
