
import { Forum } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface ForumCardProps {
  forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
  return (
    <Link to={`/forums/${forum.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <CardHeader className="py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-church-100 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-church-600" />
            </div>
            <h3 className="font-medium text-lg">{forum.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground">
            {forum.description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          Created by Admin
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ForumCard;
