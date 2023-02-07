import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChangeGroupAvatar from './ChangeGroupAvatar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('@/services/avatar')
vi.mock('@/contexts/AuthContext')

describe('ChangeUserAvatar', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { uploadGroupAvatar }: { uploadGroupAvatar: any } = await import(
    '@/services/avatar'
  )
  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Shows group img', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChangeGroupAvatar
          group={{
            id: '1',
            avatar_url: 'https://test.com',
            name: 'Test Group',
            creator_id: '1',
            created_at: null
          }}
        />
      </QueryClientProvider>
    )

    const avatar = await screen.findByAltText<HTMLImageElement>(
      'Test Group avatar'
    )
    expect(avatar).toBeTruthy()
    expect(avatar.src).toBe('https://test.com')
  })

  test('Renders normal avatar if user is not creator', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChangeGroupAvatar
          group={{
            id: '1',
            avatar_url: 'https://test.com',
            name: 'Not creator',
            creator_id: '2',
            created_at: null
          }}
        />
      </QueryClientProvider>
    )

    expect(screen.queryByLabelText('Not creator avatar')).toBeNull()
  })

  test('Does not change avatar if there is no file', async () => {
    const input = await screen.findByLabelText('Upload avatar')

    fireEvent.change(input, {
      target: {
        files: null
      }
    })

    await waitFor(() => expect(uploadGroupAvatar).not.toHaveBeenCalled())
  })

  test('Changes avatar with group id and input file', async () => {
    const input = await screen.findByLabelText('Upload avatar')

    fireEvent.change(input, {
      target: {
        files: ['Test Image']
      }
    })

    await waitFor(() =>
      expect(uploadGroupAvatar).toHaveBeenCalledWith({
        groupId: '1',
        avatar: 'Test Image'
      })
    )
  })
})
