import { User } from '@types/chat'

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
      chat_messages: {
        Row: {
          audio_link: string | null
          chat_id: string
          created_at: string
          id: string
          media_link: string | null
          sender_id: User
          text: string | null
        }
        Insert: {
          audio_link?: string | null
          chat_id: string
          created_at?: string
          id?: string
          media_link?: string | null
          sender_id: string
          text?: string | null
        }
        Update: {
          audio_link?: string | null
          chat_id?: string
          created_at?: string
          id?: string
          media_link?: string | null
          sender_id?: string
          text?: string | null
        }
      }
      chats: {
        Row: {
          audio_link: string | null
          created_at: string
          id: string
          media_link: string | null
          text: string | null
          user1: User
          user2: User
        }
        Insert: {
          audio_link?: string | null
          created_at?: string
          id?: string
          media_link?: string | null
          text?: string | null
          user1: string
          user2: string
        }
        Update: {
          audio_link?: string | null
          created_at?: string
          id?: string
          media_link?: string | null
          text?: string | null
          user1?: string
          user2?: string
        }
      }
      groups: {
        Row: {
          created_at: string
          creator_id: string
          id: string
          avatar_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: string
          avatar_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: string
          avatar_url?: string | null
          name?: string
        }
      }
      group_messages: {
        Row: {
          audio_link: string | null
          created_at: string
          group_id: string
          id: string
          media_link: string | null
          sender_id: User
          text: string | null
        }
        Insert: {
          audio_link?: string | null
          created_at?: string
          group_id: string
          id?: string
          media_link?: string | null
          sender_id: string
          text?: string | null
        }
        Update: {
          audio_link?: string | null
          created_at?: string
          group_id?: string
          id?: string
          media_link?: string | null
          sender_id?: string
          text?: string | null
        }
      }
      group_participants: {
        Row: {
          group_id: string
          joined_at: string
          user_id: User
        }
        Insert: {
          group_id: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
          user_id?: string
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
