
import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import SermonCard from "@/components/features/SermonCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sermon } from "@/types/content";

// Mock sermons data for demonstration
const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "Faith in Action",
    description: "Understanding how to put our faith into practice in daily life.",
    speaker: "Pastor David",
    recordedDate: new Date().toISOString(),
    mediaUrl: "https://example.com/sermon1.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470",
    tags: ["faith", "practical"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Power of Prayer",
    description: "Discovering the transformative power of prayer in our lives.",
    speaker: "Pastor Sarah",
    recordedDate: new Date().toISOString(),
    mediaUrl: "https://example.com/sermon2.mp3",
    mediaType: "audio",
    thumbnailUrl: "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?auto=format&fit=crop&q=80&w=1373",
    tags: ["prayer", "spiritual growth"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Sermons = () => {
  const [sermons] = useState<Sermon[]>(mockSermons);
  const { authState } = useAuth();
  
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "branch_admin";

  return (
    <>
      <Hero 
        title="Sermons" 
        subtitle="Listen to inspiring messages that will strengthen your faith and guide your spiritual journey"
        imageUrl="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Sermons</h2>
          {isAdmin && (
            <Button className="church-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Sermon
            </Button>
          )}
        </div>
        
        <CardGrid>
          {sermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Sermons;
