import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from 'react-i18next'

import Header from '@/layout/Header/Header'
import PasswordInput from '@/layout/PasswordInput/PasswordInput'

const initialState = {
  password: '',
  passwordRepeat: ''
}

export default function ForgotPassword() {
  const { t } = useTranslation('global')
  const { changePassword } = useAuth()
  const [formState, setFormState] = useState(initialState)
  const [validationError, setValidationError] = useState<string | null>(null)

  const {
    mutate: handleChangePassword,
    isLoading,
    error,
    isSuccess
  } = useMutation({
    mutationFn: async (password: string) => await changePassword({ password }),
    onSuccess: () => setFormState(initialState)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError(null)
    const { password, passwordRepeat } = formState

    if (!password || !passwordRepeat) {
      setValidationError(t('validation.empty-error'))
      return
    }
    if (password !== passwordRepeat) {
      setValidationError(t('validation.password-match-error'))
      return
    }
    handleChangePassword(password)
  }

  const resetError = error as Error

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-20 bg-zinc-100 md:py-32 dark:bg-zinc-800">
        <div className="w-full max-w-md p-6 mx-auto bg-white border rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
          <h1 className="text-2xl font-bold">{t('change-password.title')}</h1>
          {isSuccess && (
            <p className="p-1.5 pl-3 mt-5 bg-green-100 border-l-4 border-green-600 text-zinc-700 dark:bg-green-200">
              {t('change-password.success')}
            </p>
          )}
          {resetError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
              {t('change-password.error')}
            </p>
          )}
          {validationError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
              {validationError}
            </p>
          )}
          <p className="mt-5">{t('change-password.security.title')}</p>
          <ul className="flex flex-col gap-1 pl-5 mt-2 list-disc">
            <li>{t('change-password.security.1')}</li>
            <li>{t('change-password.security.2')}</li>
            <li>{t('change-password.security.3')}</li>
          </ul>
          <form onSubmit={handleSubmit} name="resetPasswordForm">
            <div className="mt-5 flex flex-col gap-.5">
              <label htmlFor="password" className="font-bold">
                {t('change-password.password')}
              </label>
              <PasswordInput
                value={formState.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="px-2 py-1 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
              />
            </div>
            <div className="mt-5 flex flex-col gap-.5">
              <label htmlFor="passwordRepeat" className="font-bold">
                {t('change-password.confirm')}
              </label>
              <PasswordInput
                value={formState.passwordRepeat}
                onChange={handleChange}
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                className="px-2 py-1 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-2 mt-8 font-bold transition rounded-md bg-cyan-700 text-cyan-50 hover:bg-cyan-600">
              {t('change-password.submit')}
            </button>
          </form>
        </div>
        <Link to="/chat">
          <p className="mx-auto mt-5 font-bold text-center cursor-pointer text-cyan-700 w-fit dark:text-cyan-500">
            {t('change-password.start')}
          </p>
        </Link>
      </main>
    </>
  )
}
