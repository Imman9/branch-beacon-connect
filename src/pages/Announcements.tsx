import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import AnnouncementCard from "@/components/features/AnnouncementCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Bell } from "lucide-react";
import { Announcement } from "@/types/content";

// Mock announcements data
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Church Building Fund",
    content: "We are raising funds for our new church building. Please consider donating to this important cause for our community.",
    branchId: "1",
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1560516151-bff049e5718c?auto=format&fit=crop&q=80&w=1470",
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Weekly Prayer Meeting Schedule Change",
    content: "Starting next week, our weekly prayer meetings will begin at 6:30 PM instead of 7:00 PM. Please make a note of this change.",
    branchId: "1",
    priority: "medium",
    startDate: new Date().toISOString(),
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Youth Camp Registration Now Open",
    content: "Registration for the summer youth camp is now open. The camp will take place from July 15-20. Don't miss this opportunity for your children to grow in faith and fellowship.",
    branchId: "1",
    priority: "medium",
    imageUrl: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=1469",
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString(),
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const AnnouncementsPage = () => {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);

  return (
    <>
      <Hero 
        title="Announcements" 
        subtitle="Stay informed about the latest news and updates from our church"
        imageUrl="https://images.unsplash.com/photo-1486693326701-1bacfe73310d?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex items-center mb-6">
          <Bell className="h-6 w-6 mr-2 text-church-600" />
          <h2 className="text-2xl font-bold">Latest Announcements</h2>
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

export default AnnouncementsPage;
