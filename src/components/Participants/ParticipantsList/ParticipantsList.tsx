import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getParticipants, participantsListener } from '@/services/participants'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import Participant from '@/components/Participants/Participant/Participant'

interface Props {
  groupId: string
  creatorId: string
}

export default function ParticipantsList({ groupId, creatorId }: Props) {
  const { t } = useTranslation('global')

  const {
    data: participants,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['participants', groupId],
    queryFn: async () => await getParticipants({ groupId })
  })

  useEffect(() => {
    // Subscribe to realtime participants updates
    participantsListener({
      groupId,
      callback: refetch
    })
  }, [groupId])

  const creator = participants?.find((p) => p.user_id.id === creatorId)
  const otherParticipants = participants?.filter(
    (p) => p.user_id.id !== creatorId
  )

  if (isLoading) {
    return (
      <div className="py-4">
        <LoadSpinner />
      </div>
    )
  }

  if (error || !participants) {
    return (
      <div className="py-4 text-center">
        <h2 className="mt-4 font-semibold text-md">
          {t('group-participants.error')}
        </h2>
        <p className="mt-3">{t('group-participants.error')}</p>
      </div>
    )
  }

  return (
    <div className="px-2 pt-4 border-b md:px-8 sm:px-4 dark:border-zinc-700">
      <h2 className="text-lg font-semibold">{t('group-participants.title')}</h2>
      <ul className="flex items-center gap-4 py-4 overflow-x-auto">
        {creator && (
          <li key={creator.user_id.id}>
            <Participant participant={creator} creatorId={creatorId} />
          </li>
        )}
        {otherParticipants?.map((p) => (
          <li key={p.user_id.id}>
            <Participant participant={p} creatorId={creatorId} />
          </li>
        ))}
      </ul>
    </div>
  )
}
