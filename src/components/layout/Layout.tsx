
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

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
  const { authState } = useAuth();

  // Don't render anything in the layout if both header and sidebar are hidden
  if (hideHeader && hideSidebar) {
    return <>{children || <Outlet />}</>;
  }

  // Don't show sidebar if user is not authenticated
  const shouldShowSidebar = !hideSidebar && authState.isAuthenticated;

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {!hideHeader && <Header />}
      <div className="flex flex-1 relative">
        {shouldShowSidebar && <Sidebar />}
        <main
          className={cn(
            "flex-1 px-4 py-6 md:px-6 md:py-8 transition-all duration-300",
            {
              "ml-0": !shouldShowSidebar || isMobile,
              "ml-0 md:ml-16": shouldShowSidebar && !isMobile, // Adjust based on collapsed sidebar
            },
            className
          )}
          style={{
            marginLeft: shouldShowSidebar && !isMobile ? "var(--sidebar-width, 4rem)" : "0",
          }}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
