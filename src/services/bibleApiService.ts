
// Bible API service for fetching verses from api.bible
const BIBLE_API_BASE_URL = "https://api.scripture.api.bible/v1";

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

const getHeaders = (apiKey: string) => ({
  "api-key": apiKey,
  "Content-Type": "application/json",
});

// Get API key from Supabase Edge Function
const getBibleApiKey = async (): Promise<string> => {
  try {
    const response = await fetch('/functions/v1/get-bible-api-key', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve API key');
    }

    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error('Error getting Bible API key:', error);
    throw new Error("Bible API key not configured. Please contact administrator to set up the API key.");
  }
};

export const fetchBibleBooks = async (versionId: string): Promise<BibleBook[]> => {
  console.log(`Fetching books for version: ${versionId}`);
  
  try {
    const apiKey = await getBibleApiKey();
    const response = await fetch(`${BIBLE_API_BASE_URL}/bibles/${versionId}/books`, {
      headers: getHeaders(apiKey),
    });

    console.log(`API Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your Bible API key configuration.");
      }
      
      throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.data?.length || 0} books`);
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
  console.log(`Fetching chapter ${chapterNumber} from book ${bookId}`);
  
  try {
    const apiKey = await getBibleApiKey();
    const response = await fetch(
      `${BIBLE_API_BASE_URL}/bibles/${versionId}/books/${bookId}/chapters/${chapterNumber}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true`,
      {
        headers: getHeaders(apiKey),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Chapter API Error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your Bible API key configuration.");
      }
      
      throw new Error(`Failed to fetch chapter: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const chapterContent = data.data?.content || "";
    
    // Parse verses from the content
    const verses = parseVersesFromContent(chapterContent);
    console.log(`Parsed ${verses.length} verses from chapter`);
    
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
  console.log(`Getting chapter info for book ${bookId}`);
  
  try {
    const apiKey = await getBibleApiKey();
    const response = await fetch(`${BIBLE_API_BASE_URL}/bibles/${versionId}/books/${bookId}/chapters`, {
      headers: getHeaders(apiKey),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Chapter info API Error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your Bible API key configuration.");
      }
      
      throw new Error(`Failed to fetch chapter info: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Found ${data.data?.length || 1} chapters`);
    return {
      totalChapters: data.data?.length || 1,
    };
  } catch (error) {
    console.error("Error fetching chapter info:", error);
    return { totalChapters: 1 };
  }
};
