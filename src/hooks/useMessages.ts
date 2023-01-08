import { supabase } from '../supabase'

interface GetMessages {
  channelId: string
}
interface SendMessage {
  senderId: string
  channelId: string
  text: string
  mediaLink: string | null
}
interface MessagesListener {
  channelId: string
  callback: () => void
}

export async function getMessages({ channelId }: GetMessages) {
  const { data, error } = await supabase
    .from('private_messages')
    .select('*')
    .eq('private_channel_id', channelId)
    .order('created_at', { ascending: true })
  if (error) throw Error('Failed to get private messages')
  return data
}

export async function sendMessage({
  senderId,
  channelId,
  text,
  mediaLink
}: SendMessage) {
  const { error } = await supabase.from('private_messages').insert({
    sender_id: senderId,
    private_channel_id: channelId,
    text,
    media_link: mediaLink
  })
  if (error) throw Error('Failed to send private message')
}

export function messagesListener({ channelId, callback }: MessagesListener) {
  return supabase
    .channel('public:private_messages')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'private_messages',
        filter: `private_channel_id=eq.${channelId}`
      },
      callback
    )
    .subscribe()
}
