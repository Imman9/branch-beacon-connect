
import { useState } from "react";
import { Media } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Play, FileAudio, Volume2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MediaCardProps {
  media: Media;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getMediaIcon = () => {
    switch (media.mediaType) {
      case "video":
        return <Play className="h-10 w-10" />;
      case "audio":
        return <Volume2 className="h-10 w-10" />;
      case "image":
        return <Image className="h-10 w-10" />;
      default:
        return <FileAudio className="h-10 w-10" />;
    }
  };
  
  return (
    <Link to={`/media/${media.id}`}>
      <Card 
        className="overflow-hidden h-full card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {media.thumbnailUrl ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img 
              src={media.thumbnailUrl} 
              alt={media.title} 
              className="w-full h-full object-cover transition-transform" 
            />
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <Button size="icon" variant="secondary" className="rounded-full">
                {media.mediaType === "video" ? (
                  <Play className="h-5 w-5" />
                ) : media.mediaType === "audio" ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <Image className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            {getMediaIcon()}
          </div>
        )}
        <CardHeader className="py-4">
          <h3 className="font-medium text-lg">{media.title}</h3>
        </CardHeader>
        {media.description && (
          <CardContent className="py-2">
            <p className="text-muted-foreground line-clamp-2">
              {media.description}
            </p>
          </CardContent>
        )}
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            <div className="capitalize">{media.mediaType}</div>
            {media.artist && <div>{media.artist}</div>}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MediaCard;
