import { useEffect, useState } from 'react'
import { Link } from 'wouter'

import Header from '../../layout/Header/Header'
import ChannelList from '../../components/ChannelList/ChannelList'
import CreateChannel from '../../components/CreateChannel/CreateChannel'
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
    <div className="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main className="flex flex-grow w-full h-full max-w-screen-xl pt-12 mx-auto shadow-md bg-zinc-50 ">
        <div
          className={`w-full lg:max-w-md border flex-col gap-8 lg:flex
          ${channelsHidden ? 'hidden' : 'flex'}
          `}>
          <ChannelList channelId={channelId} />
          <CreateChannel />
        </div>
        <div
          className={`relative flex-grow bg-zinc-100 lg:block 
          ${channelsHidden ? '' : 'hidden'}
          `}>
          <Chat channelId={channelId} />
        </div>
        {channelsHidden && (
          <div className="fixed z-10 cursor-pointer top-16 left-2 md:left-4">
            <Link to="/chat">
              <img
                src="/left.svg"
                alt="Back to channel list"
                className="w-8 h-8 lg:hidden"
              />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
