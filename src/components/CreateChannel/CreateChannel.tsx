import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { createChannel } from '../../hooks/useChannels'

export default function CreateChannel() {
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
    <div className="flex flex-col gap-2 sm:gap-4 py-8 border-t">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        name="createChannel"
        className="flex flex-wrap justify-center gap-2 mx-4">
        <input
          onChange={handleChange}
          type="text"
          name="friendId"
          placeholder="Enter a friend's code..."
          className="px-2 py-1 border rounded-md"
        />
        <button
          onClick={handleCopyIdToClipboard}
          type="button"
          className="p-1.5 border rounded-md">
          <img src="/link.svg" alt="Your invite code" className="w-5 h-5" />
        </button>
        <button
          disabled={isLoading}
          className="px-2 py-1 rounded-md sm:text-sm bg-cyan-700 text-cyan-50">
          Create channel
        </button>
      </form>
      {createError && (
        <p className="p-1.5 px-3 mx-auto w-fit bg-red-100 border-l-4 border-red-600">
          {createError.message}
        </p>
      )}
    </div>
  )
}
