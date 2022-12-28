interface ChatPreview {
  id: string
  name: string
}

interface Props {
  chatList: ChatPreview[]
}

export default function ChatList({ chatList }: Props) {
  return (
    <ul className="flex flex-col w-full max-w-md border-r bg-zinc-50 border-zinc-200">
      {chatList.map((c) => (
        <li key={c.id} className="flex items-center px-6 py-3 border-b">
          <div className="mr-4 overflow-hidden rounded-full w-14 h-14">
            <img src="https://picsum.photos/75" alt="Avatar" />
          </div>
          <p className="font-bold">{c.name}</p>
        </li>
      ))}
    </ul>
  )
}
