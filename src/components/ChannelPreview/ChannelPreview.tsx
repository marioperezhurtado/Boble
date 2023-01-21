import { Link } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

import Avatar from '../../layout/Avatar/Avatar'

import type { Channel } from '../../types/chat'

interface Props {
  channel: Channel
}

export default function ChannelPreview({ channel }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const { id, user1, user2 } = channel

  if (user1.id === currentUser?.id && user2.id === currentUser?.id) {
    return (
      <Link
        to={`/chat/${channel.id}`}
        className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-600">
        <Avatar
          size="medium"
          avatarUrl={user1.avatar_url ?? null}
          name={user1.full_name ?? user1.email}
        />
        <p className="font-bold break-all">{t('channel-preview.own')}</p>
      </Link>
    )
  }

  const user = user1.id === currentUser?.id ? user2 : user1

  return (
    <Link
      to={`/chat/${id}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-600">
      <Avatar
        size="medium"
        avatarUrl={user.avatar_url ?? null}
        name={user.full_name ?? user.email}
      />
      <p className="font-bold break-all">{user.full_name ?? user.email}</p>
    </Link>
  )
}
