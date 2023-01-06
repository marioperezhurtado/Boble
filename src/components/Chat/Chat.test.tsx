import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Chat from './Chat'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('../../hooks/useMessages')

interface UseMessages {
  getMessages: any
  messagesListener: any
}

describe('ChannelList', async () => {
  const { getMessages, messagesListener }: UseMessages = await import(
    '../../hooks/useMessages'
  )
  messagesListener.mockReturnValue({})

  test("Shows a message if there's no channel selected", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Chat channelId="" />
      </QueryClientProvider>
    )

    expect(screen.getByText('Select a channel to start chatting')).toBeTruthy()
  })

  test('Shows loading spinner while fetching messages', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Chat channelId="999" />
      </QueryClientProvider>
    )

    expect(screen.getByRole('status')).toBeTruthy()
  })

  test("Shows error if there's an error fetching messages", async () => {
    getMessages.mockRejectedValueOnce(new Error('Failed to get messages'))

    render(
      <QueryClientProvider client={queryClient}>
        <Chat channelId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findByText('Failed to get messages')).toBeTruthy()
  })

  test("Shows message if there's no messages in the channel", async () => {
    getMessages.mockReturnValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <Chat channelId="999" />
      </QueryClientProvider>
    )

    expect(
      await screen.findByText(
        'Start the conversation to see your messages here.'
      )
    ).toBeTruthy()
  })

  test('Renders a list of messages', async () => {
    getMessages.mockReturnValueOnce([
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
        <Chat channelId="999" />
      </QueryClientProvider>
    )

    expect(await screen.findAllByText('Test message 1')).toBeTruthy()
    expect(await screen.findAllByText('Test message 2')).toBeTruthy()
  })
})
