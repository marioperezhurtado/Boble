import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Participant from './Participant'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/participants')

describe('Participant', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { removeParticipant }: { removeParticipant: any } = await import(
    '@/services/participants'
  )

  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Renders creator with a crown icon', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participant
          participant={{
            group_id: '123',
            user_id: {
              id: '1',
              full_name: 'John Doe',
              avatar_url: 'avatar.png',
              email: 'mail@test.com'
            }
          }}
          creatorId="1"
        />
      </QueryClientProvider>
    )

    expect(screen.getByAltText('John Doe avatar')).toBeTruthy()
    expect(screen.getByAltText('creator')).toBeTruthy()
  })

  test('Renders normal participant with action button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participant
          participant={{
            group_id: '123',
            user_id: {
              id: '2',
              full_name: 'Mary Doe',
              avatar_url: 'avatar.png',
              email: 'mail@test.com'
            }
          }}
          creatorId="1"
        />
      </QueryClientProvider>
    )

    expect(screen.getByAltText('Mary Doe avatar')).toBeTruthy()
    expect(screen.getByTitle('Actions')).toBeTruthy()
  })

  test('Opens actions menu, confirmation modal and removes participant', async () => {
    const actionsButton = screen.getByTitle('Actions')
    fireEvent.click(actionsButton)

    const removeButton = screen.getByText('group-participants.remove')
    fireEvent.click(removeButton)

    const confirmButton = screen.getByText('remove-participant.remove')
    fireEvent.click(confirmButton)

    await waitFor(() => expect(removeParticipant).toHaveBeenCalled())
  })
})
