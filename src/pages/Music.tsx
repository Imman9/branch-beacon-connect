import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Music as MusicIcon, Filter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Media } from "@/types/content";

// Mock music data
const mockMusic: Media[] = [
  {
    id: "1",
    title: "Amazing Grace",
    description: "Traditional hymn performed by the church choir.",
    mediaUrl: "https://example.com/music/amazing-grace.mp3",
    mediaType: "audio",
    thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1470",
    duration: 240, // in seconds
    artist: "Church Choir",
    album: "Hymns Collection",
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Holy Spirit",
    description: "Contemporary worship song.",
    mediaUrl: "https://example.com/music/holy-spirit.mp3",
    mediaType: "audio",
    thumbnailUrl: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=1470",
    duration: 320, // in seconds
    artist: "Worship Team",
    album: "Spirit of Revival",
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Oceans",
    description: "Popular worship song performed at our Easter service.",
    mediaUrl: "https://example.com/music/oceans.mp3",
    mediaType: "audio",
    thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1470",
    duration: 380, // in seconds
    artist: "Praise Team",
    album: "Ocean Deep",
    branchId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MusicItem = ({ music }: { music: Media }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      className="overflow-hidden h-full card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {music.thumbnailUrl ? (
        <div className="relative aspect-square w-full overflow-hidden">
          <img 
            src={music.thumbnailUrl} 
            alt={music.title} 
            className="w-full h-full object-cover transition-transform" 
          />
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="aspect-square w-full bg-muted flex items-center justify-center">
          <MusicIcon className="h-10 w-10 text-muted-foreground" />
        </div>
      )}
      <CardHeader className="py-4">
        <h3 className="font-medium text-lg">{music.title}</h3>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-muted-foreground line-clamp-2">
          {music.description}
        </p>
      </CardContent>
      <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
        <div className="flex justify-between w-full">
          <div>{music.artist}</div>
          <div>{formatDuration(music.duration)}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

const MusicPage = () => {
  const [musicItems] = useState<Media[]>(mockMusic);
  const [filter] = useState("all");

  return (
    <>
      <Hero 
        title="Music Library" 
        subtitle="Listen to worship songs, hymns, and performances from our church"
        imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Music Collection</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Music" : "Filtered"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Music</DropdownMenuItem>
                <DropdownMenuItem>Hymns</DropdownMenuItem>
                <DropdownMenuItem>Contemporary</DropdownMenuItem>
                <DropdownMenuItem>Choir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <CardGrid>
          {musicItems.map((music) => (
            <MusicItem key={music.id} music={music} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default MusicPage;
