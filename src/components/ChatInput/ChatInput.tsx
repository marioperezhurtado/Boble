import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { sendPrivateMessage } from '../../hooks/useMessages'

interface Props {
  channelId: string
}

export default function ChatInput({ channelId }: Props) {
  const { currentUser } = useAuth()

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
      className="fixed bottom-0 z-10 flex justify-center w-full gap-2 p-2 border-t bg-zinc-50 md:absolute">
      <button
        disabled={isLoading}
        className="px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit">
        <img src="/attachment.svg" alt="attachment" className="w-5 h-5" />
      </button>
      <button
        disabled={isLoading}
        className="px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit">
        <img src="/camera.svg" alt="camera" className="w-5 h-5" />
      </button>
      <input
        type="text"
        name="message"
        placeholder="Type a message..."
        className="block w-full max-w-lg p-2 border rounded-md"
        autoComplete="off"
      />
      <button
        disabled={isLoading}
        className="px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit">
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
