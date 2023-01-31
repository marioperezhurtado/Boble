import { Link } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from 'react-i18next'

import Avatar from '@/layout/Avatar/Avatar'

import type { Chat } from '@/types/chat'

interface Props {
  chat: Chat
}

export default function ChatPreview({ chat }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const { id, user1, user2 } = chat

  if (user1.id === currentUser?.id && user2.id === currentUser?.id) {
    return (
      <Link
        to={`/chats/${id}`}
        className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-700">
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
      to={`/chats/${id}`}
      className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-700">
      <Avatar
        size="medium"
        avatarUrl={user.avatar_url ?? null}
        name={user.full_name ?? user.email}
      />
      <p className="font-bold break-all">{user.full_name ?? user.email}</p>
    </Link>
  )
}
