
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BibleNote, fetchBibleNotes } from "@/services/bibleService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Book } from "lucide-react";
import BibleNoteForm from "@/components/features/BibleNoteForm";
import BibleNoteCard from "@/components/features/BibleNoteCard";

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
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Book className="h-8 w-8 text-church-600" />
            <h1 className="text-3xl font-bold text-church-700">Bible Study Notes</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create, organize, and reflect on your personal Bible study notes. Add insights, 
            thoughts, and reflections for specific verses to deepen your understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BibleNoteForm onNoteCreated={loadNotes} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading your notes...</span>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-8">
                <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No notes yet</h3>
                <p className="text-muted-foreground">
                  Start by creating your first Bible study note using the form on the left.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <BibleNoteCard
                    key={note.id}
                    note={note}
                    onNoteUpdated={loadNotes}
                    onNoteDeleted={loadNotes}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bible;
