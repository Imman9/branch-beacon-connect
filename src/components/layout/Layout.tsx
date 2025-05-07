
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { authState } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {authState.isAuthenticated && <Sidebar />}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
