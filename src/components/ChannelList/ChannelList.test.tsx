import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChannelList from './ChannelList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('../../contexts/AuthContext')
vi.mock('../../hooks/useChannels')

interface UseChannels {
  getChannels: any
  channelsListener: any
}

describe('ChannelList', async () => {
  const { useAuth }: { useAuth: any } = await import(
    '../../contexts/AuthContext'
  )
  const { getChannels, channelsListener }: UseChannels = await import(
    '../../hooks/useChannels'
  )
  useAuth.mockReturnValue({ currentUser: { id: '1' } })
  channelsListener.mockReturnValue({})

  test('Shows loading spinner while fetching channels', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelList channelId="999" />
      </QueryClientProvider>
    )

    expect(screen.getByRole('status')).toBeTruthy()
  })

  test('Renders a list of channels with the other user info', async () => {
    getChannels.mockReturnValueOnce([
      {
        id: '999',
        created_at: '2023-01-06T13:07:48.16155+00:00',
        user1: {
          id: '1',
          full_name: 'Current user',
          avatar_url: '',
          email: 'email@test.com'
        },
        user2: {
          id: '2',
          full_name: 'Test user 1',
          avatar_url: '',
          email: 'test@email.com'
        }
      },
      {
        id: '345',
        created_at: '2023-01-06T13:07:48.16155+00:00',
        user1: {
          id: '2',
          full_name: 'Test user 2',
          avatar_url: '',
          email: 'email@test.com'
        },
        user2: {
          id: '1',
          full_name: 'Current user',
          avatar_url: '',
          email: 'test@email.com'
        }
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <ChannelList channelId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findAllByText('Test user 1')).toBeTruthy()
    expect(await screen.findAllByText('Test user 2')).toBeTruthy()
    expect(await screen.queryByText('Current user')).toBeNull()
  })

  test("Shows error if there's an error fetching channels", async () => {
    getChannels.mockRejectedValueOnce(new Error('channels.errors.get'))

    render(
      <QueryClientProvider client={queryClient}>
        <ChannelList channelId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('channels.errors.get')).toBeTruthy()
  })

  test("Shows message if there's no channels", async () => {
    getChannels.mockReturnValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <ChannelList channelId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('channels.empty.title')).toBeTruthy()
  })
})
