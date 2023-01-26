import { supabase } from '../lib/supabase'

interface UploadImage {
  channelId: string
  image: File
}

interface UploadAudio {
  channelId: string
  audio: File
}

const PRIVATE_IMAGE_EXPIRATION = 31536000 // 1 year in seconds

export async function uploadImage({ channelId, image }: UploadImage) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('private-media')
    .upload(url, image, { upsert: false })
  if (uploadError) throw Error('Failed to upload image')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('private-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create image url')

  const { signedUrl } = urlData

  return signedUrl
}

export async function uploadAudio({ channelId, audio }: UploadAudio) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('private-media')
    .upload(url, audio, { upsert: false })
  if (uploadError) throw Error('Failed to upload audio')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('private-media')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create audio url')

  const { signedUrl } = urlData

  return signedUrl
}
