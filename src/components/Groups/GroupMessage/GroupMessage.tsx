import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import useTimestamp from '../../../hooks/useTimestamp'
import { useTranslation } from 'react-i18next'
import useHashIdToColor from '../../../hooks/useHashIdToColor'

import Avatar from '../../../layout/Avatar/Avatar'

import { Message } from '../../../types/chat'

interface Props {
  message: Message
  prevMessage?: Message
}

export default function GroupMessage({ message, prevMessage }: Props) {
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

  const isOwnMessage = currentUser?.id === senderId.id
  const isFirstMessageByUser =
    !isOwnMessage && prevMessage?.sender_id.id !== senderId.id

  if (mediaLink) {
    return (
      <div className="flex justify-end gap-2 mt-4">
        {isFirstMessageByUser && (
          <Avatar
            avatarUrl={senderId.avatar_url ?? ''}
            name={senderId.email}
            size={'small'}
          />
        )}
        <div
          className={`w-3/4 sm:max-w-xs md:max-w-sm p-1 pb-1 rounded-md shadow-md flex flex-col gap-1 ${
            isOwnMessage
              ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
              : `${generatedColor} mr-auto rounded-tl-none`
          } ${imgLoaded ? '' : 'hidden'} ${isFirstMessageByUser ? '' : 'ml-10'}
        `}>
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
          <p>{text}</p>
          <div className="flex justify-between">
            {isFirstMessageByUser && (
              <p className="text-sm font-semibold">
                ~ {senderId.full_name ?? senderId.email}
              </p>
            )}
            <p className="self-end flex-grow text-xs text-right">{dateTime}</p>
          </div>
        </div>
      </div>
    )
  }

  if (audioLink) {
    return (
      <div className="flex gap-2 mt-4">
        {isFirstMessageByUser && (
          <Avatar
            avatarUrl={senderId.avatar_url ?? ''}
            name={senderId.email}
            size={'small'}
          />
        )}
        <div
          className={`w-fit max-w-full p-1 pb-1 rounded-md shadow-md flex flex-col gap-1 ${
            isOwnMessage
              ? 'bg-cyan-700 text-cyan-50 ml-auto rounded-br-none'
              : `${generatedColor} mr-auto rounded-tl-none`
          } 
          ${isFirstMessageByUser ? '' : 'ml-12'}`}>
          <audio controls className="max-w-full" title="Audio message">
            <source src={audioLink} type="audio/webm" />
          </audio>
          <p>{text}</p>
          <p className="text-xs text-right">{dateTime}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end gap-2 mt-4">
      {isFirstMessageByUser && (
        <Avatar
          avatarUrl={senderId.avatar_url ?? ''}
          name={senderId.email}
          size={'small'}
        />
      )}
      <div
        className={`w-fit max-w-full p-1 px-2 pb-1 rounded-md shadow-md flex flex-col ${
          isOwnMessage
            ? 'bg-cyan-700 text-cyan-50 rounded-br-none ml-auto'
            : `${generatedColor} mr-auto rounded-tl-none`
        } 
          ${isFirstMessageByUser ? '' : 'ml-10'}`}>
        {isFirstMessageByUser && (
          <p className="text-sm font-semibold">
            ~ {senderId.full_name ?? senderId.email}
          </p>
        )}
        <div className="flex gap-2 ">
          <p className="my-1.5 break-all">{text}</p>
          <p className="self-end pt-1 text-xs text-right">{dateTime}</p>
        </div>
      </div>
    </div>
  )
}
