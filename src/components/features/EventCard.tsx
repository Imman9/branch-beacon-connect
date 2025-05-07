
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format dates for display
  const formattedStartDate = format(new Date(event.startDate), "MMM d, yyyy h:mm a");
  
  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        {event.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105" 
            />
          </div>
        )}
        <CardHeader className="py-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-lg">{event.title}</h3>
            <Badge variant="outline" className="bg-church-50 text-church-800">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(event.startDate), "MMM d")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            <div>{event.location}</div>
            <div>{formattedStartDate}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
