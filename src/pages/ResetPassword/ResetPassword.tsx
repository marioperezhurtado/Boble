import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'

import Header from '../../layout/Header/Header'

const initialState = {
  password: '',
  passwordRepeat: ''
}

export default function ForgotPassword() {
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
      setValidationError('There are empty fields')
      return
    }
    if (password !== passwordRepeat) {
      setValidationError('Passwords do not match')
      return
    }
    handleChangePassword(password)
  }

  const resetError = error as Error

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-20 bg-zinc-100 md:py-32">
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md ">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          {isSuccess && (
            <p className="p-1.5 pl-3 mt-5 bg-green-100 border-l-4 border-green-600">
              Your password has been reset succesfully.
            </p>
          )}
          {resetError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
              {resetError.message}
            </p>
          )}
          {validationError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
              {validationError}
            </p>
          )}
          <p className="mt-5">Security recomendations:</p>
          <ul className="flex flex-col gap-1 pl-5 mt-2 list-disc">
            <li>At least 8 characters long (12+ recommended)</li>
            <li>
              Contains uppercase and lowercase letters, numbers and special
              characters
            </li>
            <li>
              Does not match or contain your name, email address, username or
              other personal information
            </li>
          </ul>
          <form onSubmit={handleSubmit} name="resetPasswordForm">
            <div className="mt-5 flex flex-col gap-.5">
              <label htmlFor="password" className="font-bold">
                New password
              </label>
              <input
                value={formState.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="px-2 py-1 border rounded-md"
              />
            </div>
            <div className="mt-5 flex flex-col gap-.5">
              <label htmlFor="passwordRepeat" className="font-bold">
                Confirm password
              </label>
              <input
                value={formState.passwordRepeat}
                onChange={handleChange}
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                className="px-2 py-1 border rounded-md"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-2 mt-8 font-bold rounded-md bg-cyan-700 text-cyan-50">
              Reset Password
            </button>
          </form>
        </div>
        <Link to="/chat">
          <p className="mx-auto mt-5 font-bold text-center cursor-pointer text-cyan-700 w-fit">
            Start chatting
          </p>
        </Link>
      </main>
    </>
  )
}
