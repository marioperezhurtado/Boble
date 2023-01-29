import { supabase } from '../lib/supabase'

interface GetChats {
  userId: string
}
interface CreateChat {
  userId: string
  friendId: string
}
interface ChatsListener {
  userId: string
  callback: () => void
}

export async function getChats({ userId }: GetChats) {
  const { data, error } = await supabase
    .from('chats')
    .select('*, user1(*), user2(*)')
    .or(`user1.eq.${userId},user2.eq.${userId}`)
    .order('created_at', { ascending: false })
  if (error) throw Error('Failed to get channels')
  return data
}

export async function createChat({ userId, friendId }: CreateChat) {
  const { error } = await supabase
    .from('chats')
    .insert({ user1: userId, user2: friendId })
  if (error) {
    throw Error('Failed to create channel')
  }
}

export function chatsListener({ userId, callback }: ChatsListener) {
  return supabase
    .channel('public:chats')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chats',
        filter: `user1=eq.${userId},user2=eq.${userId}`
      },
      callback
    )
    .subscribe()
}
