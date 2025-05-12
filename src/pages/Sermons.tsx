
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import SermonCard from "@/components/features/SermonCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Mic, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sermon } from "@/types/content";

// Mock sermons data for demonstration
const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "The Power of Faith",
    description: "Exploring how faith can move mountains in our lives.",
    speaker: "Pastor David Owuor",
    recordedDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    branchId: "1",
    mediaUrl: "https://example.com/sermons/faith.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1537072094243-7f34e2a2e361?auto=format&fit=crop&q=80&w=1470",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Walking in Holiness",
    description: "Understanding the importance of holy living in today's world.",
    speaker: "Pastor Joseph",
    recordedDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
    branchId: "1",
    mediaUrl: "https://example.com/sermons/holiness.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1473",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Prayer and Fasting",
    description: "The spiritual disciplines that bring us closer to God.",
    speaker: "Pastor David Owuor",
    recordedDate: new Date(new Date().setDate(new Date().getDate() - 21)).toISOString(),
    branchId: "1",
    mediaUrl: "https://example.com/sermons/prayer.mp3",
    mediaType: "audio",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Sermons = () => {
  const [sermons] = useState<Sermon[]>(mockSermons);
  const [filter] = useState("all");

  return (
    <Layout>
      <Hero 
        title="Sermons" 
        subtitle="Powerful messages to help you grow in faith and holiness"
        imageUrl="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Sermons</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Sermons" : "Filtered"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Sermons</DropdownMenuItem>
                <DropdownMenuItem>Video Only</DropdownMenuItem>
                <DropdownMenuItem>Audio Only</DropdownMenuItem>
                <DropdownMenuItem>By Pastor David</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <CardGrid>
          {sermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </CardGrid>
      </Section>
    </Layout>
  );
};

export default Sermons;
