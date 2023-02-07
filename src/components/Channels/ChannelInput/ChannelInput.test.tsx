import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChatInput from './ChannelInput'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/messages')

describe('ChatInput', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { sendChatMessage }: { sendChatMessage: any } = await import(
    '@/services/messages'
  )
  useAuth.mockReturnValue({ currentUser: { id: '1' } })

  test('Does not send message if text is empty', async () => {
    sendChatMessage.mockResolvedValue({})

    render(
      <QueryClientProvider client={queryClient}>
        <ChatInput channelId="1" type="chat" />
      </QueryClientProvider>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => expect(sendChatMessage).not.toHaveBeenCalled())
  })

  test('Sends message and resets text', async () => {
    sendChatMessage.mockResolvedValue({})

    const form = screen.getByRole('form')
    const input = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.submit(form)

    await waitFor(() =>
      expect(sendChatMessage).toHaveBeenCalledWith({
        senderId: '1',
        channelId: '1',
        text: 'Test message',
        mediaLink: null,
        audioLink: null
      })
    )

    await waitFor(() => expect(input.value).toBe(''))
  })

  test('Sends message with empty sender if current user is not defined', async () => {
    useAuth.mockReturnValue({})
    sendChatMessage.mockResolvedValue({})

    const form = screen.getByRole('form')
    const input = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.change(input, { target: { value: 'Test message 2' } })
    fireEvent.submit(form)

    await waitFor(() =>
      expect(sendChatMessage).toHaveBeenCalledWith({
        senderId: '',
        channelId: '1',
        text: 'Test message 2',
        mediaLink: null,
        audioLink: null
      })
    )
  })

  test('Toggles gif modal on gif button click', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatInput channelId="1" type="chat" />
      </QueryClientProvider>
    )

    const gifButton = screen.getAllByRole('button')[0]
    fireEvent.click(gifButton)

    expect(screen.getByPlaceholderText('gifs.placeholder')).toBeTruthy()
  })

  test('Toggles audio record on audio button click', () => {
    const audioButton = screen.getAllByAltText('start recording')[1]
    fireEvent.click(audioButton)

    expect(screen.getByTitle('Start / stop recording')).toBeTruthy()
  })
})
