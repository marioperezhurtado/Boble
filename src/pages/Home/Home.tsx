import ChatList from '../../components/ChatList/ChatList'

const dummyChatList = [
  { id: '1', name: 'Luke' },
  { id: '2', name: 'John' },
  { id: '3', name: 'Anna' },
  { id: '4', name: 'Paul' }
]

export default function Home() {
  return (
    <main className="flex flex-grow w-full max-w-screen-xl mx-auto shadow-md bg-zinc-50">
      <ChatList chatList={dummyChatList} />
      <div className="flex-grow bg-zinc-50">
        <h2>Chat</h2>
      </div>
    </main>
  )
}
