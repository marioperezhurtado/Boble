import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getParticipants, participantsListener } from '@/services/participants'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import Avatar from '@/layout/Avatar/Avatar'

import CreatorIcon from '@/assets/CreatorIcon'

interface Props {
  groupId: string
  creatorId: string
}

export default function GroupParticipants({ groupId, creatorId }: Props) {
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

  const creator = participants?.find(
    (participant) => participant.id === creatorId
  )

  const otherParticipants = participants?.filter(
    (participant) => participant.id !== creatorId
  )

  useEffect(() => {
    // Subscribe to realtime participants updates
    participantsListener({
      groupId,
      callback: refetch
    })
  }, [groupId])

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
    <div className="px-8 pt-4 border-b dark:border-zinc-700">
      <h2 className="text-lg font-semibold">{t('group-participants.title')}</h2>
      <ul className="flex items-center gap-4 py-4 mt-2 overflow-x-auto">
        {creator && (
          <li key={creator?.id} className="relative rounded-full ">
            <span className="absolute -translate-x-1/2 -top-3 left-1/2">
              <CreatorIcon />
            </span>
            <Avatar
              avatarUrl={creator?.avatar_url ?? ''}
              name={creator?.full_name ?? creator?.email}
              size="medium"
              id={creator?.id}
            />
          </li>
        )}
        {otherParticipants?.map((p) => (
          <li key={p.id}>
            <Avatar
              avatarUrl={p.avatar_url ?? ''}
              name={p.full_name ?? p.email}
              size="medium"
              id={p.id}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
