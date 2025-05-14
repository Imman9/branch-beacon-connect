
import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import EventCard from "@/components/features/EventCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/types/content";

// Mock events data for demonstration
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Service",
    description: "Join us for our weekly Sunday service with Pastor David.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    location: "Main Sanctuary",
    branchId: "1",
    imageUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1470",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Prayer Meeting",
    description: "Weekly prayer gathering to pray for the community and world issues.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    location: "Prayer Room",
    branchId: "1",
    imageUrl: "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?auto=format&fit=crop&q=80&w=1373",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Youth Conference",
    description: "Annual youth conference featuring worship, teachings, and fellowship.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
    location: "Main Hall",
    branchId: "1",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1470",
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Events = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [filter] = useState("all");

  return (
    <>
      <Hero 
        title="Church Events" 
        subtitle="Join us in worship, prayer, and fellowship through our upcoming events"
        imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1470"
      />
      
      <Section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Events" : "Filtered"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Events</DropdownMenuItem>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
        
        <CardGrid>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Events;
