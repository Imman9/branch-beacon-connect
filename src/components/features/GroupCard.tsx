
import { Group } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Users, Lock, Unlock, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Link to={`/groups/${group.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-church-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-church-600" />
              </div>
              <h3 className="font-medium text-lg">{group.name}</h3>
            </div>
            {group.isOpen ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Unlock className="h-3 w-3 mr-1" /> Open
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Lock className="h-3 w-3 mr-1" /> Closed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground">
            {group.description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            <div>{group.memberCount} members</div>
            <div>{group.admins.length} admin{group.admins.length > 1 ? 's' : ''}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GroupCard;
