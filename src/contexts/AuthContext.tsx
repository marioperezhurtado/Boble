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
  signIn: (params: SignInParams) => Promise<void>
  signInGoogle: () => Promise<void>
  signInGithub: () => Promise<void>
}

const initialAuthCtx = {
  currentUser: null,
  signIn: async () => {},
  signInGoogle: async () => {},
  signInGithub: async () => {}
}

const AuthCtx = createContext<AuthContext>(initialAuthCtx)

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signIn = async ({ email, password }: SignInParams) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw Error('Failed to sign in')
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
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const authValues = {
    currentUser,
    signIn,
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
