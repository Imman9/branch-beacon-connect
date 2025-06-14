
import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import MediaCard from "@/components/features/MediaCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Media } from "@/types/content";

// Mock media data for demonstration
const mockMedia: Media[] = [
  {
    id: "1",
    title: "Worship Session",
    description: "Beautiful worship session from Sunday service",
    mediaType: "video",
    mediaUrl: "https://example.com/worship.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470",
    tags: ["worship", "music"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Youth Conference Highlights",
    description: "Best moments from our annual youth conference",
    mediaType: "video",
    mediaUrl: "https://example.com/youth.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1470",
    tags: ["youth", "conference"],
    branchId: "1",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Media = () => {
  const [media] = useState<Media[]>(mockMedia);
  const { authState } = useAuth();
  
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "branch_admin";

  return (
    <>
      <Hero 
        title="Media Gallery" 
        subtitle="Explore our collection of worship videos, photos, and other media content"
        imageUrl="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Media Collection</h2>
          {isAdmin && (
            <Button className="church-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Media
            </Button>
          )}
        </div>
        
        <CardGrid>
          {media.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Media;
