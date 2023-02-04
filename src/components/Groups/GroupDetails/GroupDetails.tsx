import useTimestamp from '@/hooks/useTimestamp'
import { useTranslation } from 'react-i18next'

import ChangeGroupAvatar from '@/components/Avatars/ChangeGroupAvatar/ChangeGroupAvatar'
import ChangeGroupName from '@/components/Groups/ChangeGroupName/ChangeGroupName'

import type { Group } from '@/types/chat'

export default function GroupDetails({ group }: { group: Group }) {
  const { t } = useTranslation('global')
  const { created_at: createdAt } = group

  const groupDate = useTimestamp({
    timestamp: createdAt,
    type: 'date'
  })

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-4 mx-auto border-y dark:border-zinc-700">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <ChangeGroupAvatar group={group} />
        <ChangeGroupName group={group} />
      </div>
      <p className="text-sm">
        {t('group-info.created')} <strong>{groupDate}</strong>
      </p>
    </div>
  )
}
