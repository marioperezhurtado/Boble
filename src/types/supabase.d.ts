export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channel: {
        Row: {
          created_at: string | null
          name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          name?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          name?: string | null
          id?: string
        }
      }
      messages: {
        Row: {
          created_at: string | null
          text: string | null
          sender_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          text?: string | null
          sender_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          text?: string | null
          sender_id?: string | null
          id?: string
        }
      }
      private_messages: {
        Row: {
          created_at: string | null
          text: string
          sender_id: string
          receiver_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          text: string
          sender_id: string
          receiver_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          text?: string
          sender_id?: string
          receiver_id?: string | null
          id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
