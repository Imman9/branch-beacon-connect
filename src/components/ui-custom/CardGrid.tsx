
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardGridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
}

const CardGrid: React.FC<CardGridProps> = ({
  children,
  className,
  columns = 3,
}) => {
  return (
    <div
      className={cn(
        "grid gap-6",
        {
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": columns === 3,
          "grid-cols-1 md:grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": columns === 4,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardGrid;
