import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { sendChatMessage, sendGroupMessage } from '@/services/messages'
import {
  uploadChatImage,
  uploadGroupImage,
  uploadChatAudio,
  uploadGroupAudio
} from '@/services/media'
import { capitalize } from '@/utils/text'
import { useTranslation } from 'react-i18next'

import GifModal from '@/components/GifModal/GifModal'
import AudioRecord from '@/components/AudioRecord/AudioRecord'

import GifIcon from '@/assets/GifIcon'
import CameraIcon from '@/assets/CameraIcon'

interface Props {
  channelId: string
  type: 'chat' | 'group'
}

interface SendMessage {
  text: string
  mediaLink: string | null
  audioLink: string | null
}

export default function ChannelInput({ channelId, type }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [text, setText] = useState('')
  const [showGif, setShowGif] = useState(false)
  const [showAudioRecord, setShowAudioRecord] = useState(false)

  const sendMessage = type === 'chat' ? sendChatMessage : sendGroupMessage
  const uploadImage = type === 'chat' ? uploadChatImage : uploadGroupImage
  const uploadAudio = type === 'chat' ? uploadChatAudio : uploadGroupAudio

  const { mutate, isLoading } = useMutation(
    async ({ text, mediaLink, audioLink }: SendMessage) =>
      await sendMessage({
        senderId: currentUser?.id ?? '',
        channelId,
        text,
        mediaLink,
        audioLink
      })
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(capitalize(e.target.value))
  }

  const handleToggleGif = () => setShowGif((s) => !s)

  const handleToggleAudioRecord = () => setShowAudioRecord((s) => !s)

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return

    mutate({ text, mediaLink: null, audioLink: null })
    setText('')
  }

  const handleSendGif = (url: string) => {
    mutate({ text: '', mediaLink: url, audioLink: null })
  }

  const handleSendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage({ channelId, image: file })

    mutate({ text: '', mediaLink: url, audioLink: null })
  }

  const handleSendAudio = async (audio: File) => {
    const url = await uploadAudio({ channelId, audio })

    mutate({ text: '', mediaLink: null, audioLink: url })
  }

  return (
    <>
      <form
        onSubmit={handleSendMessage}
        name="chatInputForm"
        className="fixed bottom-0 z-10 flex justify-center w-full gap-2 p-2 border-t bg-zinc-50 md:absolute dark:bg-zinc-700 dark:border-zinc-600">
        <button
          type="button"
          onClick={handleToggleGif}
          disabled={isLoading}
          className="px-1.5 border rounded-md md:px-2.5 text-cyan-50 min-w-fit hover:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-500">
          <GifIcon />
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="relative px-2 border rounded-md md:px-3 text-cyan-50 min-w-fit hover:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-500">
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
          className="block w-full max-w-lg p-2 border rounded-md dark:bg-zinc-600 dark:border-zinc-500 dark:placeholder:text-zinc-300"
          autoComplete="off"
        />

        {text && (
          <button
            disabled={isLoading}
            className="px-3 rounded-md bg-cyan-700 text-cyan-50 min-w-fit hover:bg-cyan-600">
            <img src="/send.svg" alt="send message" className="w-5 h-5" />
          </button>
        )}
        {!text && (
          <button
            type="button"
            onClick={handleToggleAudioRecord}
            disabled={isLoading}
            className="px-3 rounded-md bg-cyan-700 text-cyan-50 min-w-fit hover:bg-cyan-600">
            <img src="/audio.svg" alt="start recording" className="w-5 h-5" />
          </button>
        )}
      </form>
      {showGif && <GifModal onClose={handleToggleGif} onSend={handleSendGif} />}
      {showAudioRecord && (
        <AudioRecord
          onClose={handleToggleAudioRecord}
          onSend={handleSendAudio}
        />
      )}
    </>
  )
}
