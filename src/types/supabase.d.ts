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
      private_channels: {
        Row: {
          id: string
          created_at: string | null
          user1: User
          user2: User
        }
        Insert: {
          id?: string
          created_at?: string | null
          user1: string
          user2: string
        }
        Update: {
          id?: string
          created_at?: string | null
          user1?: string
          user2?: string
        }
      }
      private_messages: {
        Row: {
          created_at: string | null
          text: string
          media_link: string | null
          id: string
          sender_id: string
          private_channel_id: string
        }
        Insert: {
          created_at?: string | null
          text: string
          id?: string
          sender_id: string
          private_channel_id: string
        }
        Update: {
          created_at?: string | null
          text?: string
          id?: string
          sender_id?: string
          private_channel_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          email: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          email: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string
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
