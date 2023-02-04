import { supabase } from '@/lib/supabase'

import type { Group } from '@/types/chat'

interface GetGroups {
  userId: string
}
interface CreateGroup {
  creatorId: string
  name: string
}
interface DeleteGroup {
  groupId: string
}
interface UpdateGroup {
  groupId: string
  name: string
}
interface GroupsListener {
  userId: string
  callback: () => void
}
interface GroupListener {
  groupId: string
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

export async function getGroup({ groupId }: { groupId: string }) {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single()
  if (error) throw Error('Failed to get group')

  return data
}

export async function createGroup({ creatorId, name }: CreateGroup) {
  const { error: createError, data } = await supabase
    .from('groups')
    .insert({ creator_id: creatorId, name })
    .select('id')
  if (createError) {
    throw Error('Failed to create group')
  }
  const groupId = data[0].id

  const { error: joinError } = await supabase
    .from('group_participants')
    .insert({ group_id: groupId, user_id: creatorId })
  if (joinError) {
    throw Error('Failed to join to group')
  }
}

export async function deleteGroup({ groupId }: DeleteGroup) {
  const { error } = await supabase.from('groups').delete().eq('id', groupId)
  if (error) throw Error('Failed to delete group')
}

export async function updateGroup({ groupId, name }: UpdateGroup) {
  const { error } = await supabase
    .from('groups')
    .update({ name })
    .eq('id', groupId)

  if (error) throw Error('Failed to update group')
}

export function groupsListener({ userId, callback }: GroupsListener) {
  return supabase
    .channel('public:group_participants')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'group_participants',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

export function groupListener({ groupId, callback }: GroupListener) {
  return supabase
    .channel('public:groups')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'groups',
        filter: `id=eq.${groupId}`
      },
      callback
    )
    .subscribe()
}
