import { useEffect, useState } from 'react'

import Header from '../../layout/Header/Header'
import ChannelList from '../../components/ChannelList/ChannelList'
import Chat from '../../components/Chat/Chat'

interface Props {
  channelId: string
}

export default function ChatPage({ channelId }: Props) {
  const [channelsHidden, setChannelsHidden] = useState(true)

  useEffect(() => {
    if (!channelId) {
      setChannelsHidden(false)
      return
    }
    setChannelsHidden(true)
  }, [channelId])

  return (
    <>
      <Header />
      <main className="flex flex-grow w-full max-w-screen-xl mx-auto shadow-md bg-zinc-50">
        <div
          className={`${
            channelsHidden ? 'hidden' : ''
          } w-full lg:block lg:max-w-md`}>
          <ChannelList channelId={channelId} />
        </div>
        <div
          className={`${
            channelsHidden ? '' : 'hidden'
          } flex-grow lg:block  bg-zinc-100 relative`}>
          <Chat channelId={channelId} />
        </div>
      </main>
    </>
  )
}
