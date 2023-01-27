import { useEffect, useState } from 'react'

import Header from '../../layout/Header/Header'
import ChannelList from '../../components/ChannelList/ChannelList'
import CreateChannel from '../../components/CreateChannel/CreateChannel'
import Chat from '../../components/Chat/Chat'

import ToggleDarkMode from '../../layout/ToggleDarkMode/ToggleDarkMode'
import ChangeFontSize from '../../layout/ChangeFontSize/ChangeFontSize'
import ChangeLanguage from '../../layout/ChangeLanguage/ChangeLanguage'

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
    <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
      <Header />
      <main className="flex flex-grow w-full h-full max-w-screen-xl pt-12 mx-auto shadow-md bg-zinc-50">
        <div
          className={`w-full lg:max-w-md border dark:border-zinc-600 flex-col lg:flex dark:bg-zinc-800
          ${channelsHidden ? 'hidden' : 'flex'}
          `}>
          <ChannelList channelId={channelId} />
          <div className="flex-grow border-t dark:border-zinc-600">
            <div className="flex flex-col justify-between h-full gap-4 px-4 py-4 mx-auto w-fit">
              <CreateChannel />
              <div className="flex gap-2 mx-auto w-fit lg:ml-0">
                <ToggleDarkMode />
                <ChangeLanguage />
                <ChangeFontSize />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`relative flex-grow lg:block border-r dark:border-zinc-600
          ${channelsHidden ? '' : 'hidden'}
          `}>
          <Chat channelId={channelId} />
        </div>
      </main>
    </div>
  )
}
