
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Mic, Bell, Users, FileAudio, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const cardImages = [
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1470", // Events image
  "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?auto=format&fit=crop&q=80&w=1373", // Sermon image
  "https://images.unsplash.com/photo-1511632765486-a01e0d2b3f4f?auto=format&fit=crop&q=80&w=1470", // Community image
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=1470", // Media image
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1470", // Music image
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1470", // Radio image
];

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  color: string;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  color,
  className 
}) => {
  return (
    <Card className={cn("overflow-hidden border-0 shadow-lg group", className)}>
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <CardHeader className={cn("pb-2 relative z-10 -mt-16", `bg-${color}`)}>
        <CardTitle className="text-lg font-medium flex items-center text-white">
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 bg-white">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3 text-church-800">Dashboard</h1>
        <p className="text-church-600 max-w-3xl">
          Welcome to your dashboard. Stay connected with your church community, access resources, 
          and discover upcoming events and services.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Upcoming Events"
          description="See what's happening soon in your branch and community."
          icon={Calendar}
          image={cardImages[0]}
          color="church-600"
          className="border-l-4 border-church-600"
        />
        
        <DashboardCard
          title="Recent Sermons"
          description="Catch up on sermons you might have missed or revisit favorites."
          icon={Mic}
          image={cardImages[1]}
          color="church-700" 
          className="border-l-4 border-church-700"
        />
        
        <DashboardCard
          title="Community"
          description="Connect with fellow members, join groups and discussions."
          icon={Users}
          image={cardImages[2]}
          color="church-500"
          className="border-l-4 border-church-500" 
        />
        
        <DashboardCard
          title="Media Library"
          description="Access teachings, videos, and other digital resources."
          icon={FileAudio}
          image={cardImages[3]}
          color="church-800"
          className="border-l-4 border-church-800"
        />
        
        <DashboardCard
          title="Music"
          description="Discover and enjoy worship music and lyrics."
          icon={Music}
          image={cardImages[4]}
          color="church-600"
          className="border-l-4 border-church-600"
        />
        
        <DashboardCard
          title="Notifications"
          description="View your recent activity and important announcements."
          icon={Bell}
          image={cardImages[5]}
          color="church-700"
          className="border-l-4 border-church-700"
        />
      </div>
    </div>
  );
};

export default Dashboard;
