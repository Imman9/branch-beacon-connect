
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  hideHeader?: boolean;
  hideSidebar?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  hideHeader = false,
  hideSidebar = false,
  className,
  children,
}) => {
  const isMobile = useIsMobile();

  // Don't render anything in the layout if both header and sidebar are hidden
  if (hideHeader && hideSidebar) {
    return <>{children || <Outlet />}</>;
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {!hideHeader && <Header />}
      <div className="flex flex-1 relative">
        {!hideSidebar && <Sidebar />}
        <main
          className={cn(
            "flex-1 px-4 py-6 md:px-6 md:py-8",
            {
              "ml-0": hideSidebar || isMobile,
              "ml-0 md:ml-64": !hideSidebar && !isMobile,
            },
            className
          )}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
