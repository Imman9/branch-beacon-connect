
import { supabase } from "@/integrations/supabase/client";

export interface BibleNote {
  id: string;
  userId: string;
  bibleVersion: string;
  book: string;
  chapter: number;
  verse: number;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBibleNoteData {
  bibleVersion: string;
  book: string;
  chapter: number;
  verse: number;
  noteContent: string;
}

export const createBibleNote = async (noteData: CreateBibleNoteData): Promise<BibleNote | null> => {
  const { data, error } = await supabase
    .from("bible_notes")
    .insert({
      bible_version: noteData.bibleVersion,
      book: noteData.book,
      chapter: noteData.chapter,
      verse: noteData.verse,
      note_content: noteData.noteContent,
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating bible note:", error);
    throw error;
  }

  return data ? {
    id: data.id,
    userId: data.user_id,
    bibleVersion: data.bible_version,
    book: data.book,
    chapter: data.chapter,
    verse: data.verse,
    noteContent: data.note_content,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  } : null;
};

export const fetchBibleNotes = async (): Promise<BibleNote[]> => {
  const { data, error } = await supabase
    .from("bible_notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bible notes:", error);
    throw error;
  }

  return data.map(note => ({
    id: note.id,
    userId: note.user_id,
    bibleVersion: note.bible_version,
    book: note.book,
    chapter: note.chapter,
    verse: note.verse,
    noteContent: note.note_content,
    createdAt: note.created_at,
    updatedAt: note.updated_at
  }));
};

export const updateBibleNote = async (id: string, noteContent: string): Promise<BibleNote | null> => {
  const { data, error } = await supabase
    .from("bible_notes")
    .update({ 
      note_content: noteContent,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating bible note:", error);
    throw error;
  }

  return data ? {
    id: data.id,
    userId: data.user_id,
    bibleVersion: data.bible_version,
    book: data.book,
    chapter: data.chapter,
    verse: data.verse,
    noteContent: data.note_content,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  } : null;
};

export const deleteBibleNote = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("bible_notes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting bible note:", error);
    throw error;
  }
};
