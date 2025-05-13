
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  MessageSquare,
  Mic,
  Music,
  User,
  Users,
  Bell,
  FileAudio,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isCollapsed, isActive }) => {
  return (
    <Link to={to} className="w-full no-underline">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start mb-1",
          isCollapsed ? "px-2" : "px-4",
          isActive ? "bg-church-700/10 text-church-700 font-medium" : ""
        )}
      >
        <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { authState } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Only render if user is authenticated
  if (!authState.isAuthenticated) return null;
  
  return (
    <div 
      className={cn(
        "fixed left-0 top-16 bottom-0 bg-gradient-to-b from-church-100 to-church-50 text-church-900 flex flex-col z-30 transition-all duration-300 border-r border-church-200",
        isCollapsed ? "w-16" : "w-64",
        isMobile ? "transform transition-transform ease-in-out duration-300 -translate-x-full md:translate-x-0" : ""
      )}
    >
      {/* Sidebar header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/" className="flex items-center no-underline">
            <h2 className="text-lg font-medium text-church-800 truncate">
              {authState.branch?.name || "Church App"}
            </h2>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleCollapse} 
          className="text-church-700 hover:bg-church-200 ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Navigation links */}
      <div className="flex-1 p-2 overflow-y-auto">
        <SidebarLink to="/dashboard" icon={Home} label="Dashboard" isCollapsed={isCollapsed} isActive={location.pathname === "/dashboard"} />
        <SidebarLink to="/events" icon={Calendar} label="Events" isCollapsed={isCollapsed} isActive={location.pathname === "/events"} />
        <SidebarLink to="/sermons" icon={Mic} label="Sermons" isCollapsed={isCollapsed} isActive={location.pathname === "/sermons"} />
        <SidebarLink to="/media" icon={FileAudio} label="Media" isCollapsed={isCollapsed} isActive={location.pathname === "/media"} />
        <SidebarLink to="/music" icon={Music} label="Music" isCollapsed={isCollapsed} isActive={location.pathname === "/music"} />
        <SidebarLink to="/radio" icon={Radio} label="Radio" isCollapsed={isCollapsed} isActive={location.pathname === "/radio"} />
        <SidebarLink to="/announcements" icon={Bell} label="Announcements" isCollapsed={isCollapsed} isActive={location.pathname === "/announcements"} />
        <SidebarLink to="/forums" icon={MessageSquare} label="Forums" isCollapsed={isCollapsed} isActive={location.pathname === "/forums"} />
        
        {/* Admin specific links */}
        {authState.user?.role === "admin" || authState.user?.role === "branch_admin" ? (
          <>
            <div className={cn("border-t border-church-200 my-2", isCollapsed ? "mx-1" : "mx-4")}></div>
            <SidebarLink to="/members" icon={Users} label="Members" isCollapsed={isCollapsed} isActive={location.pathname === "/members"} />
          </>
        ) : null}
        
        <SidebarLink to="/profile" icon={User} label="Profile" isCollapsed={isCollapsed} isActive={location.pathname === "/profile"} />
      </div>
    </div>
  );
};

export default Sidebar;
