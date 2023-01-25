import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChangeAvatar from './ChangeAvatar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('../../hooks/useProfile')
vi.mock('../../hooks/useAvatar')
vi.mock('../../contexts/AuthContext')

describe('ChangeAvatar', async () => {
  const { getProfile }: { getProfile: any } = await import(
    '../../hooks/useProfile'
  )
  const { useAuth }: { useAuth: any } = await import(
    '../../contexts/AuthContext'
  )
  const { uploadAvatar }: { uploadAvatar: any } = await import(
    '../../hooks/useAvatar'
  )

  getProfile.mockResolvedValue({
    id: '1',
    email: 'mail@test.com',
    avatar_url: 'https://test.com',
    full_name: 'Test User'
  })
  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  vi.setSystemTime(123)

  test('Shows email and profile img with date', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChangeAvatar />
      </QueryClientProvider>
    )

    expect(await screen.findByText('mail@test.com')).toBeTruthy()
    const avatar = await screen.findByAltText<HTMLImageElement>(
      'Test User avatar'
    )
    expect(avatar).toBeTruthy()
    expect(avatar.src).toBe('https://test.com?123')
  })

  test('does not change avatar if there is no file', async () => {
    const input = await screen.findByLabelText('Upload avatar')

    fireEvent.change(input, {
      target: {
        files: null
      }
    })

    expect(uploadAvatar).not.toHaveBeenCalled()
  })

  test('Changes avatar with current user id and input file', async () => {
    const input = await screen.findByLabelText('Upload avatar')

    fireEvent.change(input, {
      target: {
        files: ['Test Image']
      }
    })

    expect(uploadAvatar).toHaveBeenCalledWith({
      id: '1',
      avatar: 'Test Image'
    })
  })
})
