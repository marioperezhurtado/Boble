import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { createChat } from '@/services/chats'
import { useTranslation } from 'react-i18next'

import CopyInviteCode from '@/layout/CopyInviteCode/CopyInviteCode'

export default function CreateChat() {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [friendId, setFriendId] = useState<string>('')

  const {
    mutate: handleCreateChat,
    isLoading,
    error
  } = useMutation(
    async (friendId: string) =>
      await createChat({ userId: currentUser?.id ?? '', friendId })
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!friendId) return

    handleCreateChat(friendId)
    setFriendId('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFriendId(e.target.value)

  const createError = error as Error

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-4">
        <form
          onSubmit={handleSubmit}
          name="createChannel"
          className="flex flex-wrap justify-center gap-2">
          <input
            value={friendId}
            onChange={handleChange}
            type="text"
            name="friendId"
            id="friendId"
            placeholder={t('create-chat.friend-code')}
            className="px-2 py-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder:text-zinc-300"
            autoComplete="off"
          />
          <CopyInviteCode id={currentUser?.id} />
          <button
            disabled={isLoading}
            className="px-2 py-1 transition rounded-md sm:text-sm bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
            {t('create-chat.submit')}
          </button>
        </form>
        {createError && (
          <p className="p-1.5 px-3 mx-auto w-fit bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
            {t('chats.errors.create')}
          </p>
        )}
      </div>
    </>
  )
}
