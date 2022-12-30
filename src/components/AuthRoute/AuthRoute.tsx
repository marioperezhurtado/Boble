import { Redirect } from 'wouter'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { currentUser } = useAuth()

  if (currentUser) return <Redirect to="/chat" />

  return <>{children}</>
}
