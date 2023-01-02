import Header from '../../layout/Header/Header'
import ChannelList from '../../components/ChannelList/ChannelList'
import Chat from '../../components/Chat/Chat'

interface Props {
  channelId: string
}

export default function ChatPage({ channelId }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-grow w-full max-w-screen-xl mx-auto shadow-md bg-zinc-50">
        <ChannelList channelId={channelId} />
        <Chat channelId={channelId} />
      </main>
    </>
  )
}
