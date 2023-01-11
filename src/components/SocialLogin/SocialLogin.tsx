import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'

export default function SocialLogin() {
  const { signInGoogle, signInGithub } = useAuth()

  const {
    mutate: handleSignInGoogle,
    isLoading: googleLoading,
    error: googleError
  } = useMutation(signInGoogle)

  const {
    mutate: handleSignInGithub,
    isLoading: githubLoading,
    error: githubError
  } = useMutation(signInGithub)

  const isLoading = googleLoading || githubLoading
  const error = (googleError as Error) || (githubError as Error)

  return (
    <div className="flex flex-col gap-2 mt-5">
      <>
        <button
          onClick={() => handleSignInGoogle()}
          disabled={isLoading}
          type="button"
          className="flex items-center gap-3 px-3 py-2 bg-white border rounded-md shadow-md text-zinc-900">
          <img src="/google.svg" alt="Google Logo" className="w-5"></img>Sign In
          with Google
        </button>
        <button
          onClick={() => handleSignInGithub()}
          disabled={isLoading}
          type="button"
          className="flex items-center gap-3 px-3 py-2 text-white border rounded-md shadow-md bg-zinc-900 border-zinc-900">
          <img src="/github.svg" alt="Github Logo" className="w-5"></img>Sign In
          with GitHub
        </button>
        {error && (
          <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
            {error.message}
          </p>
        )}
      </>
    </div>
  )
}
