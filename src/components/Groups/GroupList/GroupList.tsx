import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getGroups, groupsListener } from '@/services/groups'
import { capitalize } from '@/utils/text'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'
import GroupPreview from '../GroupPreview/GroupPreview'

interface Props {
  groupId: string
}

export default function GroupList({ groupId }: Props) {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [search, setSearch] = useState('')

  const {
    data: groups,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['groups', currentUser],
    queryFn: async () => await getGroups({ userId: currentUser?.id ?? '' })
  })

  const groupsError = error as Error

  useEffect(() => {
    if (!currentUser?.id) return
    // Subscribe to realtime group updates
    groupsListener({
      userId: currentUser.id,
      callback: refetch
    })
  }, [currentUser])

  const matchingGroups = groups?.filter((g) =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(capitalize(e.target.value))
  }

  if (isLoading) {
    return (
      <ul className="flex flex-col w-full my-10 border-r bg-zinc-50 border-zinc-200 dark:bg-zinc-800">
        <LoadSpinner />
      </ul>
    )
  }

  if (groupsError) {
    return (
      <ul className="flex flex-col p-4 bg-zinc-50 dark:bg-zinc-800">
        <p className="p-1.5 pl-3 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
          {t('groups.errors.get')}
        </p>
      </ul>
    )
  }

  if (!groups?.length) {
    return (
      <ul className="flex flex-col px-4 py-8 text-center sm:px-8 bg-zinc-50 dark:bg-zinc-800">
        <h2 className="mb-5 text-xl font-bold">{t('groups.empty.title')}</h2>
        <p>{t('groups.empty.description')}</p>
      </ul>
    )
  }

  return (
    <>
      <input
        value={search}
        onChange={handleChange}
        type="text"
        placeholder={t('groups.search.placeholder')}
        className="border rounded-md px-2 py-1 max-w-full mx-4 mt-2.5 mb-2 dark:bg-zinc-700 dark:border-zinc-600"
        autoComplete="off"
      />
      <ul className="flex flex-col overflow-y-auto bg-zinc-50 dark:bg-zinc-800">
        {matchingGroups?.map((g) => (
          <li
            key={g.id}
            className={`flex items-center ${
              g.id === groupId ? 'bg-zinc-100 dark:bg-zinc-700' : ''
            }`}>
            <GroupPreview group={g} />
          </li>
        ))}
        {!matchingGroups?.length && (
          <p className="py-5 text-center border-t">
            {t('groups.search.no-results')}
            <span className="font-bold break-all"> {`"${search}"`}</span>
          </p>
        )}
      </ul>
    </>
  )
}
