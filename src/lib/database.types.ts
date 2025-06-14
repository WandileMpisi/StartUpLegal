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
      compliance_items: {
        Row: {
          created_at: string
          description: string
          document_url: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          official_site_url: string | null
          question_id: string | null
          status: Database["public"]["Enums"]["item_status"]
          title: string
          type: Database["public"]["Enums"]["compliance_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          document_url?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          official_site_url?: string | null
          question_id?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          title: string
          type?: Database["public"]["Enums"]["compliance_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          document_url?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          official_site_url?: string | null
          question_id?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          title?: string
          type?: Database["public"]["Enums"]["compliance_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_items_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "compliance_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_questions: {
        Row: {
          compliance_requirement: string
          created_at: string
          deadlines_renewals: string
          documentation_required: string
          id: string
          implementation_steps: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          law_requirement: string
          question: string
          question_key: string
          submission_details: string
          updated_at: string
        }
        Insert: {
          compliance_requirement: string
          created_at?: string
          deadlines_renewals: string
          documentation_required: string
          id?: string
          implementation_steps: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          law_requirement: string
          question: string
          question_key: string
          submission_details: string
          updated_at?: string
        }
        Update: {
          compliance_requirement?: string
          created_at?: string
          deadlines_renewals?: string
          documentation_required?: string
          id?: string
          implementation_steps?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          law_requirement?: string
          question?: string
          question_key?: string
          submission_details?: string
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string
          description: string | null
          id: string
          label: string
          name: Database["public"]["Enums"]["industry_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          label: string
          name: Database["public"]["Enums"]["industry_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          name?: Database["public"]["Enums"]["industry_type"]
        }
        Relationships: []
      }
      onboarding_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: number | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: number | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: number | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name: string
          id: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_responses: {
        Row: {
          created_at: string
          id: string
          question_id: string
          response: Database["public"]["Enums"]["response_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: string
          response: Database["public"]["Enums"]["response_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          response?: Database["public"]["Enums"]["response_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "compliance_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      compliance_type: "Required" | "Recommended" | "Optional"
      industry_type:
        | "Technology"
        | "Financial Services"
        | "Healthcare"
        | "Education"
        | "Manufacturing"
        | "Agriculture"
        | "Transport & Logistics"
        | "Construction"
        | "Hospitality & Tourism"
        | "Mining"
        | "Professional Services"
      item_status: "Completed" | "Pending"
      response_type: "Yes" | "No" | "NotApplicable"
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never