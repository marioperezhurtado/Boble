import { useAuth } from '../../contexts/AuthContext'
import useTimestamp from '../../hooks/useTimestamp'

import { Message } from '../../types/chat'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const { currentUser } = useAuth()

  const dateTime = useTimestamp(message.created_at)

  if (message.sender_id === currentUser?.id) {
    return (
      <div className="max-w-lg pl-3 pr-2 py-1 mt-4 ml-auto rounded-md rounded-br-none shadow-md w-fit bg-cyan-700 text-cyan-50 flex gap-x-2 flex-wrap">
        <p className="my-1.5 break-all">{message.text}</p>
        <p className="text-right text-xs pt-1 self-end flex-grow">{dateTime}</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg pl-3 pr-2 py-1 mt-4 bg-white rounded-md rounded-bl-none shadow-md w-fit flex gap-2">
      <p className="my-1.5 break-all">{message.text}</p>
      <p className="text-right text-xs self-end min-w-fit">{dateTime}</p>
    </div>
  )
}
