import { Link } from 'wouter'

import Avatar from '@/layout/Avatar/Avatar'

import type { Group } from '@/types/chat'

interface Props {
  group: Group
}

export default function ChannelPreview({ group }: Props) {
  const { id, name, image_url: imageUrl } = group

  return (
    <Link
      to={`/groups/${id}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-600">
      <Avatar size="medium" avatarUrl={imageUrl} name={`${name} group chat`} />
      <p className="font-bold break-all">{name}</p>
    </Link>
  )
}
