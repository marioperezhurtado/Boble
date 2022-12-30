import Header from '../../layout/Header/Header'
import ChatList from '../../components/ChatList/ChatList'

interface Props {
  userId: string | null
}

const dummyChatList = [
  { id: '1', name: 'Luke' },
  { id: '2', name: 'John' },
  { id: '3', name: 'Anna' },
  { id: '4', name: 'Paul' }
]

export default function Chat({ userId }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-grow w-full max-w-screen-xl mx-auto shadow-md bg-zinc-50">
        <ChatList chatList={dummyChatList} />
        <div className="flex-grow bg-zinc-50">
          <div className="flex-col p-4">
            <div className="max-w-lg p-2 mt-5 bg-white border rounded-md rounded-bl-none shadow-md w-fit">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="max-w-lg p-2 mt-5 ml-auto border rounded-md rounded-br-none shadow-md w-fit bg-cyan-700 text-cyan-50">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Aut
                voluptates vel nobis, sunt tempore esse ab quibusdam et nulla
                cupiditate deserunt dolore harum placeat, aliquid rem
                necessitatibus neque atque! Laborum.
              </p>
            </div>
            <div className="max-w-lg p-2 mt-5 bg-white border rounded-md rounded-bl-none shadow-md w-fit">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                magnam quibusdam eum reiciendis ducimus.
              </p>
            </div>
            <div className="max-w-lg p-2 mt-5 ml-auto border rounded-md rounded-br-none shadow-md w-fit bg-cyan-700 text-cyan-50">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
