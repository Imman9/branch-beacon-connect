
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreateBibleNoteData, createBibleNote } from "@/services/bibleService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const bibleNoteSchema = z.object({
  bibleVersion: z.string().min(1, "Bible version is required"),
  book: z.string().min(1, "Book is required"),
  chapter: z.coerce.number().min(1, "Chapter must be at least 1"),
  verse: z.coerce.number().min(1, "Verse must be at least 1"),
  noteContent: z.string().min(1, "Note content is required"),
});

type BibleNoteValues = z.infer<typeof bibleNoteSchema>;

interface BibleNoteFormProps {
  onNoteCreated: () => void;
}

const BibleNoteForm: React.FC<BibleNoteFormProps> = ({ onNoteCreated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<BibleNoteValues>({
    resolver: zodResolver(bibleNoteSchema),
    defaultValues: {
      bibleVersion: "NIV",
      book: "",
      chapter: 1,
      verse: 1,
      noteContent: "",
    },
  });

  const handleSubmit = async (values: BibleNoteValues) => {
    setIsLoading(true);
    try {
      // Ensure all values are properly typed as CreateBibleNoteData
      const noteData: CreateBibleNoteData = {
        bibleVersion: values.bibleVersion,
        book: values.book,
        chapter: values.chapter,
        verse: values.verse,
        noteContent: values.noteContent,
      };
      
      await createBibleNote(noteData);
      toast({
        title: "Note created successfully!",
        description: "Your Bible note has been saved.",
      });
      form.reset();
      onNoteCreated();
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Bible Note</CardTitle>
        <CardDescription>Create a new note for a specific Bible verse</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bibleVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bible Version</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NIV">NIV</SelectItem>
                        <SelectItem value="KJV">KJV</SelectItem>
                        <SelectItem value="ESV">ESV</SelectItem>
                        <SelectItem value="NASB">NASB</SelectItem>
                        <SelectItem value="NLT">NLT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="book"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Genesis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="chapter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verse</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="noteContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your thoughts, reflections, or insights about this verse..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full church-gradient" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Note
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BibleNoteForm;
