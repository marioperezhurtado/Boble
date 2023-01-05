import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'

import Header from '../../layout/Header/Header'

export default function ForgotPassword() {
  const { sendResetPasswordEmail } = useAuth()
  const [validationError, setValidationError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    mutate: handleSendResetPasswordEmail,
    isLoading,
    error,
    isSuccess
  } = useMutation({
    mutationFn: async (email: string) =>
      await sendResetPasswordEmail({ email }),
    onSuccess: () => formRef.current?.reset()
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError(null)
    const email = formRef.current?.email.value

    if (!email) {
      setValidationError('Please enter your email address')
      return
    }
    handleSendResetPasswordEmail(email)
  }

  const resetError = error as Error

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-20 bg-zinc-100 md:py-32">
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md ">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          {isSuccess && (
            <p className="p-1.5 pl-3 mt-5 bg-green-100 border-l-4 border-green-600">
              Please check your email to reset your password.
            </p>
          )}
          {!validationError && resetError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
              {resetError.message}
            </p>
          )}
          {validationError && (
            <p className="p-1.5 pl-3 mt-5 bg-red-100 border-l-4 border-red-600">
              {validationError}
            </p>
          )}
          <p className="mt-5">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mt-5 flex flex-col gap-.5">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="px-2 py-1 border rounded-md"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-2 mt-8 font-bold rounded-md bg-cyan-700 text-cyan-50">
              Send Reset Email
            </button>
          </form>
        </div>
        <Link to="/login">
          <p className="mx-auto mt-5 font-bold text-center cursor-pointer text-cyan-700 w-fit">
            Back to login
          </p>
        </Link>
      </main>
    </>
  )
}
