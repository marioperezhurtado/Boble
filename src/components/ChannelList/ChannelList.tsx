import { useAuth } from '../../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { useDb } from '../../contexts/DbContext'

import ChannelPreview from '../ChannelPreview/ChannelPreview'

import { Channel } from '../../types/chat'

interface Props {
  channelId: string
}

export default function ChannelList({ channelId }: Props) {
  const { currentUser } = useAuth()
  const { getChannels } = useDb()

  const {
    data: channels,
    isLoading,
    error
  } = useQuery({
    queryKey: ['channels', currentUser],
    queryFn: async () => await getChannels({ userId: currentUser?.id ?? '' }),
    retry: false
  })

  const channelsError = error as Error

  if (isLoading) {
    return (
      <ul className="flex flex-col w-full max-w-md border-r bg-zinc-50 border-zinc-200">
        Loading...
      </ul>
    )
  }

  if (channelsError) {
    return (
      <ul className="flex flex-col w-full max-w-md border-r bg-zinc-50 border-zinc-200">
        <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
          {channelsError.message}
        </p>
      </ul>
    )
  }

  if (!channels.length) {
    return (
      <ul className="flex flex-col w-full max-w-md border-r bg-zinc-50 border-zinc-200">
        You have not created any channel yet. Create one and start chatting with
        your friends.
      </ul>
    )
  }

  return (
    <ul className="flex flex-col w-full max-w-md border-r bg-zinc-50 border-zinc-200">
      {channels.map((c: Channel) => (
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
