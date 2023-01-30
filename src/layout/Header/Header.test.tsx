import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from './Header'

vi.mock('@/contexts/AuthContext')

describe('Header', async () => {
  const queryClient = new QueryClient()
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  useAuth.mockReturnValue({ currentUser: false, signOut: () => {} })

  test('Only shows title if user is not logged in', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    )

    expect(screen.getByText('BOBLE')).toBeTruthy()
    expect(screen.queryByText('Logout')).toBeNull()
    expect(screen.queryByText('mail@test.com')).toBeNull()
  })

  test('Shows mail and logout button if user is logged in', () => {
    useAuth.mockReturnValueOnce({ currentUser: { email: 'mail@test.com' } })

    render(
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    )

    expect(screen.getByAltText('logout')).toBeTruthy()
    expect(screen.getByText('mail@test.com')).toBeTruthy()
  })

  test('Logs out on click', async () => {
    const signOut = vi.fn()
    useAuth.mockReturnValueOnce({ currentUser: {}, signOut })

    render(
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    )

    screen.getAllByAltText('logout')[1].click()

    await waitFor(() => expect(signOut).toHaveBeenCalled())
  })
})
