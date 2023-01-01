import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { useDb } from '../../contexts/DbContext'

import ChatMessage from '../ChatMessage/ChatMessage'
import ChatInput from '../ChatInput/ChatInput'

import { Message } from '../../types/chat'

interface Props {
  channelId: string
}

export default function Chat({ channelId }: Props) {
  const { currentUser } = useAuth()
  const { getPrivateMessages, privateMessagesListener } = useDb()

  const {
    data: messages,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['chat', channelId],
    queryFn: async () =>
      await getPrivateMessages({
        channelId
      }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!channelId && !!currentUser
  })

  const chatError = error as Error

  useEffect(() => {
    // Subscribe to realtime private channel updates
    const capsSubscription = privateMessagesListener({
      channelId,
      callback: refetch
    })
    return () => capsSubscription.unsubscribe()
  }, [channelId])

  if (!channelId) {
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
    <div className="flex flex-col flex-grow bg-zinc-100">
      <ul className="z-10 flex-col flex-grow p-4">
        {messages.map((m: Message) => (
          <li key={m.id}>
            <ChatMessage message={m} />
          </li>
        ))}
      </ul>
      <ChatInput channelId={channelId} />
    </div>
  )
}
