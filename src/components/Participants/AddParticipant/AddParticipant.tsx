import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { addParticipant } from '@/services/participants'
import { useTranslation } from 'react-i18next'

interface Props {
  groupId: string
}

export default function AddParticipant({ groupId }: Props) {
  const { t } = useTranslation('global')
  const [userId, setUserId] = useState('')

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async () => await addParticipant({ groupId, userId }),
    onSuccess: () => setUserId('')
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    mutate()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value)

  return (
    <div className="flex flex-col gap-2 p-4 sm:gap-4">
      <form
        onSubmit={handleSubmit}
        name="addParticipant"
        className="flex flex-wrap gap-2">
        <input
          value={userId}
          onChange={handleChange}
          type="text"
          name="groupName"
          id="groupName"
          placeholder={t('add-participant.placeholder')}
          className="border rounded-md px-2 py-1.5 dark:bg-zinc-700 dark:border-zinc-600"
          autoComplete="off"
        />
        <button
          disabled={isLoading}
          className="px-2 py-1 transition rounded-md sm:text-sm bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
          {t('add-participant.title')}
        </button>
      </form>
      {isError && (
        <p className="p-1.5 px-3 w-fit bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
          {t('add-participant.error')}
        </p>
      )}
      {isSuccess && (
        <p className="p-1.5 px-3 w-fit bg-green-100 border-l-4 border-green-600 text-zinc-700 dark:bg-green-200">
          {t('add-participant.success')}
        </p>
      )}
    </div>
  )
}
