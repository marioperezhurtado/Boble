import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GroupList from './GroupList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

vi.mock('@/services/groups')

describe('GroupList', async () => {
  const { getGroups }: { getGroups: any } = await import('@/services/groups')

  test('Renders a load spinner while loading groups', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList groupId="123" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  test('Renders an error message if fetching groups fails', async () => {
    getGroups.mockRejectedValueOnce(new Error())
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList groupId="123" />
      </QueryClientProvider>
    )
    await waitFor(() =>
      expect(screen.getByText('groups.errors.get')).toBeTruthy()
    )
  })

  test('Renders a message if there are no groups', async () => {
    getGroups.mockResolvedValueOnce([])
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList groupId="123" />
      </QueryClientProvider>
    )
    await waitFor(() =>
      expect(screen.getByText('groups.empty.title')).toBeTruthy()
    )
  })

  test('Renders a list of groups that match the search input', async () => {
    getGroups.mockResolvedValueOnce([
      {
        id: '123',
        name: 'Group 1'
      },
      {
        id: '456',
        name: 'Group 2'
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <GroupList groupId="123" />
      </QueryClientProvider>
    )

    const input = await waitFor(() =>
      screen.getByPlaceholderText('groups.search.placeholder')
    )

    const list = screen.getAllByRole('list')[0]
    expect(list.children).toHaveLength(2)

    fireEvent.change(input, { target: { value: 'Group 1' } })

    expect(list.children).toHaveLength(1)
  })

  test('Shows a message if no groups match the search input', async () => {
    const input = screen.getAllByPlaceholderText('groups.search.placeholder')[0]

    fireEvent.change(input, { target: { value: 'Non matching search' } })

    expect(screen.getByText('groups.search.no-results')).toBeTruthy()
  })
})
