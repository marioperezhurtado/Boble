import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

import { User } from '@supabase/supabase-js'

interface Props {
  children: React.ReactNode
}

interface SignInParams {
  email: string
  password: string
}

interface AuthContext {
  currentUser: User | null
  signUp: (params: SignInParams) => Promise<void>
  signIn: (params: SignInParams) => Promise<void>
  signOut: () => Promise<void>
  signInGoogle: () => Promise<void>
  signInGithub: () => Promise<void>
}

const initialAuthCtx = {
  currentUser: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  signInGoogle: async () => {},
  signInGithub: async () => {}
}

const AuthCtx = createContext<AuthContext>(initialAuthCtx)

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = async ({ email, password }: SignInParams) => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw Error('Failed to create an account')
  }

  const signIn = async ({ email, password }: SignInParams) => {
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
    signInGithub
  }

  return (
    <AuthCtx.Provider value={authValues}>
      {!loading && children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
