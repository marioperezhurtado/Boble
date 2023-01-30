import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'wouter'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import PasswordInput from '@/layout/PasswordInput/PasswordInput'
import SocialLogin from '@/components/SocialLogin/SocialLogin'

interface FormState {
  email: string
  password: string
  confirmPassword: string
}

const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
}

export default function Signup() {
  const { t } = useTranslation('global')
  const { signUp } = useAuth()
  const [formState, setFormState] = useState<FormState>(initialState)
  const [validationError, setValidationError] = useState<string | null>(null)
  const { email, password, confirmPassword } = formState

  const {
    mutate: handleSignUp,
    isLoading,
    error,
    isSuccess
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => setFormState(initialState)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError(null)

    if (!email || !password || !confirmPassword) {
      setValidationError(t('validation.empty-error'))
      return
    }
    if (password !== confirmPassword) {
      setValidationError(t('validation.password-match-error'))
      return
    }

    handleSignUp({ email, password })
  }

  const signUpError = error as Error

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-20 bg-zinc-100 md:py-32 dark:bg-zinc-800">
        <div className="w-full max-w-md p-6 mx-auto bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <h1 className="text-2xl font-bold">{t('signup.title')}</h1>
          <form
            onSubmit={handleSubmit}
            name="signupForm"
            className="flex flex-col mt-2">
            {isSuccess && (
              <p className="p-1.5 pl-3 mt-5 bg-green-100 border-l-4 border-green-600 text-zinc-700 dark:bg-green-200">
                {t('signup.success')}
              </p>
            )}
            {!validationError && signUpError && (
              <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 dark:bg-red-200 text-zinc-700">
                {signUpError.message}
              </p>
            )}
            {validationError && (
              <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 dark:bg-red-200 text-zinc-700">
                {validationError}
              </p>
            )}
            <label htmlFor="email" className="pt-5">
              {t('signup.email')}
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <label htmlFor="password" className="pt-5">
              {t('signup.password')}
            </label>
            <PasswordInput
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <label htmlFor="confirmPassword" className="pt-5">
              {t('signup.confirm')}
            </label>
            <PasswordInput
              onChange={handleChange}
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="py-2 mt-8 font-bold transition rounded-md bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
              {t('signup.submit')}
            </button>
          </form>
          <SocialLogin />
        </div>
        <p className="mt-5 text-center">
          {t('signup.already')}
          <Link to="/login">
            <span className="ml-1 font-bold cursor-pointer text-cyan-700 dark:text-cyan-500">
              {t('signup.login')}
            </span>
          </Link>
        </p>
      </main>
    </>
  )
}
