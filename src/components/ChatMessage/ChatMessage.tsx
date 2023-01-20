import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import useTimestamp from '../../hooks/useTimestamp'
import { useTranslation } from 'react-i18next'

import { Message } from '../../types/chat'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [imgError, setImgError] = useState(false)

  const handleImgError = () => setImgError(true)

  const dateTime = useTimestamp(message.created_at)

  if (message.media_link) {
    return (
      <div
        className={`w-3/4 sm:max-w-xs md:max-w-sm p-1 pb-1 mt-4 rounded-md shadow-md flex flex-col gap-1 ${
          currentUser?.id === message.sender_id
            ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
            : 'bg-white mr-auto rounded-bl-none dark:bg-zinc-600'
        } `}>
        {!imgError && message.media_link && (
          <img
            src={message.media_link}
            alt="media"
            className="rounded-md"
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
