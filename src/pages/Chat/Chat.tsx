import Header from '../../layout/Header/Header'
import ChatList from '../../components/ChatList/ChatList'
import Chat from '../../components/Chat/Chat'

interface Props {
  channelId: string
}

const dummyChatList = [
  { id: '1', name: 'Luke' },
  { id: '2', name: 'John' },
  { id: '3', name: 'Anna' },
  { id: '4', name: 'Paul' }
]

export default function ChatPage({ channelId }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-grow w-full max-w-screen-xl mx-auto shadow-md bg-zinc-50">
        <ChatList chatList={dummyChatList} />
        <Chat channelId={channelId} />
      </main>
    </>
  )
}
