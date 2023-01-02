import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { useDb } from '../../contexts/DbContext'

interface Props {
  channelId: string
}

export default function ChatInput({ channelId }: Props) {
  const { currentUser } = useAuth()
  const { sendPrivateMessage } = useDb()

  const { mutate, isLoading } = useMutation(
    async (text: string) =>
      await sendPrivateMessage({
        senderId: currentUser?.id ?? '',
        channelId,
        text
      })
  )

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = e.currentTarget.message.value
    if (!text) return

    mutate(text)
    e.currentTarget.reset()
  }

  return (
    <form
      onSubmit={handleSendMessage}
      name="chatInputForm"
      className="flex justify-center w-full gap-2 p-2 border-t bg-zinc-50">
      <button
        disabled={isLoading}
        className="px-3 border rounded-md text-cyan-50 min-w-fit">
        <img src="/attachment.svg" alt="attachment" className="w-5 h-5" />
      </button>
      <button
        disabled={isLoading}
        className="px-3 border rounded-md text-cyan-50 min-w-fit">
        <img src="/camera.svg" alt="camera" className="w-5 h-5" />
      </button>
      <input
        type="text"
        name="message"
        placeholder="Type a message..."
        className="block w-full max-w-lg p-2 border rounded-md"
      />
      <button
        disabled={isLoading}
        className="px-3 border rounded-md text-cyan-50 min-w-fit">
        <img src="/microphone.svg" alt="microphone" className="w-5 h-5" />
      </button>
      <button
        disabled={isLoading}
        className="px-3 rounded-md bg-cyan-700 text-cyan-50 min-w-fit">
        <img src="/send.svg" alt="send" className="w-5 h-5" />
      </button>
    </form>
  )
}
