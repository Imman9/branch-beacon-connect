import { useState } from "react";
import Section from "@/components/ui-custom/Section";
import Hero from "@/components/ui-custom/Hero";
import EventCard from "@/components/features/EventCard";
import CardGrid from "@/components/ui-custom/CardGrid";
import { Calendar as CalendarIcon, Filter, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isWithinInterval, startOfMonth, endOfMonth, addMonths, parseISO, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/types/content";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

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
  const [filter, setFilter] = useState("all");
  const [calendarView, setCalendarView] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const { authState } = useAuth();

  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "branch_admin";

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    
    switch (filter) {
      case "thisWeek":
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= nextWeek;
      case "thisMonth":
        const firstDay = startOfMonth(new Date());
        const lastDay = endOfMonth(new Date());
        return eventDate >= firstDay && eventDate <= lastDay;
      default:
        return true;
    }
  });

  // Set a reminder for an event
  const setReminder = (event: Event) => {
    toast.success(`Reminder set for "${event.title}" on ${format(new Date(event.startDate), "PPP")}`, {
      description: "We'll notify you before the event starts.",
    });
  };

  // Custom function to highlight dates with events
  const eventDays = events.map(event => new Date(event.startDate));
  
  const isDayWithEvent = (day: Date) => {
    return eventDays.some(eventDate => isSameDay(eventDate, day));
  };

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
            {isAdmin && (
              <Button className="church-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Events" : filter === "thisWeek" ? "This Week" : "This Month"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  <div className="flex items-center">
                    All Events {filter === "all" && <Check className="ml-2 h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("thisWeek")}>
                  <div className="flex items-center">
                    This Week {filter === "thisWeek" && <Check className="ml-2 h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("thisMonth")}>
                  <div className="flex items-center">
                    This Month {filter === "thisMonth" && <Check className="ml-2 h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              size="sm" 
              className="flex items-center" 
              variant={calendarView ? "default" : "outline"}
              onClick={() => setCalendarView(!calendarView)}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
        
        {calendarView ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="border rounded-md p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{format(month, "MMMM yyyy")}</h3>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setMonth(addMonths(month, -1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setMonth(addMonths(month, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  month={month}
                  onMonthChange={setMonth}
                  modifiers={{
                    highlighted: isDayWithEvent,
                  }}
                  modifiersStyles={{
                    highlighted: { 
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      borderBottom: "2px solid rgba(139, 92, 246, 1)",
                      fontWeight: "bold"
                    }
                  }}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="border rounded-md p-4 h-full bg-white shadow-sm">
                <h3 className="font-medium mb-4">Events on {format(date, "PPP")}</h3>
                {events.filter(event => isSameDay(parseISO(event.startDate), date)).length > 0 ? (
                  <div className="space-y-4">
                    {events
                      .filter(event => isSameDay(parseISO(event.startDate), date))
                      .map((event) => (
                        <div key={event.id} className="flex items-start gap-4 pb-4 border-b">
                          <div className="bg-church-100 text-church-800 rounded-md p-2 text-center min-w-[60px]">
                            <div className="text-sm font-bold">{format(new Date(event.startDate), "MMM")}</div>
                            <div className="text-xl font-bold">{format(new Date(event.startDate), "d")}</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{format(new Date(event.startDate), "p")}</span>
                              <span>•</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setReminder(event)}
                            className="whitespace-nowrap"
                          >
                            Set Reminder
                          </Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No events scheduled for this day
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CardGrid>
            {filteredEvents.map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white" 
                      size="sm" 
                      variant="ghost"
                    >
                      <CalendarIcon className="h-4 w-4 text-church-800" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <div className="p-3">
                      <p className="font-medium mb-2">{event.title}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {format(new Date(event.startDate), "PPP")} at {format(new Date(event.startDate), "p")}
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => setReminder(event)}
                      >
                        Set Reminder
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </CardGrid>
        )}
      </Section>
    </>
  );
};

export default Events;
