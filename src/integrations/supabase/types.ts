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
      crops: {
        Row: {
          available: boolean
          category: Database["public"]["Enums"]["crop_category"]
          created_at: string
          crop_name: string
          description: string | null
          farmer_id: string
          harvest_date: string
          id: string
          image_url: string | null
          price_per_unit: number
          quantity: number
          unit: string
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: Database["public"]["Enums"]["crop_category"]
          created_at?: string
          crop_name: string
          description?: string | null
          farmer_id: string
          harvest_date: string
          id?: string
          image_url?: string | null
          price_per_unit: number
          quantity: number
          unit: string
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: Database["public"]["Enums"]["crop_category"]
          created_at?: string
          crop_name?: string
          description?: string | null
          farmer_id?: string
          harvest_date?: string
          id?: string
          image_url?: string | null
          price_per_unit?: number
          quantity?: number
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      factories: {
        Row: {
          company_name: string
          created_at: string
          id: string
          materials_needed: string[] | null
        }
        Insert: {
          company_name: string
          created_at?: string
          id: string
          materials_needed?: string[] | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          materials_needed?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "factories_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      farmers: {
        Row: {
          created_at: string
          farm_size: string | null
          id: string
          primary_crops: string[] | null
        }
        Insert: {
          created_at?: string
          farm_size?: string | null
          id: string
          primary_crops?: string[] | null
        }
        Update: {
          created_at?: string
          farm_size?: string | null
          id?: string
          primary_crops?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "farmers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          location: string
          phone: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          location: string
          phone?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          location?: string
          phone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          created_at: string
          crop_id: string
          factory_id: string
          farmer_id: string
          id: string
          message: string | null
          offered_price: number
          quantity: number
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_id: string
          factory_id: string
          farmer_id: string
          id?: string
          message?: string | null
          offered_price: number
          quantity: number
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_id?: string
          factory_id?: string
          farmer_id?: string
          id?: string
          message?: string | null
          offered_price?: number
          quantity?: number
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          active: boolean
          category: Database["public"]["Enums"]["crop_category"]
          created_at: string
          description: string | null
          factory_id: string
          id: string
          material_name: string
          price_willing: number
          quantity_needed: number
          unit: string
          updated_at: string
          urgent: boolean
        }
        Insert: {
          active?: boolean
          category: Database["public"]["Enums"]["crop_category"]
          created_at?: string
          description?: string | null
          factory_id: string
          id?: string
          material_name: string
          price_willing: number
          quantity_needed: number
          unit: string
          updated_at?: string
          urgent?: boolean
        }
        Update: {
          active?: boolean
          category?: Database["public"]["Enums"]["crop_category"]
          created_at?: string
          description?: string | null
          factory_id?: string
          id?: string
          material_name?: string
          price_willing?: number
          quantity_needed?: number
          unit?: string
          updated_at?: string
          urgent?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "requirements_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories"
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
      crop_category:
        | "grains"
        | "vegetables"
        | "fruits"
        | "spices"
        | "pulses"
        | "oilseeds"
        | "other"
      request_status: "pending" | "accepted" | "rejected" | "completed"
      user_type: "farmer" | "factory"
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
      crop_category: [
        "grains",
        "vegetables",
        "fruits",
        "spices",
        "pulses",
        "oilseeds",
        "other",
      ],
      request_status: ["pending", "accepted", "rejected", "completed"],
      user_type: ["farmer", "factory"],
    },
  },
} as const
