
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Plus, BookOpen, Loader2 } from "lucide-react";
import { CreateBibleNoteData, createBibleNote } from "@/services/bibleService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  fetchBibleBooks, 
  fetchBibleChapter, 
  getChapterInfo, 
  BIBLE_VERSIONS, 
  BibleVersionKey,
  BibleBook 
} from "@/services/bibleApiService";

interface BibleReaderProps {
  onNoteCreated: () => void;
}

const BibleReader: React.FC<BibleReaderProps> = ({ onNoteCreated }) => {
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionKey>("KJV");
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [maxChapters, setMaxChapters] = useState(1);
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);
  const { toast } = useToast();

  // Load books when version changes
  useEffect(() => {
    loadBooks();
  }, [selectedVersion]);

  // Load chapter when book or chapter changes
  useEffect(() => {
    if (selectedBook) {
      loadChapter();
      loadChapterInfo();
    }
  }, [selectedBook, selectedChapter, selectedVersion]);

  const loadBooks = async () => {
    setIsLoadingBooks(true);
    try {
      const versionId = BIBLE_VERSIONS[selectedVersion];
      const fetchedBooks = await fetchBibleBooks(versionId);
      setBooks(fetchedBooks);
      
      // Set default book to Genesis if available
      const defaultBook = fetchedBooks.find(book => book.name.toLowerCase() === 'genesis') || fetchedBooks[0];
      if (defaultBook) {
        setSelectedBook(defaultBook);
        setSelectedChapter(1);
      }
    } catch (error) {
      console.error("Error loading books:", error);
      toast({
        title: "Error",
        description: "Failed to load Bible books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const loadChapter = async () => {
    if (!selectedBook) return;
    
    setIsLoadingChapter(true);
    try {
      const versionId = BIBLE_VERSIONS[selectedVersion];
      const { verses: chapterVerses } = await fetchBibleChapter(
        versionId,
        selectedBook.id,
        selectedChapter
      );
      setVerses(chapterVerses);
      setSelectedVerse(null);
    } catch (error) {
      console.error("Error loading chapter:", error);
      toast({
        title: "Error",
        description: "Failed to load chapter. Please try again.",
        variant: "destructive",
      });
      setVerses([]);
    } finally {
      setIsLoadingChapter(false);
    }
  };

  const loadChapterInfo = async () => {
    if (!selectedBook) return;
    
    try {
      const versionId = BIBLE_VERSIONS[selectedVersion];
      const { totalChapters } = await getChapterInfo(versionId, selectedBook.id);
      setMaxChapters(totalChapters);
    } catch (error) {
      console.error("Error loading chapter info:", error);
      setMaxChapters(50); // Fallback to reasonable default
    }
  };

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < maxChapters) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
  };

  const handleAddNote = async () => {
    if (!selectedVerse || !noteContent.trim() || !selectedBook) {
      toast({
        title: "Error",
        description: "Please select a verse and enter note content.",
        variant: "destructive",
      });
      return;
    }

    try {
      const noteData: CreateBibleNoteData = {
        bibleVersion: selectedVersion,
        book: selectedBook.name,
        chapter: selectedChapter,
        verse: selectedVerse,
        noteContent: noteContent,
      };

      await createBibleNote(noteData);
      toast({
        title: "Note added successfully!",
        description: `Note added for ${selectedBook.name} ${selectedChapter}:${selectedVerse}`,
      });
      setNoteContent("");
      setIsNoteDialogOpen(false);
      setSelectedVerse(null);
      onNoteCreated();
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Controls */}
      <Card className="border-church-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-church-700">
            <BookOpen className="h-5 w-5" />
            Bible Reader
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-church-600 mb-2 block">Version</label>
              <Select value={selectedVersion} onValueChange={(value: BibleVersionKey) => setSelectedVersion(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BIBLE_VERSIONS).map(([key, _]) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-church-600 mb-2 block">Book</label>
              <Select 
                value={selectedBook?.id || ""} 
                onValueChange={(bookId) => {
                  const book = books.find(b => b.id === bookId);
                  if (book) {
                    setSelectedBook(book);
                    setSelectedChapter(1);
                  }
                }}
                disabled={isLoadingBooks}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingBooks ? "Loading..." : "Select a book"} />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {books.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-church-600 mb-2 block">Chapter</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousChapter}
                  disabled={selectedChapter === 1 || isLoadingChapter}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center font-medium">
                  {selectedChapter}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextChapter}
                  disabled={selectedChapter === maxChapters || isLoadingChapter}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bible Text Display */}
      <Card className="border-church-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-church-700">
            {selectedBook?.name} {selectedChapter} ({selectedVersion})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingChapter ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading chapter...</span>
            </div>
          ) : verses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unable to load this chapter. Please try selecting a different chapter or version.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {verses.map((verse, index) => {
                const verseNumber = index + 1;
                const isSelected = selectedVerse === verseNumber;
                
                return (
                  <div
                    key={verseNumber}
                    className={`group relative p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-church-50 border-2 border-church-300 shadow-md"
                        : "hover:bg-church-25 border border-transparent hover:border-church-200"
                    }`}
                    onClick={() => handleVerseClick(verseNumber)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-church-100 text-church-700 rounded-full flex items-center justify-center text-sm font-semibold">
                        {verseNumber}
                      </span>
                      <p className="text-gray-800 leading-relaxed text-lg flex-1">
                        {verse}
                      </p>
                      {isSelected && (
                        <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" className="church-gradient">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Note
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Add Note for {selectedBook?.name} {selectedChapter}:{selectedVerse}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Note Content</label>
                                <Textarea
                                  value={noteContent}
                                  onChange={(e) => setNoteContent(e.target.value)}
                                  placeholder="Write your thoughts, reflections, or insights about this verse..."
                                  className="min-h-[120px]"
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddNote} className="church-gradient">
                                  Save Note
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BibleReader;
