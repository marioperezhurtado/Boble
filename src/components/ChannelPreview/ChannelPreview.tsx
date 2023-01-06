import { Link } from 'wouter'

import Avatar from '../../layout/Avatar/Avatar'

import type { User } from '../../types/chat'

interface Props {
  channelId: string
  user: User
}

export default function ChannelPreview({ channelId, user }: Props) {
  return (
    <Link
      to={`/chat/${channelId}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t">
      <Avatar
        size="medium"
        avatarUrl={user.avatar_url ?? null}
        name={user.full_name ?? user.email}
      />
      <p className="font-bold break-all">{user.full_name ?? user.email}</p>
    </Link>
  )
}
