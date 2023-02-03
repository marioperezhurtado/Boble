import { supabase } from '@/lib/supabase'

interface UploadUserAvatar {
  id: string
  avatar: File
}

interface UploadGroupAvatar {
  groupId: string
  avatar: File
}

const GROUP_AVATAR_EXPIRATION = 31536000 // 1 year in seconds

export async function uploadUserAvatar({ id, avatar }: UploadUserAvatar) {
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

export async function uploadGroupAvatar({
  groupId,
  avatar
}: UploadGroupAvatar) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('group-avatars')
    .upload(groupId, avatar, { upsert: true })
  if (uploadError) throw Error('Failed to upload group avatar')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('group-avatars')
    .createSignedUrl(path, GROUP_AVATAR_EXPIRATION)
  if (urlError) throw Error('Failed to create group avatar url')

  const { signedUrl } = urlData

  const { error: updateError } = await supabase
    .from('groups')
    .update({ avatar_url: signedUrl })
    .eq('id', groupId)
  if (updateError) throw Error('Failed to update group')
}
