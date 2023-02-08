import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { removeParticipant } from '@/services/participants'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

import Avatar from '@/layout/Avatar/Avatar'
import ActionsIcon from '@/assets/ActionsIcon'
import Modal from '@/layout/Modal/Modal'

import type { Participant as GroupParticipant } from '@/types/chat'

interface Props {
  participant: GroupParticipant
  creatorId: string
}

export default function Participant({ participant, creatorId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const {
    id,
    email,
    full_name: fullName,
    avatar_url: avatarUrl
  } = participant.user_id

  const isUserCreator = currentUser?.id === creatorId

  const { mutate: handleRemoveParticipant, isLoading } = useMutation({
    mutationFn: async () => {
      await removeParticipant({ groupId: participant.group_id, userId: id })
    },
    onSuccess: () => setIsActionsOpen(false)
  })

  const handleOpenActions = () => setIsActionsOpen(true)
  const handleCloseActions = () => setIsActionsOpen(false)
  const handleOpenRemove = () => setIsRemoveModalOpen(true)
  const handleCancelRemove = () => setIsRemoveModalOpen(false)

  useOnClickOutside({
    ref,
    handler: handleCloseActions
  })

  if (id === creatorId) {
    return (
      <div className="relative">
        <span className="absolute right-0 bottom-1">
          <img src="/crown.svg" alt="creator" className="w-5 h-5" />
        </span>
        <Avatar
          avatarUrl={avatarUrl}
          name={fullName ?? email}
          size="medium"
          id={id}
        />
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        {isUserCreator && (
          <>
            {isActionsOpen && (
              <button
                ref={ref}
                onClick={handleOpenRemove}
                disabled={isLoading}
                className="absolute bottom-0 -right-0 z-10 bg-red-100 text-red-700 text text-sm rounded-md px-2 py-1.5 hover:bg-red-200 transition">
                {t('group-participants.remove')}
              </button>
            )}
            <button
              onClick={handleOpenActions}
              className="absolute bottom-0 transition rounded-full -right-4 hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <ActionsIcon />
            </button>
          </>
        )}
        <Avatar
          avatarUrl={avatarUrl}
          name={fullName ?? email}
          size="medium"
          id={id}
        />
      </div>
      {isRemoveModalOpen && (
        <Modal onClose={handleCancelRemove}>
          <h1 className="text-2xl font-semibold text-center">
            {t('remove-participant.title')}
          </h1>
          <h2 className="mt-5 text-center">{t('remove-participant.info')}</h2>
          <div className="flex flex-col items-center justify-center mt-5 pointer-events-none">
            <Avatar
              avatarUrl={avatarUrl}
              name={fullName ?? email}
              size="large"
              id={id}
            />
            <strong>{fullName ?? email}</strong>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={() => handleRemoveParticipant()}
              className="bg-red-7 bg-red-200 text-red-800 shadow-md rounded-md px-2 py-1.5 text-sm hover:bg-red-300 transition">
              {t('remove-participant.remove')}
            </button>
            <button
              onClick={handleCancelRemove}
              className="bg-cyan-700 text-cyan-50 rounded-md px-2 py-1.5 text-sm shadow-md hover:bg-cyan-600 transition">
              {t('remove-participant.cancel')}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
