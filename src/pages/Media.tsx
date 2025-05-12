
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import MediaCard from "@/components/features/MediaCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { FileAudio, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Media } from "@/types/content";

// Mock media data for demonstration
const mockMedia: Media[] = [
  {
    id: "1",
    title: "Worship Session - May 2023",
    description: "Beautiful worship led by our praise team.",
    mediaUrl: "https://example.com/media/worship-may.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1470",
    duration: 1820, // in seconds
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Easter Celebrations",
    description: "Highlights from our Easter service.",
    mediaUrl: "https://example.com/media/easter.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1627501691850-db08eb81199a?auto=format&fit=crop&q=80&w=1470",
    duration: 2430, // in seconds
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Church Anniversary Photos",
    description: "Photos from our 10th anniversary celebration.",
    mediaUrl: "https://example.com/media/anniversary.jpg",
    mediaType: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1530279281203-4c60af08d001?auto=format&fit=crop&q=80&w=1470",
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MediaPage = () => {
  const [mediaItems] = useState<Media[]>(mockMedia);
  const [filter] = useState("all");

  return (
    <Layout>
      <Hero 
        title="Media Library" 
        subtitle="Browse our collection of videos, photos, and other media from church events"
        imageUrl="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Media Gallery</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Media" : "Filtered"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Media</DropdownMenuItem>
                <DropdownMenuItem>Videos</DropdownMenuItem>
                <DropdownMenuItem>Images</DropdownMenuItem>
                <DropdownMenuItem>Audio</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <CardGrid>
          {mediaItems.map((mediaItem) => (
            <MediaCard key={mediaItem.id} media={mediaItem} />
          ))}
        </CardGrid>
      </Section>
    </Layout>
  );
};

export default MediaPage;
