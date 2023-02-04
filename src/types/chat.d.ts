interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
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
  avatar_url: string | null
}

export interface Message {
  id: string
  created_at: string | null
  sender_id: User
  channel_id: string
  text: string | null
  media_link: string | null
  audio_link: string | null
}

export interface Participant {
  group_id: string
  joined_at?: string
  user_id: User
}
