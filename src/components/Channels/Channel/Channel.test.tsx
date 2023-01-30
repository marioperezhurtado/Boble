import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Channel from './Channel'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('@/services/messages')

interface UseMessages {
  getChatMessages: any
  chatMessagesListener: any
}

describe('Chat', async () => {
  const { getChatMessages, chatMessagesListener }: UseMessages = await import(
    '@/services/messages'
  )
  chatMessagesListener.mockReturnValue({})

  test("Shows a message if there's no channel selected", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Channel channelId="" type="chat" />
      </QueryClientProvider>
    )

    expect(screen.getByText('chat.select-channel.title')).toBeTruthy()
  })

  test('Shows loading spinner while fetching messages', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Channel channelId="999" type="chat" />
      </QueryClientProvider>
    )

    expect(screen.getByRole('status')).toBeTruthy()
  })

  test("Shows error if there's an error fetching messages", async () => {
    getChatMessages.mockRejectedValueOnce(new Error('messages.errors.get'))

    render(
      <QueryClientProvider client={queryClient}>
        <Channel channelId="999" type="chat" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('messages.errors.get')).toBeTruthy()
  })

  test("Shows message if there's no messages in the channel", async () => {
    getChatMessages.mockReturnValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <Channel channelId="999" type="chat" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('chat.empty.title')).toBeTruthy()
  })

  test('Renders a list of messages', async () => {
    getChatMessages.mockReturnValueOnce([
      {
        id: '1',
        created_at: '123',
        private_channel_id: '999',
        sender_id: '1',
        text: 'Test message 1'
      },
      {
        id: '1',
        created_at: '345',
        private_channel_id: '999',
        sender_id: '2',
        text: 'Test message 2'
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <Channel channelId="999" type="chat" />
      </QueryClientProvider>
    )

    expect(await screen.findAllByText('Test message 1')).toBeTruthy()
    expect(await screen.findAllByText('Test message 2')).toBeTruthy()
  })
})
