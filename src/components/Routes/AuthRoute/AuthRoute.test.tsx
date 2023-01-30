import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import AuthRoute from './AuthRoute'

vi.mock('@/contexts/AuthContext')

// Prevent access to authentication routes if user is already logged

describe('AuthRoute', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')

  test('Renders children if user is NOT logged', async () => {
    useAuth.mockReturnValueOnce({ currentUser: false })

    render(<AuthRoute>Not logged</AuthRoute>)
    expect(screen.getByText('Not logged')).toBeTruthy()
  })

  test('Redirects to home if user IS logged', async () => {
    useAuth.mockReturnValueOnce({ currentUser: true })

    render(<AuthRoute>Logged</AuthRoute>)
    expect(screen.queryByText('Logged')).toBeNull()
  })
})
