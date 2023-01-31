import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { createChat } from '@/services/chats'
import { useTranslation } from 'react-i18next'

import CopyIcon from '@/assets/CopyIcon'

export default function CreateChat() {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [isCopied, setIsCopied] = useState(false)
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

  const handleCopyIdToClipboard = async () => {
    if (!currentUser?.id) return

    await navigator.clipboard?.writeText(currentUser?.id)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

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
          <button
            onClick={handleCopyIdToClipboard}
            type="button"
            aria-label="Copy your invite code"
            title={t('create-chat.clipboard')}
            className="p-1.5 border rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 relative text-sm">
            <CopyIcon />
            {isCopied && (
              <span className="absolute -top-10 right-0 p-1.5 bg-white rounded-md dark:bg-zinc-700 border dark:border-zinc-600 w-max">
                {t('create-chat.clipboard-success')}
              </span>
            )}
          </button>
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
