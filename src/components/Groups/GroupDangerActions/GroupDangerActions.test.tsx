import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GroupDangerActions from './GroupDangerActions'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')
vi.mock('@/services/participants')
vi.mock('@/services/groups')

describe('GroupDangerActions', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { removeParticipant }: { removeParticipant: any } = await import(
    '@/services/participants'
  )
  const { deleteGroup }: { deleteGroup: any } = await import(
    '@/services/groups'
  )

  useAuth.mockReturnValue({
    currentUser: {
      id: '1'
    }
  })

  test('Renders leave button if user is not creator', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GroupDangerActions groupId="1" creatorId="2" />
      </QueryClientProvider>
    )
    expect(screen.getByText('group-info.leave')).toBeTruthy()
    expect(screen.queryByText('group-info.delete')).toBeNull()
  })

  test('Renders leave and delete buttons if user is creator', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GroupDangerActions groupId="1" creatorId="1" />
      </QueryClientProvider>
    )
    expect(screen.getAllByText('group-info.leave')).toHaveLength(2)
    expect(screen.queryByText('group-info.delete')).toBeTruthy()
  })

  test('Opens leave modal and leaves group', async () => {
    const leaveButton = screen.getAllByText('group-info.leave')[1]
    fireEvent.click(leaveButton)

    const confirmLeaveButton = screen.getByText('group-actions.leave.leave')
    fireEvent.click(confirmLeaveButton)

    await waitFor(() => {
      expect(removeParticipant).toHaveBeenCalledWith({
        groupId: '1',
        userId: '1'
      })
    })
  })

  test('Opens delete modal and deletes group', async () => {
    const deleteButton = screen.getByText('group-info.delete')
    fireEvent.click(deleteButton)

    const confirmDeleteButton = screen.getByText('group-actions.delete.delete')
    fireEvent.click(confirmDeleteButton)

    await waitFor(() => {
      expect(deleteGroup).toHaveBeenCalledWith({
        groupId: '1'
      })
    })
  })

  test('Cancels and closes modals', () => {
    const cancelButton = screen.getByText('group-actions.delete.cancel')
    fireEvent.click(cancelButton)

    expect(screen.queryByText('group-actions.delete.title')).toBeNull()
    expect(screen.queryByText('group-actions.leave.title')).toBeNull()
  })
})
