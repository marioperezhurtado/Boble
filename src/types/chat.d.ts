interface User {
  id: string
  created_at?: string
  email: string
  full_name?: string
  avatar_url?: string
}

interface Channel {
  id: string
  created_at: string | null
  user1: User
  user2: User
}

export interface Message {
  id: string
  created_at: string | null
  sender_id: string
  private_channel_id: string
  text: string
  media_link: string | null
}
