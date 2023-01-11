import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { createChannel } from '../../hooks/useChannels'
import { useTranslation } from 'react-i18next'

import LinkIcon from '../../assets/LinkIcon'

export default function CreateChannel() {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [friendId, setFriendId] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const {
    mutate: handleCreateChannel,
    isLoading,
    error
  } = useMutation(
    async (friendId: string) =>
      await createChannel({ userId: currentUser?.id ?? '', friendId })
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFriendId(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!friendId) return

    handleCreateChannel(friendId)
    formRef.current?.reset()
  }

  const createError = error as Error

  const handleCopyIdToClipboard = async () => {
    await navigator.clipboard.writeText(currentUser?.id ?? '')
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        name="createChannel"
        className="flex flex-wrap justify-center gap-2">
        <input
          onChange={handleChange}
          type="text"
          name="friendId"
          placeholder={t('create-channel.friend-code') ?? ''}
          className="px-2 py-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder:text-zinc-300"
        />
        <button
          onClick={handleCopyIdToClipboard}
          type="button"
          aria-label="Copy your invite code"
          className="p-1.5 border rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600">
          <LinkIcon />
        </button>
        <button
          disabled={isLoading}
          className="px-2 py-1 transition rounded-md sm:text-sm bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
          {t('create-channel.submit') ?? ''}
        </button>
      </form>
      {createError && (
        <p className="p-1.5 px-5 mx-auto w-fit bg-red-100 border-l-4 border-red-600">
          {createError.message}
        </p>
      )}
    </div>
  )
}
