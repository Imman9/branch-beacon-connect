
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText } from "lucide-react";
import BibleReader from "./BibleReader";
import BibleNoteForm from "./BibleNoteForm";
import BibleNoteCard from "./BibleNoteCard";
import { BibleNote } from "@/services/bibleService";

interface BibleTabsProps {
  notes: BibleNote[];
  isLoading: boolean;
  onNotesRefresh: () => void;
}

const BibleTabs: React.FC<BibleTabsProps> = ({ notes, isLoading, onNotesRefresh }) => {
  return (
    <Tabs defaultValue="reader" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="reader" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Bible Reader
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          My Notes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="reader" className="space-y-6">
        <BibleReader onNoteCreated={onNotesRefresh} />
      </TabsContent>

      <TabsContent value="notes" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BibleNoteForm onNoteCreated={onNotesRefresh} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-church-600"></div>
                <span className="ml-2">Loading your notes...</span>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No notes yet</h3>
                <p className="text-muted-foreground">
                  Start by creating your first Bible study note using the form on the left, or add notes while reading.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <BibleNoteCard
                    key={note.id}
                    note={note}
                    onNoteUpdated={onNotesRefresh}
                    onNoteDeleted={onNotesRefresh}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BibleTabs;
