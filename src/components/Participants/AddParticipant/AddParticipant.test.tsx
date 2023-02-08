import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AddParticipant from './AddParticipant'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/services/participants')

describe('AddParticipant', async () => {
  const { addParticipant }: { addParticipant: any } = await import(
    '@/services/participants'
  )

  test('Renders add participant form', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddParticipant groupId="1" />
      </QueryClientProvider>
    )

    expect(
      screen.getByPlaceholderText('add-participant.placeholder')
    ).toBeTruthy()
    expect(screen.getByText('add-participant.title')).toBeTruthy()
  })

  test('Removes participant and shows success message', async () => {
    const input = screen.getByPlaceholderText('add-participant.placeholder')
    fireEvent.change(input, { target: { value: '123' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(addParticipant).toBeCalledWith({
        groupId: '1',
        userId: '123'
      })
    })

    await waitFor(() => {
      expect(screen.getByText('add-participant.success')).toBeTruthy()
    })
  })

  test('Renders error message if adding participant fails', async () => {
    addParticipant.mockRejectedValueOnce(new Error())

    render(
      <QueryClientProvider client={queryClient}>
        <AddParticipant groupId="1" />
      </QueryClientProvider>
    )

    const input = screen.getAllByPlaceholderText(
      'add-participant.placeholder'
    )[1]
    fireEvent.change(input, { target: { value: '123' } })

    const form = screen.getAllByRole('form')[1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText('add-participant.error')).toBeTruthy()
    })
  })

  test('Does not add participant if input is empty', async () => {
    expect(addParticipant).toHaveBeenCalledTimes(2)

    const input = screen.getAllByPlaceholderText(
      'add-participant.placeholder'
    )[1]
    fireEvent.change(input, { target: { value: '' } })

    const form = screen.getAllByRole('form')[1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(addParticipant).toHaveBeenCalledTimes(2)
    })
  })
})
