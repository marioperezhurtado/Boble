import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { sendMessage } from '../../hooks/useMessages'
import { sendImage } from '../../hooks/useImage'
import { capitalize } from '../../utils/text'
import { useTranslation } from 'react-i18next'

import GifModal from '../GifModal/GifModal'

import GifIcon from '../../assets/GifIcon'
import CameraIcon from '../../assets/CameraIcon'
import AudioIcon from '../../assets/AudioIcon'

interface Props {
  channelId: string
}

interface SendMessage {
  text: string
  mediaLink: string | null
}

export default function ChatInput({ channelId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [text, setText] = useState('')
  const [showGifModal, setShowGifModal] = useState(false)

  const { mutate, isLoading } = useMutation(
    async ({ text, mediaLink }: SendMessage) =>
      await sendMessage({
        senderId: currentUser?.id ?? '',
        channelId,
        text,
        mediaLink
      })
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(capitalize(e.target.value))
  }
  const handleToggleGifModal = () => {
    setShowGifModal((s) => !s)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return

    mutate({ text, mediaLink: null })
    setText('')
  }

  const handleSendGif = (url: string) => {
    mutate({ text: '', mediaLink: url })
  }

  const handleSendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await sendImage({ senderId: currentUser?.id ?? '', channelId, image: file })
  }

  return (
    <>
      <form
        onSubmit={handleSendMessage}
        name="chatInputForm"
        className="fixed bottom-0 z-10 flex justify-center w-full gap-2 p-2 border-t bg-zinc-50 md:absolute dark:bg-zinc-700 dark:border-zinc-600">
        <button
          type="button"
          onClick={handleToggleGifModal}
          disabled={isLoading}
          className="px-1.5 border rounded-md md:px-2.5 text-cyan-50 min-w-fit hover:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-500">
          <GifIcon />
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit hover:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-500 relative">
          <CameraIcon />
          <input
            type="file"
            accept="image/*"
            onChange={handleSendImage}
            className="absolute top-0 left-0 w-full h-full opacity-0"
            title=""
          />
        </button>
        <input
          value={text}
          onChange={handleChange}
          type="text"
          name="message"
          placeholder={t('chat-input.placeholder') ?? ''}
          className="block w-full max-w-lg p-2 border rounded-md dark:bg-zinc-600 dark:border-zinc-500  dark:placeholder:text-zinc-300"
          autoComplete="off"
        />
        <button
          type="button"
          disabled={isLoading}
          className="px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit hover:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-500">
          <AudioIcon />
        </button>
        <button
          disabled={isLoading}
          className="px-3 rounded-md bg-cyan-700 text-cyan-50 min-w-fit hover:bg-cyan-600">
          <img src="/send.svg" alt="send" className="w-5 h-5" />
        </button>
      </form>
      {showGifModal && (
        <GifModal onClose={handleToggleGifModal} onSend={handleSendGif} />
      )}
    </>
  )
}
