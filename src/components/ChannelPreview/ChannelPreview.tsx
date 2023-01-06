import { Link } from 'wouter'

import { User } from '../../types/chat'

interface Props {
  channelId: string
  user: User
}

export default function ChannelPreview({ channelId, user }: Props) {
  return (
    <Link
      to={`/chat/${channelId}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t">
      <div className="overflow-hidden rounded-full min-w-fit w-14 h-14">
        <img
          src={user.avatar_url ?? 'https://picsum.photos/75'}
          alt="Avatar"
          className="object-cover w-full h-full aspect-square"
        />
      </div>
      <p className="font-bold break-all">{user.full_name ?? user.email}</p>
    </Link>
  )
}
