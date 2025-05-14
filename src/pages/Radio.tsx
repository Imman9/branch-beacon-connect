import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import { Radio as RadioIcon, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioStation } from "@/types/content";

// Mock radio stations
const mockStations: RadioStation[] = [
  {
    id: "1",
    name: "Worship Radio",
    description: "24/7 Christian worship music and teachings.",
    streamUrl: "https://example.com/stream/worship",
    logoUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=1470",
    branchId: "1",
    isLive: true,
    currentShow: "Morning Devotion",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Gospel Hits",
    description: "The best gospel music from around the world.",
    streamUrl: "https://example.com/stream/gospel",
    logoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1470",
    branchId: "1",
    isLive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const RadioPlayer = ({ station }: { station: RadioStation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control the audio stream
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {station.logoUrl ? (
          <img 
            src={station.logoUrl} 
            alt={station.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <RadioIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{station.name}</h3>
          {station.isLive && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{station.description}</p>
        {station.currentShow && (
          <p className="mt-2 text-sm font-medium">Now playing: {station.currentShow}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="flex items-center gap-2 flex-1 max-w-[200px] ml-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

const RadioPage = () => {
  const [stations] = useState<RadioStation[]>(mockStations);

  return (
    <>
      <Hero 
        title="Church Radio" 
        subtitle="Listen to our live radio broadcasts and recorded programs"
        imageUrl="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex items-center mb-6">
          <RadioIcon className="h-6 w-6 mr-2 text-church-600" />
          <h2 className="text-2xl font-bold">Radio Stations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stations.map((station) => (
            <RadioPlayer key={station.id} station={station} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default RadioPage;
