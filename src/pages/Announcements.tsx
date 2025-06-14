
import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import AnnouncementCard from "@/components/features/AnnouncementCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Announcement } from "@/types/content";

// Mock announcements data for demonstration
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Church Building Fund",
    content: "We are raising funds for the new church building. Please consider contributing to this important project.",
    priority: "high",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Sunday School Class",
    content: "Starting next month, we will have a new Sunday school class for teenagers.",
    priority: "medium",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Announcements = () => {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const { authState } = useAuth();
  
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "branch_admin";

  return (
    <>
      <Hero 
        title="Announcements" 
        subtitle="Stay updated with the latest news and important information from our church community"
        imageUrl="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Announcements</h2>
          {isAdmin && (
            <Button className="church-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Announcement
            </Button>
          )}
        </div>
        
        <CardGrid>
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Announcements;
