import { User } from './chat'

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
          created_at: string | null
          id: string
          user1: User
          user2: User
        }
        Insert: {
          created_at?: string | null
          id?: string
          user1: string
          user2: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user1?: string
          user2?: string
        }
      }
      private_messages: {
        Row: {
          audio_link: string | null
          created_at: string | null
          id: string
          media_link: string | null
          private_channel_id: string
          sender_id: string
          text: string | null
        }
        Insert: {
          audio_link?: string | null
          created_at?: string | null
          id?: string
          media_link?: string | null
          private_channel_id: string
          sender_id: string
          text?: string | null
        }
        Update: {
          audio_link?: string | null
          created_at?: string | null
          id?: string
          media_link?: string | null
          private_channel_id?: string
          sender_id?: string
          text?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          email?: string
          full_name?: string | null
          id?: string
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
