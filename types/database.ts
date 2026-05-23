export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "student" | "parent" | "teacher" | "admin";
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "student" | "parent" | "teacher" | "admin";
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "student" | "parent" | "teacher" | "admin";
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      news_articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string | null;
          category: string;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content?: string | null;
          category?: string;
          published_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string | null;
          category?: string;
          published_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      admission_inquiries: {
        Row: {
          id: string;
          parent_name: string;
          email: string;
          phone: string;
          grade_interest: string;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_name: string;
          email: string;
          phone: string;
          grade_interest: string;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          parent_name?: string;
          email?: string;
          phone?: string;
          grade_interest?: string;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          reference_id: string;
          student_name: string;
          gender: string;
          dob: string;
          grade: string;
          previous_school: string | null;
          parent_name: string;
          phone: string;
          email: string;
          address: string;
          notes: string | null;
          documents: Json;
          status: "pending" | "approved" | "rejected" | "contacted";
          admin_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reference_id: string;
          student_name: string;
          gender: string;
          dob: string;
          grade: string;
          previous_school?: string | null;
          parent_name: string;
          phone: string;
          email: string;
          address: string;
          notes?: string | null;
          documents?: Json;
          status?: "pending" | "approved" | "rejected" | "contacted";
          admin_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          reference_id?: string;
          student_name?: string;
          gender?: string;
          dob?: string;
          grade?: string;
          previous_school?: string | null;
          parent_name?: string;
          phone?: string;
          email?: string;
          address?: string;
          notes?: string | null;
          documents?: Json;
          status?: "pending" | "approved" | "rejected" | "contacted";
          admin_notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      next_application_reference: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
