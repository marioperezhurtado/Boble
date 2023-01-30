import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import ChatPreview from './ChatPreview'

vi.mock('react-i18next')
vi.mock('@/contexts/AuthContext')

describe('ChatPreview', async () => {
  const { useTranslation }: { useTranslation: any } = await import(
    'react-i18next'
  )

  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')

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
            created_at: '999',
            full_name: 'Test name 1',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          },
          user2: {
            id: '2',
            created_at: '999',
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
            created_at: '999',
            full_name: 'Test name 1',
            email: 'mail@test.com',
            avatar_url: 'https://test.com'
          },
          user2: {
            id: '1',
            created_at: '999',
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
            created_at: '999',
            email: 'mail@test1.com'
          },
          user2: {
            id: '2',
            created_at: '999',
            email: 'mail@test2.com'
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
            created_at: '999',
            full_name: 'Test name 3',
            email: ''
          },
          user2: {
            id: '2',
            created_at: '999',
            full_name: 'Test name 3',
            email: ''
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
            created_at: '999',
            avatar_url: 'https://test.com',
            full_name: 'Test name 3',
            email: ''
          },
          user2: {
            id: '1',
            created_at: '999',
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
            created_at: '999',
            email: 'mail@own-test.com'
          },
          user2: {
            id: '1',
            created_at: '999',

            email: 'mail@own-test.com'
          }
        }}
      />
    )

    expect(screen.getAllByText('M')).toBeTruthy()
  })
})
