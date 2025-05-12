
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        className={cn("w-full justify-start mb-1", 
          isCollapsed ? "px-2" : "px-4"
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
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Only render if user is authenticated
  if (!authState.isAuthenticated) return null;
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-medium text-sidebar-foreground">
              {authState.branch?.name || "Church App"}
            </h1>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleCollapse} 
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      {/* Navigation links */}
      <div className="flex-1 p-2 overflow-y-auto">
        <SidebarLink to="/dashboard" icon={Home} label="Dashboard" isCollapsed={isCollapsed} />
        <SidebarLink to="/events" icon={Calendar} label="Events" isCollapsed={isCollapsed} />
        <SidebarLink to="/sermons" icon={Mic} label="Sermons" isCollapsed={isCollapsed} />
        <SidebarLink to="/media" icon={FileAudio} label="Media" isCollapsed={isCollapsed} />
        <SidebarLink to="/music" icon={Music} label="Music" isCollapsed={isCollapsed} />
        <SidebarLink to="/radio" icon={Radio} label="Radio" isCollapsed={isCollapsed} />
        <SidebarLink to="/announcements" icon={Bell} label="Announcements" isCollapsed={isCollapsed} />
        <SidebarLink to="/forums" icon={MessageSquare} label="Forums" isCollapsed={isCollapsed} />
        
        {/* Admin specific links */}
        {authState.user?.role === "admin" || authState.user?.role === "branch_admin" ? (
          <>
            <div className={cn("border-t border-sidebar-border my-2", isCollapsed ? "mx-1" : "mx-4")}></div>
            <SidebarLink to="/members" icon={Users} label="Members" isCollapsed={isCollapsed} />
            <SidebarLink to="/profile" icon={User} label="Profile" isCollapsed={isCollapsed} />
          </>
        ) : (
          <SidebarLink to="/profile" icon={User} label="Profile" isCollapsed={isCollapsed} />
        )}
      </div>
      
      {/* Branch info */}
      <div className="p-3 border-t border-sidebar-border text-sm">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/70">
            {authState.branch?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
