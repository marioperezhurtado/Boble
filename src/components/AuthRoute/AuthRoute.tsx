import { Redirect } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  children: React.ReactNode
  redirectTo?: string
}

export default function AuthRoute({ children, redirectTo }: Props) {
  const { currentUser } = useAuth()

  const url = redirectTo ? `/${redirectTo}` : '/chat'

  if (currentUser) return <Redirect to={url} />

  return <>{children}</>
}
