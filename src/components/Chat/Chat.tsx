import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMessages, messagesListener } from '../../hooks/useMessages'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '../../layout/LoadSpinner/LoadSpinner'
import ChatMessage from '../ChatMessage/ChatMessage'
import ChatInput from '../ChatInput/ChatInput'

interface Props {
  channelId: string
}

export default function Chat({ channelId }: Props) {
  const { t } = useTranslation('global')
  const chatRef = useRef<HTMLUListElement>(null)

  const {
    data: messages,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['chat', channelId],
    queryFn: async () => await getMessages({ channelId }),
    retry: false,
    enabled: !!channelId
  })

  const chatError = error as Error

  useEffect(() => {
    // Subscribe to realtime messages updates
    messagesListener({
      channelId,
      callback: refetch
    })
  }, [channelId])

  useEffect(() => {
    // Scroll to bottom of chat
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  })

  if (!channelId) {
    return (
      <div className="h-full px-4 bg-zinc-100 dark:bg-zinc-800 text-center">
        <p className="pt-12 text-lg font-semibold mb-5">
          {t('chat.select-channel.title')}
        </p>
        <p>{t('chat.select-channel.description')}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col md:pt-20 bg-zinc-100 dark:bg-zinc-800 h-full">
        <LoadSpinner />
        <ChatInput channelId={channelId} />
      </div>
    )
  }

  if (chatError?.message) {
    return (
      <div className="px-8 py-8 bg-zinc-100">
        <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 dark:bg-zinc-800">
          {t('messages.errors.get')}
        </p>
      </div>
    )
  }

  if (!messages?.length) {
    return (
      <div className="flex flex-col h-full border-red-500 bg-zinc-100 dark:bg-zinc-800">
        <div className="flex-grow px-4">
          <p className="pt-10 my-5 text-xl font-bold text-center">
            {t('chat.empty.title')}
          </p>
          <p className="text-center">{t('chat.empty.description')}</p>
        </div>
        <ChatInput channelId={channelId} />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col h-full bg-zinc-100 dark:bg-zinc-800">
      <ul
        ref={chatRef}
        className="z-10 flex-col flex-grow px-4 pb-20 overflow-y-auto scroll-smooth">
        {messages.map((m) => (
          <li key={m.id}>
            <ChatMessage message={m} />
          </li>
        ))}
      </ul>
      <ChatInput channelId={channelId} />
    </div>
  )
}
