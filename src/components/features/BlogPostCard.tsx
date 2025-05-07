
import { BlogPost } from "@/types/content";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        {post.imageUrl && (
          <div className="aspect-[3/2] w-full overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105" 
            />
          </div>
        )}
        <CardHeader className="py-4">
          <h3 className="font-medium text-lg">{post.title}</h3>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-church-50 text-church-800">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="secondary" className="bg-gray-50 text-gray-800">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 pb-4 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            <div>By {post.author}</div>
            <div>{format(new Date(post.publishedDate), "MMM d, yyyy")}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
