import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CreateChat from './CreateChat'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/chats')

describe('CreateChat', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { createChat }: { createChat: any } = await import('@/services/chats')

  useAuth.mockReturnValue({ currentUser: { id: '123' } })

  test('Doesnt submit if friend code is empty', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateChat />
      </QueryClientProvider>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => expect(createChat).not.toHaveBeenCalled())
  })

  test('Creates chat with current user id', async () => {
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '456' } })
    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() =>
      expect(createChat).toHaveBeenCalledWith({
        userId: '123',
        friendId: '456'
      })
    )
  })

  test('Shows error if create chat fails', async () => {
    createChat.mockRejectedValueOnce(new Error('chats.errors.create'))

    render(
      <QueryClientProvider client={queryClient}>
        <CreateChat />
      </QueryClientProvider>
    )

    const input = screen.getAllByRole('textbox')[0]
    fireEvent.change(input, { target: { value: '456' } })
    const form = screen.getAllByRole('form')[0]
    fireEvent.submit(form)

    await waitFor(() =>
      expect(screen.getByText('chats.errors.create')).toBeTruthy()
    )
  })

  test('Copies user id to clipboard and shows message', async () => {
    const copyToClipboard = vi.fn()
    Object.assign(navigator, { clipboard: { writeText: copyToClipboard } })

    render(
      <QueryClientProvider client={queryClient}>
        <CreateChat />
      </QueryClientProvider>
    )

    const inviteButton = screen.getAllByLabelText('Copy your invite code')[0]
    fireEvent.click(inviteButton)

    await waitFor(() => expect(copyToClipboard).toHaveBeenCalledWith('123'))
    await waitFor(() =>
      expect(screen.getByText('create-chat.clipboard-success')).toBeTruthy()
    )

    vi.useFakeTimers()
    vi.runAllTimers()

    await waitFor(() =>
      expect(screen.queryByText('create-chat.clipboard-success')).toBeNull()
    )

    vi.useRealTimers()
  })
})
