import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { useDb } from '../../contexts/DbContext'

import ChatMessage from '../ChatMessage/ChatMessage'

import { Message } from '../../types/chat'

interface Props {
  userId: string
}

export default function Chat({ userId }: Props) {
  const { currentUser } = useAuth()
  const { getPrivateMessages } = useDb()

  const {
    data: messages,
    isLoading,
    error
  } = useQuery({
    queryKey: ['chat', userId],
    queryFn: async () =>
      await getPrivateMessages({
        senderId: currentUser?.id ?? '',
        receiverId: userId
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!userId && !!currentUser
  })

  const chatError = error as Error

  if (!userId) {
    return (
      <div className="flex-grow bg-zinc-50">
        <p>Select a contact to start a conversation</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-grow bg-zinc-50">
        <p>Loading...</p>
      </div>
    )
  }

  if (chatError) {
    return (
      <div className="flex-grow bg-zinc-50">
        <p>{chatError.message}</p>
      </div>
    )
  }

  if (!messages.length) {
    return (
      <div className="flex-grow bg-zinc-50">
        <p>No messages yet</p>
        <p>Start the conversation to see your messages here.</p>
      </div>
    )
  }

  return (
    <div className="flex-grow bg-zinc-50">
      <ul className="flex-col p-4">
        {messages.map((m: Message) => (
          <li key={m.id}>
            <ChatMessage message={m} />
          </li>
        ))}
      </ul>
    </div>
  )
}
