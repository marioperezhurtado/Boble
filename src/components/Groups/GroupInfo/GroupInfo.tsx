import { useEffect } from 'react'
import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getGroup, groupListener } from '@/services/groups'
import { useTranslation } from 'react-i18next'

import GroupDetails from '@/components/Groups/GroupDetails/GroupDetails'
import ParticipantsList from '@/components/Participants/ParticipantsList/ParticipantsList'
import AddParticipant from '@/components/Participants/AddParticipant/AddParticipant'
import GroupDangerActions from '@/components/Groups/GroupDangerActions/GroupDangerActions'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import Back from '@/layout/Back/Back'

interface Props {
  groupId: string
}

export default function GroupInfo({ groupId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()

  const {
    data: group,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => await getGroup({ groupId })
  })

  const isAdmin = currentUser?.id === group?.creator_id

  useEffect(() => {
    // Subscribe to realtime group updates
    groupListener({
      groupId,
      callback: refetch
    })
  }, [groupId])

  if (isLoading) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-800 h-full pt-12">
        <LoadSpinner />
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="flex-grow py-4 text-center bg-zinc-50 dark:bg-zinc-800 h-full">
        <h1 className="mt-10 text-xl font-semibold">{t('group-info.error')}</h1>
        <h2 className="mt-3">{t('group-info.recommendation')}</h2>
        <Link to="/">
          <button className="px-3 py-1.5 mt-5 rounded-md bg-cyan-700 text-cyan-50 shadow-md block w-fit mx-auto hover:bg-cyan-600 transition">
            {t('group-info.back')}
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-800">
      <Back to="/groups" />
      <div className="flex-grow">
        <GroupDetails group={group} />
        <ParticipantsList
          groupId={groupId}
          creatorId={group.creator_id ?? ''}
        />
        {isAdmin && <AddParticipant groupId={groupId} />}
      </div>
      <div className="self-end p-4 pb-6">
        <GroupDangerActions groupId={groupId} creatorId={group?.creator_id} />
      </div>
    </div>
  )
}
