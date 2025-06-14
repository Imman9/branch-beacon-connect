
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BibleNote, updateBibleNote, deleteBibleNote } from "@/services/bibleService";
import { Edit, Save, Trash2, X } from "lucide-react";
import { format } from "date-fns";

interface BibleNoteCardProps {
  note: BibleNote;
  onNoteUpdated: () => void;
  onNoteDeleted: () => void;
}

const BibleNoteCard: React.FC<BibleNoteCardProps> = ({ note, onNoteUpdated, onNoteDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.noteContent);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (editContent.trim() === "") {
      toast({
        title: "Error",
        description: "Note content cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateBibleNote(note.id, editContent);
      setIsEditing(false);
      onNoteUpdated();
      toast({
        title: "Note updated successfully!",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteBibleNote(note.id);
      onNoteDeleted();
      toast({
        title: "Note deleted successfully!",
        description: "The note has been removed.",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditContent(note.noteContent);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {note.book} {note.chapter}:{note.verse}
            </CardTitle>
            <CardDescription>
              {note.bibleVersion} • {format(new Date(note.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-wrap">{note.noteContent}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BibleNoteCard;
