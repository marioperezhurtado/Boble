import { supabase } from '../supabase'

interface Props {
  id: string
  avatar: File
}

export async function uploadAvatar({ id, avatar }: Props) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(id, avatar, { upsert: true })
  if (uploadError) throw Error('Failed to upload avatar')

  const { path } = uploadData

  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)

  const { publicUrl } = urlData

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', id)
  if (updateError) throw Error('Failed to update profile')
}
