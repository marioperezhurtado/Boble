import { supabase } from '../supabase'

interface Props {
  channelId: string
  image: File
}

const PRIVATE_IMAGE_EXPIRATION = 31536000 // 1 year in seconds

export async function uploadImage({ channelId, image }: Props) {
  const url = `${channelId}/${Date.now().toString()}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('private-images')
    .upload(url, image, { upsert: false })
  if (uploadError) throw Error('Failed to upload image')

  const { path } = uploadData

  const { data: urlData, error: urlError } = await supabase.storage
    .from('private-images')
    .createSignedUrl(path, PRIVATE_IMAGE_EXPIRATION)
  if (urlError) throw Error('Failed to create image url')

  const { signedUrl } = urlData

  return signedUrl
}
