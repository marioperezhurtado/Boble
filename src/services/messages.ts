import { supabase } from '@/lib/supabase'

interface GetMessages {
  channelId: string
}
interface SendMessage {
  senderId: string
  channelId: string
  text: string
  mediaLink: string | null
  audioLink: string | null
}
interface MessagesListener {
  channelId: string
  callback: () => void
}

export async function getChatMessages({ channelId }: GetMessages) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, sender_id(*)')
    .eq('chat_id', channelId)
    .order('created_at', { ascending: true })
  if (error) throw Error('Failed to get chat messages')
  if (!data) return []
  // Rename chat_id to channel_id
  const messages = data.map((message) => {
    const { chat_id: chatId, ...rest } = message
    return {
      ...rest,
      channel_id: chatId
    }
  })
  return messages
}

export async function getGroupMessages({ channelId }: GetMessages) {
  const { data, error } = await supabase
    .from('group_messages')
    .select('*, sender_id(*)')
    .eq('group_id', channelId)
    .order('created_at', { ascending: true })
  if (error) throw Error('Failed to get group messages')
  if (!data) return []
  // Rename group_id to channel_id
  const messages = data.map((message) => {
    const { group_id: groupId, ...rest } = message
    return {
      ...rest,
      channel_id: groupId
    }
  })

  return messages
}

export async function sendChatMessage({
  senderId,
  channelId,
  text,
  mediaLink,
  audioLink
}: SendMessage) {
  const { error } = await supabase.from('chat_messages').insert({
    sender_id: senderId,
    chat_id: channelId,
    text,
    media_link: mediaLink,
    audio_link: audioLink
  })
  if (error) throw Error('Failed to send chat message')
}

export async function sendGroupMessage({
  senderId,
  channelId,
  text,
  mediaLink,
  audioLink
}: SendMessage) {
  const { error } = await supabase.from('group_messages').insert({
    sender_id: senderId,
    group_id: channelId,
    text,
    media_link: mediaLink,
    audio_link: audioLink
  })
  if (error) throw Error('Failed to send group message')
}

export function chatMessagesListener({
  channelId,
  callback
}: MessagesListener) {
  return supabase
    .channel('public:chat_messages')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `chat_id=eq.${channelId}`
      },
      callback
    )
    .subscribe()
}

export function groupMessagesListener({
  channelId,
  callback
}: MessagesListener) {
  return supabase
    .channel('public:group_messages')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'group_messages',
        filter: `group_id=eq.${channelId}`
      },
      callback
    )
    .subscribe()
}
