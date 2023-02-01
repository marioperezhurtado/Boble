import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { getGroup } from '@/services/groups'
import useTimestamp from '@/hooks/useTimestamp'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import Avatar from '@/layout/Avatar/Avatar'
import GroupParticipants from '@/components/Groups/GroupParticipants/GroupParticipants'
import ToggleDarkMode from '@/layout/ToggleDarkMode/ToggleDarkMode'
import ChangeLanguage from '@/layout/ChangeLanguage/ChangeLanguage'
import ChangeFontSize from '@/layout/ChangeFontSize/ChangeFontSize'
import GroupDangerActions from '@/components/Groups/GroupDangerActions/GroupDangerActions'

interface Props {
  groupId: string
}

export default function GroupInfo({ groupId }: Props) {
  const { t } = useTranslation('global')

  const {
    data: group,
    isLoading,
    error
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => await getGroup({ groupId })
  })

  const date = useTimestamp({
    timestamp: group?.created_at ?? '',
    type: 'date'
  })

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
        <Header />
        <main className="flex-grow w-full h-full max-w-screen-xl px-4 pt-12 mx-auto shadow-md bg-zinc-50 dark:bg-zinc-800 lg:border dark:border-zinc-700">
          <div className="flex mx-auto mt-10 w-fit">
            <LoadSpinner />
          </div>
        </main>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
        <Header />
        <main className="flex flex-col flex-grow w-full h-full max-w-screen-xl px-4 pt-12 mx-auto text-center shadow-md bg-zinc-50 dark:bg-zinc-800 lg:border dark:border-zinc-700">
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
          <div className="flex gap-2 py-4 w-fit">
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
          <div className="flex flex-wrap items-center gap-4 px-8 py-4 mx-auto border-y dark:border-zinc-700">
            <div className="flex items-center flex-grow gap-4 md:gap-8">
              <Avatar
                avatarUrl={group.image_url}
                name={group.name}
                size="large"
              />
              <h1 className="text-xl font-semibold">{group.name}</h1>
            </div>
            <p className="text-sm">
              {t('group-info.created')} <strong>{date}</strong>
            </p>
          </div>
          <GroupParticipants
            groupId={groupId}
            creatorId={group.creator_id ?? ''}
          />
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
