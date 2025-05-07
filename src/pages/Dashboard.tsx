
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BranchSelector from "@/components/ui-custom/BranchSelector";
import { Event, Sermon, Announcement } from "@/types/content";
import EventCard from "@/components/features/EventCard";
import SermonCard from "@/components/features/SermonCard";
import AnnouncementCard from "@/components/features/AnnouncementCard";
import { Calendar, Mic, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock data
const mockUpcomingEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Worship Service",
    description: "Join us for worship, prayer, and fellowship.",
    startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endDate: new Date(Date.now() + 86400000 + 7200000).toISOString(), // Tomorrow + 2 hours
    location: "Main Sanctuary",
    branchId: "1",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    createdBy: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Prayer Meeting",
    description: "Weekly prayer meeting for all church members.",
    startDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    endDate: new Date(Date.now() + 172800000 + 5400000).toISOString(), // Day after tomorrow + 1.5 hours
    location: "Prayer Room",
    branchId: "1",
    imageUrl: "https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    createdBy: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockRecentSermons: Sermon[] = [
  {
    id: "1",
    title: "Finding Peace in Troubled Times",
    description: "In this sermon, we explore how to find peace even in life's most challenging moments.",
    speaker: "Pastor John Smith",
    recordedDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    branchId: "1",
    mediaUrl: "https://example.com/sermon1.mp4",
    mediaType: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Power of Community",
    description: "Learn about the importance of building strong community connections in faith.",
    speaker: "Pastor Sarah Johnson",
    recordedDate: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    branchId: "1",
    mediaUrl: "https://example.com/sermon2.mp3",
    mediaType: "audio",
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Building Fund Campaign",
    content: "We're launching our annual building fund campaign. Our goal is to raise funds for the new community center.",
    branchId: "1",
    priority: "high",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 2592000000).toISOString(), // 30 days from now
    createdBy: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Bible Study Group",
    content: "Join our new Bible study group every Wednesday at 7 PM. All are welcome!",
    branchId: "1",
    priority: "medium",
    startDate: new Date().toISOString(),
    createdBy: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Dashboard = () => {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (authState.isAuthenticated) {
      toast({
        title: `Welcome, ${authState.user?.firstName}!`,
        description: `You're now connected to ${authState.branch?.name}`,
      });
    }
  }, [authState.isAuthenticated]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to {authState.branch?.name || "Church Connect"}
            </p>
          </div>
          <BranchSelector />
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-church-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-5 w-5 text-church-600" />
              </div>
              <CardDescription>Events happening at your branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingEvents.slice(0, 2).map((event) => (
                  <Link to={`/events/${event.id}`} key={event.id} className="block">
                    <div className="flex items-start gap-3 p-3 rounded-md hover:bg-church-100 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-church-200 rounded-md flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-church-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="pt-2">
                  <Link to="/events">
                    <Button variant="ghost" className="w-full text-church-700 hover:text-church-800 hover:bg-church-100">
                      View All Events
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-church-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Recent Sermons</CardTitle>
                <Mic className="h-5 w-5 text-church-600" />
              </div>
              <CardDescription>Latest messages from your branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentSermons.slice(0, 2).map((sermon) => (
                  <Link to={`/sermons/${sermon.id}`} key={sermon.id} className="block">
                    <div className="flex items-start gap-3 p-3 rounded-md hover:bg-church-100 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-church-200 rounded-md flex items-center justify-center">
                        {sermon.mediaType === "video" ? (
                          <div className="relative w-full h-full overflow-hidden rounded-md">
                            <img src={sermon.thumbnailUrl} alt={sermon.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <Mic className="h-5 w-5 text-church-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{sermon.title}</h3>
                        <p className="text-sm text-muted-foreground">{sermon.speaker}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="pt-2">
                  <Link to="/sermons">
                    <Button variant="ghost" className="w-full text-church-700 hover:text-church-800 hover:bg-church-100">
                      View All Sermons
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-church-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Announcements</CardTitle>
                <Bell className="h-5 w-5 text-church-600" />
              </div>
              <CardDescription>Important updates for your branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnnouncements.slice(0, 2).map((announcement) => (
                  <div key={announcement.id} className="block">
                    <div className="flex items-start gap-3 p-3 rounded-md hover:bg-church-100 transition-colors">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center ${
                        announcement.priority === "high" 
                          ? "bg-red-100" 
                          : announcement.priority === "medium" 
                            ? "bg-amber-100" 
                            : "bg-blue-100"
                      }`}>
                        <Bell className={`h-5 w-5 ${
                          announcement.priority === "high" 
                            ? "text-red-600" 
                            : announcement.priority === "medium" 
                              ? "text-amber-600" 
                              : "text-blue-600"
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{announcement.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Link to="/announcements">
                    <Button variant="ghost" className="w-full text-church-700 hover:text-church-800 hover:bg-church-100">
                      View All Announcements
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mockUpcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
        
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Recent Sermons</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mockRecentSermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
