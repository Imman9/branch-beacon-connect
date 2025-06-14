
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Layout from "@/components/layout/Layout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Sermons from "./pages/Sermons";
import Media from "./pages/Media";
import Music from "./pages/Music";
import Radio from "./pages/Radio";
import Announcements from "./pages/Announcements";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Bible from "./pages/Bible";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - All using a single Layout wrapper */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="/media" element={<Media />} />
                <Route path="/music" element={<Music />} />
                <Route path="/radio" element={<Radio />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/bible" element={<Bible />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
