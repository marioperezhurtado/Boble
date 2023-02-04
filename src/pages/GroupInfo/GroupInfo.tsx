import { useEffect } from 'react'
import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getGroup, groupListener } from '@/services/groups'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import GroupDetails from '@/components/Groups/GroupDetails/GroupDetails'
import ParticipantsList from '@/components/Participants/ParticipantsList/ParticipantsList'
import AddParticipant from '@/components/Participants/AddParticipant/AddParticipant'
import ToggleDarkMode from '@/layout/ToggleDarkMode/ToggleDarkMode'
import ChangeLanguage from '@/layout/ChangeLanguage/ChangeLanguage'
import ChangeFontSize from '@/layout/ChangeFontSize/ChangeFontSize'
import GroupDangerActions from '@/components/Groups/GroupDangerActions/GroupDangerActions'

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
      <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
        <Header />
        <main className="flex flex-col flex-grow w-full h-full max-w-screen-lg pt-12 mx-auto shadow-md bg-zinc-50 dark:bg-zinc-800 lg:border dark:border-zinc-700 border-x">
          <div className="flex flex-grow mx-auto mt-10 w-fit">
            <LoadSpinner />
          </div>
          <div className="flex gap-2 p-4 pb-6 w-fit">
            <ToggleDarkMode />
            <ChangeLanguage />
            <ChangeFontSize />
          </div>
        </main>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
        <Header />
        <main className="flex flex-col flex-grow w-full h-full max-w-screen-lg pt-12 mx-auto text-center shadow-md bg-zinc-50 dark:bg-zinc-800 lg:border dark:border-zinc-700 border-x">
          <div className="flex-grow py-4">
            <h1 className="mt-10 text-xl font-semibold">
              {t('group-info.error')}
            </h1>
            <h2 className="mt-3">{t('group-info.recommendation')}</h2>
            <Link to="/">
              <button className="px-3 py-1.5 mt-5 rounded-md bg-cyan-700 text-cyan-50 shadow-md block w-fit mx-auto">
                {t('group-info.back')}
              </button>
            </Link>
          </div>
          <div className="flex gap-2 p-4 pb-6 w-fit">
            <ToggleDarkMode />
            <ChangeLanguage />
            <ChangeFontSize />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
      <Header />
      <main className="flex flex-col flex-grow w-full h-full max-w-screen-lg pt-12 mx-auto shadow-md bg-zinc-50 dark:bg-zinc-800 lg:border dark:border-zinc-700 border-x">
        <div className="flex-grow">
          <GroupDetails group={group} />
          <ParticipantsList
            groupId={groupId}
            creatorId={group.creator_id ?? ''}
          />
          {isAdmin && <AddParticipant groupId={groupId} />}
        </div>
        <div className="flex items-center justify-between p-4 pb-6">
          <div className="flex gap-2">
            <ToggleDarkMode />
            <ChangeLanguage />
            <ChangeFontSize />
          </div>
          <GroupDangerActions groupId={groupId} creatorId={group?.creator_id} />
        </div>
      </main>
    </div>
  )
}
