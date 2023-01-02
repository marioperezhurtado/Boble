interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
}

interface Channel {
  id: string
  user1: User
  user2: User
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  text: string
  created_at: string
}
