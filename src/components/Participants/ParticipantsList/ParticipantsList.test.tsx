import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ParticipantsList from './ParticipantsList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

vi.mock('@/services/participants')

describe('ParticipantsList', async () => {
  const { getParticipants }: { getParticipants: any } = await import(
    '@/services/participants'
  )

  test('Renders a loading spinner while fetching participants', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ParticipantsList groupId="123" creatorId="456" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  test('Renders an error message if fetching participants fails', async () => {
    getParticipants.mockRejectedValueOnce(new Error())
    render(
      <QueryClientProvider client={queryClient}>
        <ParticipantsList groupId="123" creatorId="456" />
      </QueryClientProvider>
    )
    await waitFor(() =>
      expect(screen.getAllByText('group-participants.error')).toHaveLength(2)
    )
  })

  test('Renders the creator first and the other participants', async () => {
    getParticipants.mockResolvedValueOnce([
      {
        user_id: {
          id: '456',
          full_name: 'John Doe'
        }
      },
      {
        user_id: {
          id: '789',
          full_name: 'Mary Doe'
        }
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <ParticipantsList groupId="123" creatorId="456" />
      </QueryClientProvider>
    )

    const list = await screen.findByRole('list')
    expect(list.children).toHaveLength(2)
    expect(list.children[0].textContent).toBe('J')
    expect(list.children[1].textContent).toBe('M')
  })
})
