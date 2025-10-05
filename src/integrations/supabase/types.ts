export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_date: string
          category: Database["public"]["Enums"]["activity_category"]
          created_at: string
          description: string
          duration: string | null
          id: string
          location: string | null
          organization: string | null
          participants: string | null
          rank: string | null
          skills: string[] | null
          student_id: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          activity_date: string
          category: Database["public"]["Enums"]["activity_category"]
          created_at?: string
          description: string
          duration?: string | null
          id?: string
          location?: string | null
          organization?: string | null
          participants?: string | null
          rank?: string | null
          skills?: string[] | null
          student_id: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          activity_date?: string
          category?: Database["public"]["Enums"]["activity_category"]
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          location?: string | null
          organization?: string | null
          participants?: string | null
          rank?: string | null
          skills?: string[] | null
          student_id?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      approvals: {
        Row: {
          approved_at: string
          blockchain_hash: string | null
          digital_signature: string | null
          faculty_id: string
          feedback: string
          id: string
          marks: number | null
          status: Database["public"]["Enums"]["submission_status"]
          submission_id: string
        }
        Insert: {
          approved_at?: string
          blockchain_hash?: string | null
          digital_signature?: string | null
          faculty_id: string
          feedback: string
          id?: string
          marks?: number | null
          status: Database["public"]["Enums"]["submission_status"]
          submission_id: string
        }
        Update: {
          approved_at?: string
          blockchain_hash?: string | null
          digital_signature?: string | null
          faculty_id?: string
          feedback?: string
          id?: string
          marks?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          blockchain_hash: string | null
          blockchain_verified: boolean | null
          generated_at: string
          id: string
          pdf_url: string | null
          student_id: string
          updated_at: string
          web_url: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          blockchain_verified?: boolean | null
          generated_at?: string
          id?: string
          pdf_url?: string | null
          student_id: string
          updated_at?: string
          web_url?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          blockchain_verified?: boolean | null
          generated_at?: string
          id?: string
          pdf_url?: string | null
          student_id?: string
          updated_at?: string
          web_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          program: string | null
          roll_number: string | null
          updated_at: string
          year: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id: string
          program?: string | null
          roll_number?: string | null
          updated_at?: string
          year?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          program?: string | null
          roll_number?: string | null
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          activity_id: string
          files: string[] | null
          id: string
          max_marks: number
          status: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at: string
          suggested_points: number | null
          updated_at: string
        }
        Insert: {
          activity_id: string
          files?: string[] | null
          id?: string
          max_marks?: number
          status?: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at?: string
          suggested_points?: number | null
          updated_at?: string
        }
        Update: {
          activity_id?: string
          files?: string[] | null
          id?: string
          max_marks?: number
          status?: Database["public"]["Enums"]["submission_status"]
          student_id?: string
          submitted_at?: string
          suggested_points?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_data: {
        Row: {
          ai_content_risk: number | null
          created_at: string
          cross_reference: string | null
          document_authenticity: number | null
          id: string
          plagiarism_risk: number | null
          submission_id: string
        }
        Insert: {
          ai_content_risk?: number | null
          created_at?: string
          cross_reference?: string | null
          document_authenticity?: number | null
          id?: string
          plagiarism_risk?: number | null
          submission_id: string
        }
        Update: {
          ai_content_risk?: number | null
          created_at?: string
          cross_reference?: string | null
          document_authenticity?: number | null
          id?: string
          plagiarism_risk?: number | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_data_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      activity_category:
        | "conferences"
        | "certifications"
        | "club_activities"
        | "internships"
        | "community_service"
        | "competitions"
      app_role: "student" | "faculty" | "admin" | "government"
      submission_status: "pending" | "approved" | "rejected" | "under_review"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_category: [
        "conferences",
        "certifications",
        "club_activities",
        "internships",
        "community_service",
        "competitions",
      ],
      app_role: ["student", "faculty", "admin", "government"],
      submission_status: ["pending", "approved", "rejected", "under_review"],
    },
  },
} as const
