import { useAuth } from '../../contexts/AuthContext'

import { Message } from '../../types/chat'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const { currentUser } = useAuth()

  if (message.sender_id === currentUser?.id) {
    return (
      <div className="max-w-lg p-2 mt-5 ml-auto rounded-md rounded-br-none shadow-md w-fit bg-cyan-700 text-cyan-50">
        <p>{message.text}</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg p-2 mt-5 bg-white rounded-md rounded-bl-none shadow-md w-fit">
      <p>{message.text}</p>
    </div>
  )
}
