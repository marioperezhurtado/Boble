import { supabase } from '../supabase'

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
