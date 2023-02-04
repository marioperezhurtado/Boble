import { supabase } from '@/lib/supabase'

import type { User } from '@/types/chat'

interface ProfileListener {
  userId: string
  callback: () => void
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .limit(1)
    .single()
  if (error) throw Error('Failed to get profile')
  return data
}

export async function updateProfile(user: User) {
  const { data, error } = await supabase
    .from('profiles')
    .update(user)
    .eq('id', user.id)
  if (error) throw Error('Failed to update profile')
  return data
}

export function profileListener({ userId, callback }: ProfileListener) {
  return supabase
    .channel('public:profiles')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}
