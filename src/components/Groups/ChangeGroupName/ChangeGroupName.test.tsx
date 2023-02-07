import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChangeGroupName from './ChangeGroupName'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/groups')

describe('ChangeGroupName', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { updateGroup }: { updateGroup: any } = await import(
    '@/services/groups'
  )

  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Renders group name', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChangeGroupName
          group={{
            id: '1',
            name: 'Group Name',
            created_at: '999',
            creator_id: '1',
            avatar_url: 'https://example.com'
          }}
        />
      </QueryClientProvider>
    )

    expect(screen.getByText('Group Name')).toBeTruthy()
  })

  test('Renders edit button if user is creator', () => {
    expect(screen.getByRole('button')).toBeTruthy()
  })

  test('Shows a input with the group name when is editing', () => {
    expect(screen.queryByRole('form')).toBeNull()
    expect(screen.queryByRole('textbox')).toBeNull()

    const editButton = screen.getByRole('button')
    fireEvent.click(editButton)

    expect(screen.getByRole('form')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
  })

  test("Changes the group's name and closes", async () => {
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Group Name' } })

    expect(screen.getByDisplayValue('New Group Name')).toBeTruthy()

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() =>
      expect(updateGroup).toHaveBeenCalledWith({
        groupId: '1',
        name: 'New Group Name'
      })
    )

    expect(screen.queryByRole('form')).toBeNull()
  })
})
