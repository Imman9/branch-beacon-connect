
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  imageUrl?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  children,
  imageUrl,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-church-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-muted-foreground mb-8">
                {subtitle}
              </p>
            )}
            {children}
            
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4 mt-8">
                {primaryAction && (
                  <Link to={primaryAction.href}>
                    <Button size="lg" className="church-gradient">
                      {primaryAction.label}
                    </Button>
                  </Link>
                )}
                {secondaryAction && (
                  <Link to={secondaryAction.href}>
                    <Button size="lg" variant="outline">
                      {secondaryAction.label}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
          
          {imageUrl && (
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl fade-in">
              <div className="absolute inset-0 rounded-lg bg-church-200 transform rotate-3"></div>
              <img
                src={imageUrl}
                alt="Hero"
                className="relative z-10 rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
