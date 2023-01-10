import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'wouter'

import Header from '../../layout/Header/Header'
import SocialLogin from '../../components/SocialLogin/SocialLogin'
import ToggleDarkMode from '../../layout/ToggleDarkMode/ToggleDarkMode'

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
      setValidationError('There are empty fields')
      return
    }
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <form
            onSubmit={handleSubmit}
            name="signupForm"
            className="flex flex-col mt-2">
            {isSuccess && (
              <p className="p-1.5 pl-3 mt-5 bg-green-100 border-l-4 border-green-600">
                Please follow the link we have sent to your email to verify your
                account.
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
              Email
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
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="px-2 py-1.5 border rounded-md dark:bg-zinc-600 dark:border-zinc-500"
            />
            <label htmlFor="confirmPassword" className="pt-5">
              Confirm Password
            </label>
            <input
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
              className="py-2 mt-8 font-bold rounded-md bg-cyan-700 text-cyan-50">
              Create Account
            </button>
          </form>
          <SocialLogin />
        </div>
        <p className="mt-5 text-center">
          Already have an account?
          <Link to="/login">
            <span className="ml-1 font-bold cursor-pointer text-cyan-700 dark:text-cyan-500">
              Log In
            </span>
          </Link>
        </p>
        <div className="m-10 mx-auto w-fit md:mt-20">
          <ToggleDarkMode />
        </div>
      </main>
    </>
  )
}
