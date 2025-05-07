
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className,
  contentClassName,
  id,
}) => {
  return (
    <section id={id} className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto fade-in">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={cn("fade-in", contentClassName)}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
