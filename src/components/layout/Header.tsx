
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { authState, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = () => {
    const user = authState.user;
    if (!user) return "?";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b shadow-md",
      authState.isAuthenticated ? "bg-white text-church-900 border-church-200" : "bg-white text-church-900 border-church-200"
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {authState.isAuthenticated && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden text-church-800 hover:bg-church-100"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="no-underline flex items-center">
            <img 
              src="/lovable-uploads/660bda31-e9e0-4192-b7a1-63fc12aee703.png" 
              alt="Repentance & Holiness Logo" 
              className="h-10 w-10 mr-2"
            />
            <h2 className="text-lg md:text-xl font-semibold text-church-800">
              Repentance & Holiness
            </h2>
          </Link>
        </div>
        {authState.isAuthenticated ? (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:bg-church-100"
                >
                  <Avatar>
                    <AvatarImage
                      src={authState.user?.avatar}
                      alt={authState.user?.firstName}
                    />
                    <AvatarFallback className="bg-church-600 text-white">{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {authState.user?.firstName} {authState.user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {authState.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/login" className="no-underline">
                Login
              </Link>
            </Button>
            <Button variant="default" className="bg-church-600 hover:bg-church-700" asChild>
              <Link to="/register" className="no-underline">
                Register
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
