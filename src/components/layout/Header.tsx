
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, User } from "lucide-react";

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/f8db5e17-fdcb-4da8-a244-2ec581d2a72c.png" 
              alt="Repentance and Holiness logo" 
              className="h-10 w-10 object-contain" 
            />
            <div className="font-serif text-lg md:text-xl font-medium text-church-700">
              Repentance and Holiness
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 flex h-2 w-2 rounded-full bg-church-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        src={authState.user?.avatar || ""} 
                        alt={`${authState.user?.firstName} ${authState.user?.lastName}`} 
                      />
                      <AvatarFallback className="bg-church-200 text-church-700">
                        {authState.user?.firstName?.[0]}
                        {authState.user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {authState.user?.firstName} {authState.user?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                    {authState.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  {(authState.user?.role === "admin" || authState.user?.role === "branch_admin") && (
                    <Link to="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Join Us</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
