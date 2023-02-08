import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GroupInfo from './GroupInfo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/groups')

describe('GroupInfo', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { getGroup }: { getGroup: any } = await import('@/services/groups')

  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Shows loading spinner while group info is loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GroupInfo groupId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  test("Shows error if group doesn't exist", async () => {
    getGroup.mockRejectedValueOnce(new Error())

    render(
      <QueryClientProvider client={queryClient}>
        <GroupInfo groupId="1" />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('group-info.error')).toBeTruthy()
    })
  })

  test('Shows group info', async () => {
    getGroup.mockReturnValueOnce({
      created_at: '999',
      creator_id: '2',
      id: '123',
      name: 'Test Group',
      avatar_url: ''
    })

    render(
      <QueryClientProvider client={queryClient}>
        <GroupInfo groupId="1" />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByAltText('back')).toBeTruthy()
    })
  })

  test("Shows 'Add participant' button only if user is admin", async () => {
    expect(screen.queryByText('add-participant.title')).toBeNull()

    getGroup.mockReturnValueOnce({
      created_at: '999',
      creator_id: '1',
      id: '123',
      name: 'Test Group',
      avatar_url: ''
    })

    render(
      <QueryClientProvider client={queryClient}>
        <GroupInfo groupId="1" />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('add-participant.title')).toBeTruthy()
    })
  })
})
