
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Plus, BookOpen } from "lucide-react";
import { CreateBibleNoteData, createBibleNote } from "@/services/bibleService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample Bible data structure - in a real app, this would come from an API
const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah",
  "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
  "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John",
  "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
  "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
];

// Sample verses for demonstration - in a real app, this would be fetched from a Bible API
const SAMPLE_VERSES = {
  "John": {
    1: [
      "In the beginning was the Word, and the Word was with God, and the Word was God.",
      "He was with God in the beginning.",
      "Through him all things were made; without him nothing was made that has been made.",
      "In him was life, and that life was the light of all mankind.",
      "The light shines in the darkness, and the darkness has not overcome it."
    ]
  },
  "Genesis": {
    1: [
      "In the beginning God created the heavens and the earth.",
      "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
      "And God said, 'Let there be light,' and there was light.",
      "God saw that the light was good, and he separated the light from the darkness.",
      "God called the light 'day,' and the darkness he called 'night.' And there was evening, and there was morning—the first day."
    ]
  }
};

interface BibleReaderProps {
  onNoteCreated: () => void;
}

const BibleReader: React.FC<BibleReaderProps> = ({ onNoteCreated }) => {
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVersion, setSelectedVersion] = useState("NIV");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const currentVerses = SAMPLE_VERSES[selectedBook as keyof typeof SAMPLE_VERSES]?.[selectedChapter] || 
    ["This chapter is not available in the demo. Please select John 1 or Genesis 1 to see sample content."];

  const maxChapters = selectedBook === "John" ? 21 : selectedBook === "Genesis" ? 50 : 1;

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
      setSelectedVerse(null);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < maxChapters) {
      setSelectedChapter(selectedChapter + 1);
      setSelectedVerse(null);
    }
  };

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
  };

  const handleAddNote = async () => {
    if (!selectedVerse || !noteContent.trim()) {
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
        book: selectedBook,
        chapter: selectedChapter,
        verse: selectedVerse,
        noteContent: noteContent,
      };

      await createBibleNote(noteData);
      toast({
        title: "Note added successfully!",
        description: `Note added for ${selectedBook} ${selectedChapter}:${selectedVerse}`,
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
              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIV">NIV</SelectItem>
                  <SelectItem value="KJV">KJV</SelectItem>
                  <SelectItem value="ESV">ESV</SelectItem>
                  <SelectItem value="NASB">NASB</SelectItem>
                  <SelectItem value="NLT">NLT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-church-600 mb-2 block">Book</label>
              <Select value={selectedBook} onValueChange={(value) => {
                setSelectedBook(value);
                setSelectedChapter(1);
                setSelectedVerse(null);
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {BIBLE_BOOKS.map((book) => (
                    <SelectItem key={book} value={book}>
                      {book}
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
                  disabled={selectedChapter === 1}
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
                  disabled={selectedChapter === maxChapters}
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
            {selectedBook} {selectedChapter} ({selectedVersion})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentVerses.map((verse, index) => {
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
                              Add Note for {selectedBook} {selectedChapter}:{selectedVerse}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default BibleReader;
