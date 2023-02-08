import { useState, useRef } from 'react'
import { Link } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { deleteChat } from '@/services/chats'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

import Avatar from '@/layout/Avatar/Avatar'
import Modal from '@/layout/Modal/Modal'
import ActionsIcon from '@/assets/ActionsIcon'

import type { Chat } from '@/types/chat'

export default function ChatPreview({ chat }: { chat: Chat }) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const { id, user1, user2 } = chat
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const handleOpenActions = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsActionsOpen(true)
  }
  const handleCloseActions = () => {
    setIsActionsOpen(false)
  }
  const handleStartDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDeleting(true)
  }
  const handleCancel = () => {
    setIsDeleting(false)
  }
  const handleDelete = async () => {
    await deleteChat({ chatId: id })
    setIsDeleting(false)
  }

  const isOwnChat = user1.id === currentUser?.id && user2.id === currentUser?.id
  const user = user1.id === currentUser?.id ? user2 : user1
  const name = user.full_name ?? user.email

  useOnClickOutside({
    ref,
    handler: handleCloseActions
  })

  return (
    <>
      <Link
        to={`/chats/${id}`}
        className="flex items-center w-full gap-4 px-6 py-3 border-t dark:border-zinc-700">
        <Avatar
          size="medium"
          avatarUrl={user.avatar_url ?? null}
          name={name}
          id={user.id}
        />
        <p className="font-bold break-all">
          {isOwnChat && t('channel-preview.own')}
          {!isOwnChat && name}
        </p>
        <div className="relative flex items-center ml-auto w-fit">
          {isActionsOpen && (
            <button
              ref={ref}
              onClick={handleStartDelete}
              className="absolute top-0 right-0 bg-red-100 text-red-700 text text-sm rounded-md px-2 py-1.5 hover:bg-red-200 transition">
              {t('chat-actions.delete.button')}
            </button>
          )}
          <button
            onClick={handleOpenActions}
            className="transition rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600">
            <ActionsIcon />
          </button>
        </div>
      </Link>
      {isDeleting && (
        <Modal onClose={handleCancel}>
          <h1 className="text-2xl font-semibold text-center">
            {t('chat-actions.delete.title')}
          </h1>
          <h2 className="mt-5 text-center">
            {t('chat-actions.delete.info')}
            <strong> {t('chat-actions.delete.info2')} </strong>
            {t('chat-actions.delete.info3')}
          </h2>
          <div className="flex flex-col items-center justify-center mt-5 pointer-events-none">
            <Avatar
              avatarUrl={user.avatar_url}
              name={name}
              size="large"
              id={id}
            />
            <p className="font-bold break-all">
              {isOwnChat && t('channel-preview.own')}
              {!isOwnChat && name}
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={handleDelete}
              className="bg-red-7 bg-red-200 text-red-800 shadow-md rounded-md px-2 py-1.5 text-sm hover:bg-red-300 transition">
              {t('chat-actions.delete.delete')}
            </button>
            <button
              onClick={handleCancel}
              className="bg-cyan-700 text-cyan-50 rounded-md px-2 py-1.5 text-sm shadow-md hover:bg-cyan-600 transition">
              {t('chat-actions.delete.cancel')}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
