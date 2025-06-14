
// Bible API service for fetching verses from api.bible
const BIBLE_API_BASE_URL = "https://api.scripture.api.bible/v1";
const BIBLE_API_KEY = "de4e12af7f28f06d652ab263169b3757"; // Public demo key

export interface BibleVerse {
  id: string;
  orgId: string;
  bookId: string;
  chapterNumber: number;
  verseNumber: number;
  content: string;
}

export interface BibleChapter {
  id: string;
  number: string;
  content: string;
  verseCount: number;
}

export interface BibleBook {
  id: string;
  name: string;
  nameLong: string;
  abbreviation: string;
}

// Available Bible versions with their IDs
export const BIBLE_VERSIONS = {
  "ASV": "06125adad2d5898a-01", // American Standard Version
  "BBE": "65eec8e0b60e656b-01", // Bible in Basic English
  "WEB": "9879dbb7cfe39e4d-01", // World English Bible
  "KJV": "de4e12af7f28f06d-02", // King James Version
} as const;

export type BibleVersionKey = keyof typeof BIBLE_VERSIONS;

const getHeaders = () => ({
  "api-key": BIBLE_API_KEY,
  "Content-Type": "application/json",
});

export const fetchBibleBooks = async (versionId: string): Promise<BibleBook[]> => {
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/bibles/${versionId}/books`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching Bible books:", error);
    throw error;
  }
};

export const fetchBibleChapter = async (
  versionId: string,
  bookId: string,
  chapterNumber: number
): Promise<{ verses: string[]; chapterInfo: BibleChapter | null }> => {
  try {
    const response = await fetch(
      `${BIBLE_API_BASE_URL}/bibles/${versionId}/books/${bookId}/chapters/${chapterNumber}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch chapter: ${response.statusText}`);
    }

    const data = await response.json();
    const chapterContent = data.data?.content || "";
    
    // Parse verses from the content
    const verses = parseVersesFromContent(chapterContent);
    
    return {
      verses,
      chapterInfo: data.data || null,
    };
  } catch (error) {
    console.error("Error fetching Bible chapter:", error);
    throw error;
  }
};

// Helper function to parse individual verses from chapter content
const parseVersesFromContent = (content: string): string[] => {
  if (!content) return [];
  
  // Remove HTML tags and clean up the content
  const cleanContent = content.replace(/<[^>]*>/g, "").trim();
  
  // Split by verse numbers (looking for patterns like "1 ", "2 ", etc.)
  const versePattern = /(\d+)\s+/g;
  const parts = cleanContent.split(versePattern);
  
  const verses: string[] = [];
  
  // Process the split parts to reconstruct verses
  for (let i = 1; i < parts.length; i += 2) {
    const verseNumber = parts[i];
    const verseText = parts[i + 1];
    
    if (verseText && verseText.trim()) {
      verses.push(verseText.trim());
    }
  }
  
  // If parsing fails, return the whole content as a single verse
  if (verses.length === 0 && cleanContent) {
    return [cleanContent];
  }
  
  return verses;
};

export const getChapterInfo = async (
  versionId: string,
  bookId: string
): Promise<{ totalChapters: number }> => {
  try {
    const response = await fetch(`${BIBLE_API_BASE_URL}/bibles/${versionId}/books/${bookId}/chapters`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chapter info: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      totalChapters: data.data?.length || 1,
    };
  } catch (error) {
    console.error("Error fetching chapter info:", error);
    return { totalChapters: 1 };
  }
};
