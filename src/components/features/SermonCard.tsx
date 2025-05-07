
import { useState } from "react";
import { Sermon } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Play, FileAudio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SermonCardProps {
  sermon: Sermon;
}

const SermonCard: React.FC<SermonCardProps> = ({ sermon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/sermons/${sermon.id}`}>
      <Card 
        className="overflow-hidden h-full card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {sermon.thumbnailUrl ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img 
              src={sermon.thumbnailUrl} 
              alt={sermon.title} 
              className="w-full h-full object-cover transition-transform" 
            />
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Play className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <FileAudio className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <CardHeader className="py-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-lg">{sermon.title}</h3>
            <Badge variant="outline" className="bg-church-50 text-church-800">
              {sermon.mediaType === "video" ? "Video" : "Audio"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground line-clamp-2">
            {sermon.description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            <div>{sermon.speaker}</div>
            <div>{format(new Date(sermon.recordedDate), "MMM d, yyyy")}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SermonCard;
