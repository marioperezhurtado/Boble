import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getChatMessages,
  chatMessagesListener,
  getGroupMessages,
  groupMessagesListener
} from '@/services/messages'
import useResizeObserver from 'use-resize-observer'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import ChatMessage from '@/components/Chats/ChatMessage/ChatMessage'
import GroupMessage from '@/components/Groups/GroupMessage/GroupMessage'
import ChannelInput from '@/components/Channels/ChannelInput/ChannelInput'

interface Props {
  channelId: string
  type: 'chat' | 'group'
}

export default function Chat({ channelId, type }: Props) {
  const { t } = useTranslation('global')
  const chatRef = useRef<HTMLUListElement>(null)

  const getMessages = type === 'chat' ? getChatMessages : getGroupMessages
  const messagesListener =
    type === 'chat' ? chatMessagesListener : groupMessagesListener

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

  const { ref: heightRef, height: chatHeight } = useResizeObserver()

  useEffect(() => {
    // Scroll to bottom of chat
    if (!chatHeight) return
    chatRef.current?.scrollTo(0, chatHeight)
  }, [chatHeight])

  if (!channelId) {
    return (
      <div className="h-full px-4 text-center bg-zinc-100 dark:bg-zinc-800">
        <p className="pt-12 mb-5 text-lg font-semibold">
          {t('chat.select-channel.title')}
        </p>
        <p>{t('chat.select-channel.description')}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen pt-10 md:pt-20 bg-zinc-100 dark:bg-zinc-800">
        <LoadSpinner />
        <ChannelInput channelId={channelId} type={type} />
      </div>
    )
  }

  if (chatError?.message) {
    return (
      <div className="h-screen px-8 py-8 bg-zinc-100 dark:bg-zinc-800">
        <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 dark:bg-red-200 text-zinc-700">
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
        <ChannelInput channelId={channelId} type={type} />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col h-full bg-zinc-100 dark:bg-zinc-800">
      <ul
        ref={chatRef}
        className="z-10 flex-col flex-grow px-2 pb-20 overflow-y-auto sm:px-4 scroll-smooth">
        <div ref={heightRef}>
          {messages.map((m, i) => (
            <li key={m.id}>
              {type === 'chat' && <ChatMessage message={m} />}
              {type === 'group' && (
                <GroupMessage message={m} prevMessage={messages[i - 1]} />
              )}
            </li>
          ))}
        </div>
      </ul>
      <ChannelInput channelId={channelId} type={type} />
    </div>
  )
}
