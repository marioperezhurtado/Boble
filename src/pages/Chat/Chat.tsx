import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import ChatList from '@/components/Chats/ChatList/ChatList'
import GroupList from '@/components/Groups/GroupList/GroupList'
import CreateChat from '@/components/Chats/CreateChat/CreateChat'
import CreateGroup from '@/components/Groups/CreateGroup/CreateGroup'

import Channel from '@/components/Channels/Channel/Channel'
import GroupInfo from '@/components/Groups/GroupInfo/GroupInfo'
import Back from '@/layout/Back/Back'

import ToggleDarkMode from '@/layout/ToggleDarkMode/ToggleDarkMode'
import ChangeFontSize from '@/layout/ChangeFontSize/ChangeFontSize'
import ChangeLanguage from '@/layout/ChangeLanguage/ChangeLanguage'

interface Props {
  channelId: string
  type: 'chat' | 'group'
  info?: boolean
}

export default function ChatPage({ channelId, type, info }: Props) {
  const { t } = useTranslation('global')
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
          className={`w-full lg:max-w-md lg:border dark:border-zinc-700 flex-col lg:flex dark:bg-zinc-800
          ${channelsHidden ? 'hidden' : 'flex'}
          `}>
          {type === 'chat' && <ChatList chatId={channelId} />}
          {type === 'group' && <GroupList groupId={channelId} />}
          <div className="flex-grow border-t dark:border-zinc-700">
            <div className="flex flex-col justify-between h-full gap-4 px-4 py-4">
              <div className="mx-auto w-fit">
                {type === 'chat' && <CreateChat />}
                {type === 'group' && <CreateGroup />}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 w-fit">
                  <ToggleDarkMode />
                  <ChangeLanguage />
                  <ChangeFontSize />
                </div>
                <div className="flex gap-2 pt-3 pb-2 text-sm w-fit">
                  <Link to="/chats">
                    <button
                      className={`border px-2 py-1.5 rounded-md shadow-md ${
                        type === 'chat'
                          ? 'bg-cyan-700 border-cyan-700 text-cyan-50 hover:bg-cyan-600 transition hover:border-cyan-600'
                          : 'dark:bg-zinc-700 dark:border-zinc-600 bg-white hover:bg-zinc-100 transition'
                      }`}>
                      {t('channels.chats')}
                    </button>
                  </Link>
                  <Link to="/groups">
                    <button
                      className={`border px-2 py-1.5 rounded-md shadow-md ${
                        type === 'group'
                          ? 'bg-cyan-700 border-cyan-700 text-cyan-50 hover:bg-cyan-600 transition hover:border-cyan-600'
                          : 'dark:bg-zinc-700 dark:border-zinc-600 bg-white hover:bg-zinc-100 transition'
                      }`}>
                      {t('channels.groups')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {channelsHidden && <Back to={`/${type}s`} />}
        <div
          className={`relative flex-grow lg:block border-r dark:border-zinc-700
          ${channelsHidden ? '' : 'hidden'}
          `}>
          {info && <GroupInfo groupId={channelId} />}
          {!info && <Channel channelId={channelId} type={type} />}
        </div>
      </main>
    </div>
  )
}
