import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

import { User } from '@supabase/supabase-js'

interface Props {
  children: React.ReactNode
}

interface SignIn {
  email: string
  password: string
}

interface SendResetPasswordEmail {
  email: string
}

interface ChangePassword {
  password: string
}

interface AuthContext {
  currentUser: User | null
  signUp: (params: SignIn) => Promise<void>
  signIn: (params: SignIn) => Promise<void>
  signOut: () => Promise<void>
  signInGoogle: () => Promise<void>
  signInGithub: () => Promise<void>
  sendResetPasswordEmail: (params: SendResetPasswordEmail) => Promise<void>
  changePassword: (params: ChangePassword) => Promise<void>
}

const initialAuthCtx = {
  currentUser: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  signInGoogle: async () => {},
  signInGithub: async () => {},
  sendResetPasswordEmail: async () => {},
  changePassword: async () => {}
}

const AuthCtx = createContext<AuthContext>(initialAuthCtx)

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = async ({ email, password }: SignIn) => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw Error('Failed to create an account')
  }

  const signIn = async ({ email, password }: SignIn) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw Error('Failed to sign in')
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw Error('Failed to sign out')
  }

  const signInGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw Error('Failed to sign in with Google')
  }

  const signInGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) throw Error('Failed to sign in with Github')
  }

  const sendResetPasswordEmail = async ({ email }: SendResetPasswordEmail) => {
    const appUrl = import.meta.env.VITE_APP_URL
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}/reset-password`
    })
    if (error) throw Error('Failed to send password recovery email')
  }

  const changePassword = async ({ password }: ChangePassword) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw Error('Failed to change password')
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session?.user !== undefined) {
          setCurrentUser(session?.user)
        }
        setLoading(false)
      })
      .catch(() => {})

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user !== undefined) {
        setCurrentUser(session?.user)
        return
      }
      setCurrentUser(null)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const authValues = {
    currentUser,
    signUp,
    signIn,
    signOut,
    signInGoogle,
    signInGithub,
    sendResetPasswordEmail,
    changePassword
  }

  return (
    <AuthCtx.Provider value={authValues}>
      {!loading && children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
