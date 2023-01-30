import { Redirect } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  children: React.ReactNode
  redirectTo?: string
}

// Redirect to other route if user is logged in

export default function AuthRoute({ children, redirectTo }: Props) {
  const { currentUser } = useAuth()

  const url = redirectTo ? `/${redirectTo}` : '/chat'

  if (currentUser) return <Redirect to={url} />

  return <>{children}</>
}
