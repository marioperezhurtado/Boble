import { supabase } from '../lib/supabase'

import type { Group } from '../types/chat'

interface GetGroups {
  userId: string
}
interface CreateGroup {
  creatorId: string
  name: string
}
interface GroupsListener {
  userId: string
  callback: () => void
}

export async function getGroups({ userId }: GetGroups) {
  const { data, error } = await supabase
    .from('group_participants')
    .select('group_id(*)')
    .eq('user_id', userId)
    .order('joined_at', { ascending: false })
  if (error) throw Error('Failed to get groups')

  const groups = data.map((group) => group.group_id)

  return groups as Group[]
}

export async function createGroup({ creatorId, name }: CreateGroup) {
  const { error } = await supabase
    .from('group_channels')
    .insert({ creator_id: creatorId, name })
  if (error) {
    throw Error('Failed to create group')
  }
}

export function groupsListener({ userId, callback }: GroupsListener) {
  return supabase
    .channel('public:group_channels')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'group_channels',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}
