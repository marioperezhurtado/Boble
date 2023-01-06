import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { getChannels, channelsListener } from '../../hooks/useChannels'

import LoadSpinner from '../../layout/LoadSpinner/LoadSpinner'
import ChannelPreview from '../ChannelPreview/ChannelPreview'

interface Props {
  channelId: string
}

export default function ChannelList({ channelId }: Props) {
  const { currentUser } = useAuth()

  const {
    data: channels,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['channels', currentUser],
    queryFn: async () => await getChannels({ userId: currentUser?.id ?? '' })
  })

  const channelsError = error as Error

  useEffect(() => {
    if (!currentUser?.id) return
    // Subscribe to realtime channel updates
    channelsListener({
      userId: currentUser.id,
      callback: refetch
    })
  }, [currentUser])

  if (isLoading) {
    return (
      <ul className="flex flex-col w-full my-10 border-r bg-zinc-50 border-zinc-200">
        <LoadSpinner />
      </ul>
    )
  }

  if (channelsError) {
    return (
      <ul className="flex flex-col p-4 bg-zinc-50 ">
        <p className="p-1.5 pl-3 bg-red-100 border-l-4 border-red-600">
          {channelsError.message}
        </p>
      </ul>
    )
  }

  if (!channels?.length) {
    return (
      <ul className="flex flex-col p-8 text-center bg-zinc-50 ">
        <p className="mb-5 text-xl font-bold">
          You have not created any channel yet.
        </p>
        <p>Create one and start chatting with your friends.</p>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col overflow-y-auto bg-zinc-50">
      {channels.map((c) => (
        <li
          key={c.id}
          className={`flex items-center ${
            c.id === channelId ? 'bg-zinc-100' : ''
          }`}>
          {c.user1.id !== currentUser?.id && (
            <ChannelPreview channelId={c.id} user={c.user1} />
          )}
          {c.user2.id !== currentUser?.id && (
            <ChannelPreview channelId={c.id} user={c.user2} />
          )}
        </li>
      ))}
    </ul>
  )
}
