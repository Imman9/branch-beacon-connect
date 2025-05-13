
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

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
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header />}
      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}
        <main
          className={cn(
            "flex-1 px-4 py-6 md:px-6 md:py-8",
            {
              "ml-0": hideSidebar,
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
