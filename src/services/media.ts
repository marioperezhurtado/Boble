import { supabase } from '@/lib/supabase'

interface UploadImage {
  channelId: string
  image: File
}
interface UploadAudio {
  channelId: string
  audio: File
}

const PRIVATE_IMAGE_EXPIRATION = 31536000 // 1 year in seconds

export async function uploadChatImage({ channelId, image }: UploadImage) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('chat-media')
    .upload(url, image, { upsert: false })
  if (uploadError) throw Error('Failed to upload chat image')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('chat-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create chat image url')

  const { signedUrl } = urlData

  return signedUrl
}

export async function uploadGroupImage({ channelId, image }: UploadImage) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('group-media')
    .upload(url, image, { upsert: false })
  if (uploadError) throw Error('Failed to upload group image')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('group-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create group image url')

  const { signedUrl } = urlData

  return signedUrl
}

export async function uploadChatAudio({ channelId, audio }: UploadAudio) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('chat-media')
    .upload(url, audio, { upsert: false })
  if (uploadError) throw Error('Failed to upload chat audio')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('chat-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create chat audio url')

  const { signedUrl } = urlData

  return signedUrl
}

export async function uploadGroupAudio({ channelId, audio }: UploadAudio) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('group-media')
    .upload(url, audio, { upsert: false })
  if (uploadError) throw Error('Failed to upload group audio')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('group-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create group audio url')

  const { signedUrl } = urlData

  return signedUrl
}
