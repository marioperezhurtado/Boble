import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import SocialLogin from './SocialLogin'

const queryClient = new QueryClient()

vi.mock('@/contexts/AuthContext')

describe('SocialLogin', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  useAuth.mockReturnValue({ signInGoogle: () => {}, signInGithub: () => {} })

  test('Shows google login error', async () => {
    useAuth.mockReturnValueOnce({
      signInGoogle: () => {
        throw Error('Failed to sign in with Google')
      }
    })

    render(
      <QueryClientProvider client={queryClient}>
        <SocialLogin />
      </QueryClientProvider>
    )
    screen.getByAltText('Google Logo').click()
    await waitFor(() =>
      expect(screen.getByText('Failed to sign in with Google')).toBeTruthy()
    )
  })

  test('Shows github login error', async () => {
    useAuth.mockReturnValueOnce({
      signInGoogle: () => {},
      signInGithub: () => {
        throw Error('Failed to sign in with Github')
      }
    })

    render(
      <QueryClientProvider client={queryClient}>
        <SocialLogin />
      </QueryClientProvider>
    )
    screen.getAllByAltText('Google Logo')[1].click() // Reset google error
    screen.getAllByAltText('Github Logo')[1].click()
    await waitFor(() =>
      expect(screen.getByText('Failed to sign in with Github')).toBeTruthy()
    )
  })
})
