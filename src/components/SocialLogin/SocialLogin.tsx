import { useLocation } from 'wouter'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from 'react-i18next'

export default function SocialLogin() {
  const { t } = useTranslation('global')
  const [location] = useLocation()
  const { signInGoogle, signInGithub } = useAuth()

  const {
    mutate: handleSignInGoogle,
    isLoading: googleLoading,
    error: googleError
  } = useMutation(async () => {
    await signInGoogle(location)
  })

  const {
    mutate: handleSignInGithub,
    isLoading: githubLoading,
    error: githubError
  } = useMutation(async () => {
    await signInGithub(location)
  })

  const isLoading = googleLoading || githubLoading
  const error = (googleError as Error) || (githubError as Error)

  return (
    <div className="flex flex-col gap-2 mt-5">
      <>
        <button
          onClick={() => {
            handleSignInGoogle()
          }}
          disabled={isLoading}
          type="button"
          className="flex items-center gap-3 px-3 py-2 bg-white border rounded-md shadow-md text-zinc-900">
          <img src="/google.svg" alt="Google Logo" className="w-5" />
          {t('social-login.google')}
        </button>
        <button
          onClick={() => {
            handleSignInGithub()
          }}
          disabled={isLoading}
          type="button"
          className="flex items-center gap-3 px-3 py-2 text-white border rounded-md shadow-md bg-zinc-900 border-zinc-900">
          <img src="/github.svg" alt="Github Logo" className="w-5" />
          {t('social-login.github')}
        </button>
        {error && (
          <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
            {error.message}
          </p>
        )}
      </>
    </div>
  )
}
