import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CreateGroup from './CreateGroup'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/groups')

describe('CreateGroup', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { createGroup }: { createGroup: any } = await import(
    '@/services/groups'
  )

  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Renders create group form', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateGroup />
      </QueryClientProvider>
    )
    expect(screen.getByPlaceholderText('create-group.name')).toBeTruthy()
  })

  test("Doesn't create group if name is empty", async () => {
    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(createGroup).not.toHaveBeenCalled()
    })
  })

  test('Changes group name and creates group', async () => {
    const groupName = screen.getByPlaceholderText('create-group.name')

    fireEvent.change(groupName, { target: { value: 'Test Group' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(createGroup).toHaveBeenCalledWith({
        name: 'Test Group',
        creatorId: '1'
      })
    })
  })

  test('Shows error if creating group fails', async () => {
    createGroup.mockRejectedValueOnce(new Error('Error'))

    const groupName = screen.getByPlaceholderText('create-group.name')

    fireEvent.change(groupName, { target: { value: 'Test Group' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() =>
      expect(screen.getByText('groups.errors.create')).toBeTruthy()
    )
  })
})
