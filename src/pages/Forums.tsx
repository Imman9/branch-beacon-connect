
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import ForumCard from "@/components/features/ForumCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Forum } from "@/types/content";

// Mock forums data
const mockForums: Forum[] = [
  {
    id: "1",
    title: "Bible Study",
    description: "Discuss various Bible passages and their interpretations.",
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Prayer Requests",
    description: "Share your prayer needs and pray for others in our community.",
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Community Outreach",
    description: "Discuss ways we can serve our local community and make a difference.",
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Worship Team",
    description: "For worship team members to coordinate and discuss music.",
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const ForumsPage = () => {
  const [forums] = useState<Forum[]>(mockForums);

  return (
    <Layout>
      <Hero 
        title="Community Forums" 
        subtitle="Connect with other members, ask questions, and share insights"
        imageUrl="https://images.unsplash.com/photo-1587614380862-0294272c5a49?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-church-600" />
            <h2 className="text-2xl font-bold">Discussion Forums</h2>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Topic
          </Button>
        </div>
        
        <CardGrid>
          {forums.map((forum) => (
            <ForumCard key={forum.id} forum={forum} />
          ))}
        </CardGrid>
      </Section>
    </Layout>
  );
};

export default ForumsPage;
