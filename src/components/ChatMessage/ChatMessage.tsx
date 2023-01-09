import { useAuth } from '../../contexts/AuthContext'
import useTimestamp from '../../hooks/useTimestamp'

import { Message } from '../../types/chat'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const { currentUser } = useAuth()

  const dateTime = useTimestamp(message.created_at)

  if (message.media_link) {
    return (
      <div
        className={`max-w-sm p-2 pb-1 mt-4 rounded-md shadow-md w-fit flex flex-col gap-1 ${
          currentUser?.id === message.sender_id
            ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
            : 'bg-white mr-auto rounded-bl-none dark:bg-zinc-600'
        } `}>
        {message.media_link && (
          <img src={message.media_link} alt="media" className="rounded-md" />
        )}
        <p className="self-end flex-grow text-xs text-right">{dateTime}</p>
      </div>
    )
  }

  return (
    <div
      className={`max-w-lg pl-3 pr-2 py-1 mt-4 rounded-md rounded-br-none shadow-md w-fit flex gap-2 ${
        currentUser?.id === message.sender_id
          ? 'bg-cyan-700 text-cyan-50 ml-auto'
          : 'bg-white mr-auto dark:bg-zinc-600'
      } `}>
      <p className="my-1.5 break-all">{message.text}</p>
      <p className="self-end flex-grow pt-1 text-xs text-right">{dateTime}</p>
    </div>
  )
}
