import { supabase } from '../supabase'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('global')

  const { data, error } = await supabase
    .from('private_messages')
    .select('*')
    .eq('private_channel_id', channelId)
    .order('created_at', { ascending: true })
  if (error) throw Error(t('messages.errors.get') ?? 'Failed to get messages')
  return data
}

export async function sendMessage({
  senderId,
  channelId,
  text,
  mediaLink
}: SendMessage) {
  const { t } = useTranslation('global')
  const { error } = await supabase.from('private_messages').insert({
    sender_id: senderId,
    private_channel_id: channelId,
    text,
    media_link: mediaLink
  })
  if (error) throw Error(t('messages.errors.send') ?? 'Failed to send message')
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
