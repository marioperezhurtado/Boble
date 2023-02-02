import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { removeParticipant } from '@/services/participants'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

import Avatar from '@/layout/Avatar/Avatar'
import CreatorIcon from '@/assets/CreatorIcon'
import ActionsIcon from '@/assets/ActionsIcon'

import type { Participant } from '@/types/chat'

interface Props {
  participant: Participant
  creatorId: string
}

export default function GroupParticipant({ participant, creatorId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [isActionsOpen, setIsActionsOpen] = useState(false)
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

  useOnClickOutside({
    ref,
    handler: handleCloseActions
  })

  if (id === creatorId) {
    return (
      <div className="relative">
        <span className="absolute right-0 bottom-1">
          <CreatorIcon />
        </span>
        <Avatar
          avatarUrl={avatarUrl ?? ''}
          name={fullName ?? email}
          size="medium"
          id={id}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      {isUserCreator && (
        <>
          {isActionsOpen && (
            <button
              ref={ref}
              onClick={() => handleRemoveParticipant()}
              disabled={isLoading}
              className="absolute bottom-0 -right-1 z-10 bg-red-100 text-red-700 text text-sm rounded-md px-2 py-1.5 hover:bg-red-200 transition">
              {t('group-participants.remove')}
            </button>
          )}
          <button
            onClick={handleOpenActions}
            className="absolute bottom-0 -right-4">
            <ActionsIcon />
          </button>
        </>
      )}
      <Avatar
        avatarUrl={avatarUrl ?? ''}
        name={fullName ?? email}
        size="medium"
        id={id}
      />
    </div>
  )
}
