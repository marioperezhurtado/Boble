import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

import { User } from '@supabase/supabase-js'

interface Props {
  children: React.ReactNode
}

interface AuthContext {
  currentUser: User | undefined
  signInWithGoogle: () => Promise<void>
}

const initialCtx: AuthContext = {
  currentUser: undefined,
  signInWithGoogle: async () => await Promise.resolve()
}

const AuthCtx = createContext<AuthContext>(initialCtx)

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    if (error !== null) throw Error('Failed to sign in with Google')
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setCurrentUser(session?.user)
        setLoading(false)
      })
      .catch(() => {})

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const authValues = {
    currentUser,
    signInWithGoogle
  }

  return (
    <AuthCtx.Provider value={authValues}>
      {!loading && children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
