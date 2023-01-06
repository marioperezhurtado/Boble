import { useAuth } from '../../contexts/AuthContext'
import useTimestamp from '../../hooks/useTimestamp'

import { Message } from '../../types/chat'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const { currentUser } = useAuth()

  const dateTime = useTimestamp(message.created_at)

  return (
    <div
      className={`max-w-lg pl-3 pr-2 py-1 mt-4 rounded-md rounded-br-none shadow-md w-fit flex gap-2 ${
        currentUser?.id === message.sender_id
          ? 'bg-cyan-700 text-cyan-50 ml-auto'
          : 'bg-white mr-auto'
      } `}>
      <p className="my-1.5 break-all">{message.text}</p>
      <p className="text-right text-xs pt-1 self-end flex-grow">{dateTime}</p>
    </div>
  )
}
