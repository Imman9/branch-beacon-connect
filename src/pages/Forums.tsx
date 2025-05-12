
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import GroupCard from "@/components/features/GroupCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Group } from "@/types/content";

// Mock groups data
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Youth Group",
    description: "A community for young adults to connect, share experiences, and grow together in faith.",
    branchId: "1",
    createdBy: "admin",
    isOpen: true,
    memberCount: 24,
    admins: ["admin", "user-1", "user-2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Prayer Warriors",
    description: "Dedicated to intercessory prayer for our church, community, and global needs.",
    branchId: "1",
    createdBy: "admin",
    isOpen: true,
    memberCount: 18,
    admins: ["admin"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Bible Study",
    description: "Deep dive into scripture with weekly studies and discussions on various books of the Bible.",
    branchId: "1",
    createdBy: "admin",
    isOpen: false,
    memberCount: 12,
    admins: ["admin", "user-3"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Worship Team",
    description: "For members of the worship team to coordinate, share resources, and plan services.",
    branchId: "1",
    createdBy: "admin",
    isOpen: true,
    memberCount: 8,
    admins: ["admin", "user-4", "user-5"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const ForumsPage = () => {
  const [groups] = useState<Group[]>(mockGroups);

  return (
    <Layout>
      <Hero 
        title="Church Groups" 
        subtitle="Join a group, connect with members, and grow together in community"
        imageUrl="https://images.unsplash.com/photo-1587614380862-0294272c5a49?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-church-600" />
            <h2 className="text-2xl font-bold">Community Groups</h2>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Join Group
          </Button>
        </div>
        
        <CardGrid>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </CardGrid>
      </Section>
    </Layout>
  );
};

export default ForumsPage;
