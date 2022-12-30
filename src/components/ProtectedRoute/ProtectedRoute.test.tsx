import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import ProtectedRoute from './ProtectedRoute'

vi.mock('../../contexts/AuthContext')

// Prevent access to protected routes if user is not logged

describe('ProtectedRoute', () => {
  test('Renders children if user IS logged', async () => {
    const { useAuth }: { useAuth: any } = await import(
      '../../contexts/AuthContext'
    )

    useAuth.mockReturnValueOnce({ currentUser: true })

    render(<ProtectedRoute>Logged</ProtectedRoute>)
    expect(screen.getByText('Logged')).toBeTruthy()
  })

  test('Redirects to login if user is NOT logged', async () => {
    const { useAuth }: { useAuth: any } = await import(
      '../../contexts/AuthContext'
    )

    useAuth.mockReturnValueOnce({ currentUser: false })

    render(<ProtectedRoute>Not logged</ProtectedRoute>)
    expect(screen.queryByText('Not logged')).toBeNull()
  })
})
