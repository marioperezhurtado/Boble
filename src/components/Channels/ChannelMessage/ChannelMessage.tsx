import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import useTimestamp from '../../../hooks/useTimestamp'
import { useTranslation } from 'react-i18next'
import useHashIdToColor from '../../../hooks/useHashIdToColor'

import { MessageChat, MessageGroup } from '../../../types/chat'

interface Props {
  message: MessageChat | MessageGroup
  type: 'chat' | 'group'
}

export default function ChatMessage({ message, type }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleLoadImg = () => setImgLoaded(true)
  const handleImgError = () => setImgError(true)

  const {
    sender_id: senderId,
    text,
    media_link: mediaLink,
    audio_link: audioLink,
    created_at: createdAt
  } = message

  const dateTime = useTimestamp(createdAt)

  const generatedColor = useHashIdToColor({
    id: currentUser?.id ?? '',
    userId: senderId.id
  })

  const color = type === 'chat' ? 'bg-white dark:bg-zinc-600' : generatedColor
  const isOwnMessage = currentUser?.id === senderId.id

  if (mediaLink) {
    return (
      <div
        className={`w-3/4 sm:max-w-xs md:max-w-sm p-1 pb-1 mt-4 rounded-md shadow-md flex flex-col gap-1 ${
          isOwnMessage
            ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
            : `${color} mr-auto rounded-br-none`
        } 
        ${!imgLoaded ? 'hidden' : ''}`}>
        {!imgError && mediaLink && (
          <img
            src={mediaLink}
            alt="media"
            className="rounded-md"
            onLoad={handleLoadImg}
            onError={handleImgError}
          />
        )}
        {imgError && (
          <p className="p-1.5 pl-3 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
            {t('message.media-error')}
          </p>
        )}
        <p>{message.text}</p>
        <p className="self-end flex-grow text-xs text-right">{dateTime}</p>
      </div>
    )
  }

  if (audioLink) {
    return (
      <div
        className={`w-fit max-w-full p-1 pb-1 mt-4 rounded-md shadow-md flex flex-col gap-1 ${
          isOwnMessage
            ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
            : `${color} mr-auto rounded-br-none`
        } `}>
        <audio controls className="max-w-full" title="Audio message">
          <source src={audioLink} type="audio/webm" />
        </audio>
        <p>{text}</p>
        <p className="self-end flex-grow text-xs text-right">{dateTime}</p>
      </div>
    )
  }

  return (
    <div
      className={`max-w-lg pl-3 pr-2 py-1 mt-4 rounded-md rounded-br-none shadow-md w-fit ${
        isOwnMessage
          ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
          : `${color} mr-auto rounded-br-none`
      } `}>
      {type === 'group' && !isOwnMessage && (
        <p className="font-semibold text-sm">
          ~ {senderId.full_name ?? senderId.email}
        </p>
      )}
      <div className="flex gap-2 ">
        <p className="my-1.5 break-all">{text}</p>
        <p className="self-end flex-grow pt-1 text-xs text-right">{dateTime}</p>
      </div>
    </div>
  )
}
