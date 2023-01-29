interface User {
  id: string
  created_at?: string
  email: string
  full_name?: string
  avatar_url?: string
}

interface Chat {
  id: string
  created_at: string | null
  user1: User
  user2: User
}

interface Group {
  id: string
  created_at: string | null
  creator_id: string
  name: string
  image_url: string | null
}

export interface MessageChat {
  id: string
  created_at: string | null
  sender_id: User
  chat_id: string
  text: string | null
  media_link: string | null
  audio_link: string | null
}

export interface MessageGroup {
  id: string
  created_at: string | null
  sender_id: User
  group_id: string
  text: string | null
  media_link: string | null
  audio_link: string | null
}
