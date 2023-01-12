import { supabase } from '../supabase'
import { useTranslation } from 'react-i18next'

interface GetChannels {
  userId: string
}
interface CreateChannel {
  userId: string
  friendId: string
}
interface ChannelsListener {
  userId: string
  callback: () => void
}

export async function getChannels({ userId }: GetChannels) {
  const { t } = useTranslation('global')

  const { data, error } = await supabase
    .from('private_channels')
    .select('*, user1(*), user2(*)')
    .or(`user1.eq.${userId},user2.eq.${userId}`)
    .order('created_at', { ascending: false })
  if (error) throw Error(t('channels.errors.get') ?? 'Failed to get channels')
  return data
}

export async function createChannel({ userId, friendId }: CreateChannel) {
  const { t } = useTranslation('global')

  const { error } = await supabase
    .from('private_channels')
    .insert({ user1: userId, user2: friendId })
  if (error) {
    throw Error(t('channels.errors.create') ?? 'Failed to create channel')
  }
}

export function channelsListener({ userId, callback }: ChannelsListener) {
  return supabase
    .channel('public:private_channels')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'private_channels',
        filter: `user1=eq.${userId}`
      },
      callback
    )
    .subscribe()
}
