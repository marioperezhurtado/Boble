import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getChats, chatsListener } from '@/services/chats'
import { capitalize } from '@/utils/text'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import ChatPreview from '@/components/Chats/ChatPreview/ChatPreview'

interface Props {
  chatId: string
}

export default function ChatList({ chatId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [search, setSearch] = useState('')

  const {
    data: chats,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['chats', currentUser],
    queryFn: async () => await getChats({ userId: currentUser?.id ?? '' })
  })

  const chatsError = error as Error

  useEffect(() => {
    if (!currentUser?.id) return
    // Subscribe to realtime chats updates
    chatsListener({
      userId: currentUser.id,
      callback: refetch
    })
  }, [currentUser])

  const matchingChats = chats?.filter(
    (c) =>
      c.user1?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.user2?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.user1?.email.toLowerCase().includes(search.toLowerCase()) ||
      c.user2?.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(capitalize(e.target.value))
  }

  if (isLoading) {
    return (
      <ul className="flex flex-col w-full my-10 border-r bg-zinc-50 border-zinc-200 dark:bg-zinc-800">
        <LoadSpinner />
      </ul>
    )
  }

  if (chatsError) {
    return (
      <ul className="flex flex-col p-4 bg-zinc-50 dark:bg-zinc-800">
        <p className="p-1.5 pl-3 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
          {t('chats.errors.get')}
        </p>
      </ul>
    )
  }

  if (!chats?.length) {
    return (
      <ul className="flex flex-col px-4 py-8 text-center sm:px-8 bg-zinc-50 dark:bg-zinc-800">
        <h2 className="mb-5 text-xl font-bold">{t('chats.empty.title')}</h2>
        <p>{t('chats.empty.description')}</p>
      </ul>
    )
  }

  return (
    <>
      <input
        value={search}
        onChange={handleChange}
        type="text"
        placeholder={t('chats.search.placeholder')}
        className="border rounded-md px-2 py-1 max-w-full mx-4 mt-2.5 mb-2 dark:bg-zinc-700 dark:border-zinc-600"
        autoComplete="off"
      />
      <ul className="flex flex-col overflow-y-auto bg-zinc-50 dark:bg-zinc-800">
        {matchingChats?.map((c) => (
          <li
            key={c.id}
            className={`flex items-center ${
              c.id === chatId ? 'bg-zinc-100 dark:bg-zinc-700' : ''
            }`}>
            <ChatPreview chat={c} />
          </li>
        ))}
        {!matchingChats?.length && (
          <p className="py-5 text-center border-t">
            {t('chats.search.no-results')}
            <span className="font-bold break-all"> {`"${search}"`}</span>
          </p>
        )}
      </ul>
    </>
  )
}
