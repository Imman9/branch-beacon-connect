
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BibleNote, fetchBibleNotes } from "@/services/bibleService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Book } from "lucide-react";
import BibleTabs from "@/components/features/BibleTabs";

const Bible = () => {
  const [notes, setNotes] = useState<BibleNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
      return;
    }
    loadNotes();
  }, [authState.isAuthenticated, navigate]);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const fetchedNotes = await fetchBibleNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
      toast({
        title: "Error",
        description: "Failed to load Bible notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-50 to-church-100/30 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Book className="h-10 w-10 text-church-600" />
            <h1 className="text-4xl font-bold text-church-700">Bible Study</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Read the Bible and create personal study notes. Click on any verse while reading to add your thoughts and insights.
          </p>
        </div>

        <BibleTabs 
          notes={notes} 
          isLoading={isLoading} 
          onNotesRefresh={loadNotes} 
        />
      </div>
    </div>
  );
};

export default Bible;
