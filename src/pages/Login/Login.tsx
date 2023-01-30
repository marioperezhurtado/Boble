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
}

const initialState = {
  email: '',
  password: ''
}

export default function Login() {
  const { t } = useTranslation('global')
  const { signIn } = useAuth()
  const [formState, setFormState] = useState<FormState>(initialState)
  const [validationError, setValidationError] = useState<string | null>(null)
  const { email, password } = formState

  const { mutate: handleSignIn, isLoading, error } = useMutation(signIn)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError(null)

    if (!email || !password) {
      setValidationError(t('validation.empty-error'))
      return
    }

    handleSignIn({ email, password })
  }

  const signInError = error as Error

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-20 bg-zinc-100 md:py-32 dark:bg-zinc-800">
        <div className="w-full max-w-md p-6 mx-auto bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <h1 className="text-2xl font-bold">{t('login.title')}</h1>
          <form
            onSubmit={handleSubmit}
            name="loginForm"
            className="flex flex-col mt-2">
            {!validationError && signInError && (
              <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
                {signInError.message}
              </p>
            )}
            {validationError && (
              <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
                {validationError}
              </p>
            )}
            <label htmlFor="email" className="pt-5">
              {t('login.email')}
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="text"
              id="email"
              name="email"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <label htmlFor="password" className="pt-5">
              {t('login.password')}
            </label>
            <PasswordInput
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="py-2 mt-8 font-bold transition rounded-md bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
              {t('login.submit')}
            </button>
            {signInError && (
              <Link to="/forgot-password">
                <span className="mt-5 font-semibold text-center cursor-pointer text-cyan-700 dark:text-cyan-400">
                  {t('login.forgot')}
                </span>
              </Link>
            )}
            <SocialLogin />
          </form>
        </div>
        <p className="mt-5 text-center">
          {t('login.need')}
          <Link to="/signup">
            <span className="ml-1 font-bold cursor-pointer text-cyan-700 dark:text-cyan-500">
              {t('login.signup')}
            </span>
          </Link>
        </p>
      </main>
    </>
  )
}
