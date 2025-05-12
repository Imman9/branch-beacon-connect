
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import { Radio as RadioIcon, Play, Pause, Volume2, VolumeX, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  description: string;
  imageUrl: string;
  streamUrl: string;
}

const mockRadioStations: RadioStation[] = [
  {
    id: "1",
    name: "Repentance Radio",
    frequency: "89.5 FM",
    description: "Listen to sermons, worship music, and discussions on repentance and holiness.",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=1974",
    streamUrl: "https://example.com/radio/repentance",
  },
  {
    id: "2",
    name: "Worship Hour",
    frequency: "92.3 FM",
    description: "24/7 worship music to lift your spirit and draw you closer to God.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1470",
    streamUrl: "https://example.com/radio/worship",
  },
  {
    id: "3",
    name: "Gospel Teachings",
    frequency: "95.1 FM",
    description: "In-depth Bible teachings and discussions on Christian living.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1471",
    streamUrl: "https://example.com/radio/gospel",
  },
];

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  host: string;
  day: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
}

const mockSchedule: ScheduleItem[] = [
  { id: "1", time: "06:00 - 08:00", title: "Morning Devotion", host: "Pastor James", day: "monday" },
  { id: "2", time: "09:00 - 10:00", title: "Bible Study", host: "Pastor Mary", day: "monday" },
  { id: "3", time: "12:00 - 13:00", title: "Lunch Hour Prayer", host: "Sister Ruth", day: "monday" },
  { id: "4", time: "18:00 - 20:00", title: "Evening Worship", host: "Worship Team", day: "monday" },
  
  { id: "5", time: "06:00 - 08:00", title: "Morning Devotion", host: "Pastor David", day: "tuesday" },
  { id: "6", time: "10:00 - 11:00", title: "Women's Hour", host: "Sister Sarah", day: "tuesday" },
  { id: "7", time: "14:00 - 15:00", title: "Youth Corner", host: "Brother Daniel", day: "tuesday" },
  { id: "8", time: "19:00 - 21:00", title: "Evening Service", host: "Pastor Joseph", day: "tuesday" },
  
  { id: "9", time: "07:00 - 09:00", title: "Worship & Prayer", host: "Worship Team", day: "sunday" },
  { id: "10", time: "10:00 - 12:00", title: "Sunday Service", host: "Pastor David Owuor", day: "sunday" },
  { id: "11", time: "15:00 - 16:00", title: "Children's Hour", host: "Sister Mary", day: "sunday" },
  { id: "12", time: "18:00 - 20:00", title: "Evening Service", host: "Pastor John", day: "sunday" },
];

const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const RadioPage = () => {
  const [currentStation, setCurrentStation] = useState<RadioStation>(mockRadioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [activeDay, setActiveDay] = useState<string>("sunday");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const filteredSchedule = mockSchedule.filter(item => item.day === activeDay);

  return (
    <Layout>
      <Hero 
        title="Church Radio" 
        subtitle="Listen to sermons, worship music, and Christian teachings 24/7"
        imageUrl="https://images.unsplash.com/photo-1593078166039-c9878df5c520?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Player */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <RadioIcon className="h-6 w-6 mr-2 text-church-600" />
              Live Radio
            </h2>
            
            <Card className="mb-6">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={currentStation.imageUrl} 
                  alt={currentStation.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{currentStation.name}</h3>
                    <p className="text-muted-foreground">{currentStation.frequency}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{currentStation.description}</p>
                
                <div className="flex justify-center mb-4">
                  <Button 
                    size="lg" 
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" />
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-full">
                    <Slider 
                      value={volume} 
                      max={100}
                      step={1}
                      onValueChange={setVolume}
                      disabled={isMuted}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm">
                  {isPlaying ? "Now Playing: Morning Devotion with Pastor James" : "Click play to start listening"}
                </p>
              </CardFooter>
            </Card>
            
            <h3 className="text-xl font-medium mb-4">Other Stations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRadioStations.filter(station => station.id !== currentStation.id).map((station) => (
                <Card key={station.id} className="cursor-pointer hover:bg-accent" onClick={() => setCurrentStation(station)}>
                  <div className="flex p-4">
                    <div className="w-16 h-16 rounded overflow-hidden mr-4">
                      <img 
                        src={station.imageUrl}
                        alt={station.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{station.name}</h4>
                      <p className="text-sm text-muted-foreground">{station.frequency}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Schedule */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Program Schedule</h2>
            
            <Tabs defaultValue="sunday" className="w-full">
              <TabsList className="w-full mb-4 overflow-x-auto">
                {weekdays.map((day) => (
                  <TabsTrigger 
                    key={day} 
                    value={day}
                    onClick={() => setActiveDay(day)}
                    className="capitalize"
                  >
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {weekdays.map((day) => (
                <TabsContent key={day} value={day} className="mt-0">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-medium capitalize">{day}'s Schedule</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredSchedule.length > 0 ? (
                          filteredSchedule.map((item) => (
                            <div key={item.id} className="border-b pb-2">
                              <div className="flex justify-between">
                                <p className="font-medium">{item.time}</p>
                                <p className="text-sm text-muted-foreground">{item.host}</p>
                              </div>
                              <p>{item.title}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground py-4">
                            No programs scheduled for this day
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default RadioPage;
