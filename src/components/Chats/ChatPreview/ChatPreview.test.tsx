import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import ChatPreview from './ChatPreview'

vi.mock('react-i18next')
vi.mock('@/contexts/AuthContext')
vi.mock('@/services/chats')

describe('ChatPreview', async () => {
  const { useTranslation }: { useTranslation: any } = await import(
    'react-i18next'
  )

  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  const { deleteChat }: { deleteChat: any } = await import('@/services/chats')

  useTranslation.mockReturnValue({
    t: (key: string) => key
  })

  useAuth.mockReturnValue({ currentUser: { id: '1' } })

  test("Renders link to channel with the other user's avatar and name", () => {
    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '1',
            full_name: 'Test name 1',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          },
          user2: {
            id: '2',
            full_name: 'Test name 2',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          }
        }}
      />
    )

    expect(screen.getByRole('link')).toBeTruthy()
    expect(screen.getByAltText('Test name 2 avatar')).toBeTruthy()
    expect(screen.getByText('Test name 2')).toBeTruthy()
    expect(screen.queryByText('mail@test.com')).toBeNull()

    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '2',
            full_name: 'Test name 1',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          },
          user2: {
            id: '1',
            full_name: 'Test name 2',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          }
        }}
      />
    )

    expect(screen.getByAltText('Test name 1 avatar')).toBeTruthy()
    expect(screen.getByText('Test name 1')).toBeTruthy()
  })

  test("Renders email if name isn't provided", () => {
    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '1',
            email: 'mail@test1.com',
            avatar_url: '',
            full_name: ''
          },
          user2: {
            id: '2',
            email: 'mail@test2.com',
            avatar_url: '',
            full_name: null
          }
        }}
      />
    )
    expect(screen.getByText('mail@test2.com')).toBeTruthy()
  })

  test('Renders default avatar if no avatar url is provided', () => {
    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '1',
            full_name: 'Test name 3',
            email: '',
            avatar_url: ''
          },
          user2: {
            id: '2',
            full_name: 'Test name 3',
            email: '',
            avatar_url: ''
          }
        }}
      />
    )
    expect(screen.queryByAltText('Test name 3 avatar')).toBeNull()
  })

  test('Renders own chat if both users are the current authenticated user', () => {
    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '1',
            avatar_url: 'https://test.com',
            full_name: 'Test name 3',
            email: ''
          },
          user2: {
            id: '1',
            avatar_url: 'https://test.com',
            full_name: 'Test name 3',
            email: ''
          }
        }}
      />
    )
    expect(screen.getByText('channel-preview.own')).toBeTruthy()
    expect(screen.getByAltText('Test name 3 avatar')).toBeTruthy()
    expect(screen.getByText('Test name 3')).toBeTruthy()

    render(
      <ChatPreview
        chat={{
          id: '1',
          created_at: '999',
          user1: {
            id: '1',
            email: 'mail@own-test.com',
            avatar_url: null,
            full_name: null
          },
          user2: {
            id: '1',
            email: 'mail@own-test.com',
            avatar_url: null,
            full_name: null
          }
        }}
      />
    )

    expect(screen.getAllByText('M')).toBeTruthy()
  })

  test('Opens chat actions', () => {
    const actionsButton = screen.getAllByTitle('Actions')[0]

    expect(screen.queryByText('chat-actions.delete.button')).toBeNull()

    fireEvent.click(actionsButton)

    expect(screen.getByText('chat-actions.delete.button')).toBeTruthy()
  })

  test('Opens delete modal and deletes', () => {
    const deleteButton = screen.getByText('chat-actions.delete.button')
    expect(screen.queryByText('chat-actions.delete.title')).toBeNull()

    fireEvent.click(deleteButton)

    expect(screen.getByText('chat-actions.delete.title')).toBeTruthy()

    const confirmDeleteButton = screen.getByText('chat-actions.delete.delete')
    fireEvent.click(confirmDeleteButton)

    expect(deleteChat).toHaveBeenCalledWith({ chatId: '1' })
  })
})
