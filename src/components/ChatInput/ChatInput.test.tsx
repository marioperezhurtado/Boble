import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChatInput from './ChatInput'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('../../contexts/AuthContext')
vi.mock('../../hooks/useMessages')

describe('ChatInput', async () => {
  const { useAuth }: { useAuth: any } = await import(
    '../../contexts/AuthContext'
  )
  const { sendMessage }: { sendMessage: any } = await import(
    '../../hooks/useMessages'
  )
  useAuth.mockReturnValue({ currentUser: { id: '1' } })

  test('Does not send message if text is empty', async () => {
    sendMessage.mockResolvedValue({})

    render(
      <QueryClientProvider client={queryClient}>
        <ChatInput channelId="1" />
      </QueryClientProvider>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => expect(sendMessage).not.toHaveBeenCalled())
  })

  test('Sends message and resets text', async () => {
    sendMessage.mockResolvedValue({})

    const form = screen.getByRole('form')
    const input = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.submit(form)

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith({
        senderId: '1',
        channelId: '1',
        text: 'Test message',
        mediaLink: null
      })
    )

    await waitFor(() => expect(input.value).toBe(''))
  })

  test('Sends message with empty sender if current user is not defined', async () => {
    useAuth.mockReturnValue({})
    sendMessage.mockResolvedValue({})

    const form = screen.getByRole('form')
    const input = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.change(input, { target: { value: 'Test message 2' } })
    fireEvent.submit(form)

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith({
        senderId: '',
        channelId: '1',
        text: 'Test message 2',
        mediaLink: null
      })
    )
  })
})
