import { supabase } from '../supabase'

interface GetPrivateMessages {
  channelId: string
}
interface SendMessage {
  senderId: string
  channelId: string
  text: string
}
interface PrivateMessagesListener {
  channelId: string
  callback: () => void
}

export async function getPrivateMessages({ channelId }: GetPrivateMessages) {
  const { data, error } = await supabase
    .from('private_messages')
    .select('*')
    .eq('private_channel_id', channelId)
    .order('created_at', { ascending: true })
  if (error) throw Error('Failed to get private messages')
  return data
}

export async function sendPrivateMessage({
  senderId,
  channelId,
  text
}: SendMessage) {
  const { error } = await supabase
    .from('private_messages')
    .insert({ sender_id: senderId, private_channel_id: channelId, text })
  if (error) throw Error('Failed to send private message')
}

export function privateMessagesListener({
  channelId,
  callback
}: PrivateMessagesListener) {
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
