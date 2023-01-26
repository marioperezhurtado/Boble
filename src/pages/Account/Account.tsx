import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'
import { getProfile, updateProfile } from '../../services/profile'
import { useTranslation } from 'react-i18next'

import Header from '../../layout/Header/Header'
import LoadSpinner from '../../layout/LoadSpinner/LoadSpinner'
import ChangeAvatar from '../../components/ChangeAvatar/ChangeAvatar'
import ConnectFriends from '../../components/ConnectFriends/ConnectFriends'

export default function Account() {
  const { t } = useTranslation('global')
  const [name, setName] = useState<string>('')
  const { currentUser } = useAuth()

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', currentUser?.id],
    queryFn: async () => await getProfile(currentUser?.id ?? ''),
    onSuccess: (data) => {
      setName(data?.full_name ?? '')
    }
  })

  const newProfile = {
    id: profile?.id ?? '',
    email: profile?.email ?? '',
    avatar_url: profile?.avatar_url ?? '',
    full_name: name
  }

  const {
    mutate: handleUpdateProfile,
    isLoading: isUpdating,
    isError: updateError,
    isSuccess: updateSuccess
  } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async () => await updateProfile(newProfile),
    onSuccess: () => setName(newProfile.full_name)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleUpdateProfile()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 pb-5 bg-zinc-50 dark:bg-zinc-800 pt-14 md:pt-20">
        <div className="max-w-xl p-6 mx-auto mt-5 bg-white border rounded-md shadow-md dark:border-zinc-600 dark:bg-zinc-700">
          <h1 className="mb-5 text-2xl font-semibold">{t('account.title')}</h1>
          <h2 className="mb-5">{t('account.description')}</h2>
          {updateError && (
            <p className="p-1.5 pl-3 mb-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
              {t('account.update-error')}
            </p>
          )}
          {updateSuccess && (
            <p className="p-1.5 pl-3 mb-5 bg-green-100 border-l-4 border-green-600 text-zinc-700 dark:bg-green-200">
              {t('account.update-success')}
            </p>
          )}
          {isProfileLoading && <LoadSpinner />}
          {!isProfileLoading && (
            <>
              <ChangeAvatar />
              <form
                onSubmit={handleSubmit}
                name="accountForm"
                className="flex flex-col">
                <label htmlFor="name" className="pt-3">
                  {t('account.full-name')}
                </label>
                <input
                  value={name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
                />
                <div className="flex flex-wrap items-center justify-between pt-5 gap-y-3">
                  <Link
                    to="/reset-password"
                    className="font-semibold w-fit text-cyan-700 dark:text-cyan-400">
                    {t('account.reset')}
                  </Link>
                  <button
                    disabled={isUpdating}
                    type="submit"
                    className="bg-cyan-700 hover:bg-cyan-600 transition px-2 py-1.5 rounded-md text-cyan-50 text-sm">
                    {t('account.save')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        <ConnectFriends />
      </main>
    </>
  )
}
