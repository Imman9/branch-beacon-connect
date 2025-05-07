
import { Announcement } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Bell } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const priorityColors = {
    low: "bg-blue-50 text-blue-800 hover:bg-blue-100",
    medium: "bg-amber-50 text-amber-800 hover:bg-amber-100",
    high: "bg-red-50 text-red-800 hover:bg-red-100"
  };
  
  return (
    <Card className="overflow-hidden h-full card-hover">
      <CardHeader className="py-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg flex items-center">
            {announcement.priority === "high" && (
              <Bell className="h-4 w-4 text-red-500 mr-2" />
            )}
            {announcement.title}
          </h3>
          <Badge
            variant="outline"
            className={priorityColors[announcement.priority]}
          >
            {announcement.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-muted-foreground">
          {announcement.content}
        </p>
      </CardContent>
      <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
        <div className="flex justify-between w-full">
          <div>Valid from: {format(new Date(announcement.startDate), "MMM d, yyyy")}</div>
          {announcement.endDate && (
            <div>Until: {format(new Date(announcement.endDate), "MMM d, yyyy")}</div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
