import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { createGroup } from '@/services/groups'
import { useTranslation } from 'react-i18next'

export default function CreateGroup() {
  const { t } = useTranslation('global')
  const { currentUser } = useAuth()
  const [groupName, setGroupName] = useState<string>('')

  const {
    mutate: handleCreateGroup,
    isLoading,
    isError
  } = useMutation(
    async (name: string) =>
      await createGroup({
        name,
        creatorId: currentUser?.id ?? ''
      })
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!groupName) return

    handleCreateGroup(groupName)
    setGroupName('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(e.target.value)

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <form
        onSubmit={handleSubmit}
        name="createGroup"
        className="flex flex-wrap justify-center gap-2">
        <input
          value={groupName}
          onChange={handleChange}
          type="text"
          name="groupName"
          id="groupName"
          placeholder={t('create-group.name')}
          className="border rounded-md px-2 py-1.5 dark:bg-zinc-700 dark:border-zinc-600"
        />
        <button
          disabled={isLoading}
          className="px-2 py-1 transition rounded-md sm:text-sm bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
          {t('create-group.submit')}
        </button>
      </form>
      {isError && (
        <p className="p-1.5 px-3 mx-auto w-fit bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
          {t('groups.errors.create')}
        </p>
      )}
    </div>
  )
}
