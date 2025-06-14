export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          branch_id: string
          content: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          priority: string
          title: string
          updated_at: string
        }
        Insert: {
          branch_id: string
          content: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          priority?: string
          title: string
          updated_at?: string
        }
        Update: {
          branch_id?: string
          content?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          priority?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      bible_notes: {
        Row: {
          bible_version: string
          book: string
          chapter: number
          created_at: string
          id: string
          note_content: string
          updated_at: string
          user_id: string
          verse: number
        }
        Insert: {
          bible_version?: string
          book: string
          chapter: number
          created_at?: string
          id?: string
          note_content: string
          updated_at?: string
          user_id: string
          verse: number
        }
        Update: {
          bible_version?: string
          book?: string
          chapter?: number
          created_at?: string
          id?: string
          note_content?: string
          updated_at?: string
          user_id?: string
          verse?: number
        }
        Relationships: []
      }
      branches: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: string
          logo: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location: string
          logo?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          logo?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string
          description: string | null
          event_date: string
          id: string
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by: string
          description?: string | null
          event_date: string
          id?: string
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          event_date?: string
          id?: string
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          max_members: number | null
          name: string
          updated_at: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          max_members?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          max_members?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      media_content: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          media_type: string
          media_url: string
          title: string
          updated_at: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          media_type: string
          media_url: string
          title: string
          updated_at?: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          media_type?: string
          media_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_content_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          branch_id: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          branch_id?: string | null
          created_at?: string
          first_name: string
          id: string
          last_name: string
          role: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          branch_id?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      sermons: {
        Row: {
          audio_url: string | null
          branch_id: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          sermon_date: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          branch_id: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          sermon_date: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          branch_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          sermon_date?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sermons_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_first_user_in_branch: {
        Args: { branch_id: string }
        Returns: boolean
      }
      is_profile_owner: {
        Args: { profile_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "branch_admin" | "member" | "guest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "branch_admin", "member", "guest"],
    },
  },
} as const
