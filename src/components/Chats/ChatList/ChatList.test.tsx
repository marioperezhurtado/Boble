import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChatList from './ChatList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/chats')

interface UseChannels {
  getChats: any
  chatsListener: any
}

describe('ChatList', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { getChats, chatsListener }: UseChannels = await import(
    '@/services/chats'
  )
  useAuth.mockReturnValue({ currentUser: { id: '1' } })
  chatsListener.mockReturnValue({})

  test('Shows loading spinner while fetching chats', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    expect(screen.getByRole('status')).toBeTruthy()
  })

  test('Renders a list of chats with the user info', async () => {
    getChats.mockReturnValueOnce([
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
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test user 1')).toBeTruthy()
      expect(screen.getByText('Test user 2')).toBeTruthy()
      expect(screen.queryByText('Current user')).toBeNull()
    })
  })

  test("Shows error if there's an error fetching chats", async () => {
    getChats.mockRejectedValueOnce(new Error('chats.errors.get'))

    render(
      <QueryClientProvider client={queryClient}>
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('chats.errors.get')).toBeTruthy()
  })

  test("Shows message if there's no chats", async () => {
    getChats.mockReturnValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('chats.empty.title')).toBeTruthy()
  })

  test("Gets chats from current user's id", () => {
    expect(getChats).toHaveBeenCalledWith({ userId: '1' })
  })

  test("Does not get chats if there's no current user", () => {
    useAuth.mockReturnValue({ currentUser: null })
    render(
      <QueryClientProvider client={queryClient}>
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    expect(getChats).toHaveBeenCalledWith({ userId: '' })
  })

  test('Searchs for chats and renders the matches', async () => {
    getChats.mockReturnValueOnce([
      {
        id: '999',
        created_at: '2023-01-06T13:07:48.16155+00:00',
        user1: {
          id: '1',
          full_name: 'Full name match',
          avatar_url: '',
          email: 'email@test.com'
        },
        user2: {
          id: '2',
          full_name: null,
          avatar_url: '',
          email: 'mail@match.com'
        }
      },
      {
        id: '999',
        created_at: '2023-01-06T13:07:48.16155+00:00',
        user1: {
          id: '1',
          full_name: null,
          avatar_url: '',
          email: 'mail@match.com'
        },
        user2: {
          id: '2',
          full_name: 'Test user 2',
          avatar_url: '',
          email: ''
        }
      },
      {
        id: '999',
        created_at: '2023-01-06T13:07:48.16155+00:00',
        user1: {
          id: '1',
          full_name: 'No match',
          avatar_url: '',
          email: ''
        },
        user2: {
          id: '2',
          full_name: 'No match',
          avatar_url: '',
          email: ''
        }
      }
    ])
    render(
      <QueryClientProvider client={queryClient}>
        <ChatList chatId="999" />
      </QueryClientProvider>
    )

    const input = await screen.findByPlaceholderText('chats.search.placeholder')
    fireEvent.change(input, { target: { value: 'Full name match' } })

    expect(screen.getAllByText('Full name match')).toHaveLength(1)

    fireEvent.change(input, { target: { value: 'mail@match.com' } })

    expect(screen.getAllByText('mail@match.com')).toBeTruthy()

    fireEvent.change(input, { target: { value: 'safkdfkasjjkasd' } })
    expect(screen.getByText('chats.search.no-results')).toBeTruthy()
  })
})
