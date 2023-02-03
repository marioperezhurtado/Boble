import { supabase } from '@/lib/supabase'

interface GetParticipants {
  groupId: string
}
interface AddParticipant {
  groupId: string
  userId: string
}
interface RemoveParticipant {
  groupId: string
  userId: string
}
interface ParticipantsListener {
  groupId: string
  callback: () => void
}

export async function getParticipants({ groupId }: GetParticipants) {
  const { data, error } = await supabase
    .from('group_participants')
    .select('*, user_id(*)')
    .eq('group_id', groupId)
    .order('joined_at', { ascending: true })
  if (error) throw Error('Failed to get participants')

  return data
}

export async function addParticipant({ groupId, userId }: AddParticipant) {
  const { error } = await supabase
    .from('group_participants')
    .insert({ group_id: groupId, user_id: userId })
  if (error) throw Error('Failed to add participant')
}

export async function removeParticipant({
  groupId,
  userId
}: RemoveParticipant) {
  const { error } = await supabase
    .from('group_participants')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', userId)
  if (error) throw Error('Failed to remove participant')
}

export function participantsListener({
  groupId,
  callback
}: ParticipantsListener) {
  return supabase
    .channel('public:group-participants')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'group_participants',
        filter: `group_id=eq.${groupId}`
      },
      callback
    )
    .subscribe()
}
