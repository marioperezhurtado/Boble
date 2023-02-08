import { useQuery, useMutation } from '@tanstack/react-query'
import { Link, useLocation } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { getProfile } from '@/services/profile'
import { createChat } from '@/services/chats'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'

interface Props {
  userId: string
}

export default function Invite({ userId }: Props) {
  const { t } = useTranslation('global')
  const [, setLocation] = useLocation()
  const { currentUser } = useAuth()

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: profileError
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => await getProfile(userId),
    refetchOnWindowFocus: false
  })

  const {
    mutate: handleCreateChat,
    isLoading: isCreatingChat,
    isError: chatError
  } = useMutation({
    mutationFn: async () =>
      await createChat({
        userId: currentUser?.id ?? '',
        friendId: profile?.id ?? ''
      }),
    onSuccess: () => setLocation('/chats')
  })

  return (
    <>
      <Header />
      <main className="pt-14 px-4 bg-zinc-50 min-h-screen dark:bg-zinc-800">
        <div className="max-w-lg mx-auto bg-white mt-10 border rounded-md p-5 shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <h1 className="text-xl font-semibold mb-7">{t('invite.title')}</h1>
          {isProfileLoading && <LoadSpinner />}
          {profileError && (
            <p className="p-1.5 pl-3 mb-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
              {t('invite.profile-error')}
            </p>
          )}
          {chatError && (
            <p className="p-1.5 pl-3 mb-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
              {t('invite.accept-error')}
            </p>
          )}
          {!isProfileLoading && profile && (
            <h2>
              <span className="font-semibold">{profile.email} </span>
              {t('invite.description')}
            </h2>
          )}
          <button
            onClick={() => handleCreateChat()}
            disabled={isCreatingChat || !profile}
            className="bg-cyan-700 text-cyan-50 px-2 py-1.5 rounded-md  w-full mt-5 hover:bg-cyan-600 transition">
            {t('invite.accept')}
          </button>
        </div>
        <Link to="/home">
          <p className="text-center mt-5 text-cyan-700 font-semibold cursor-pointer dark:text-cyan-400">
            {t('invite.back')}
          </p>
        </Link>
      </main>
    </>
  )
}
