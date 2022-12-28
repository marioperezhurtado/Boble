import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import ChatList from './ChatList'

describe('ChatList', () => {
  const testChatList = [
    {
      id: '1',
      name: 'Chat 1'
    },
    {
      id: '2',
      name: 'Chat 2'
    }
  ]

  test('Renders list of chats', () => {
    render(<ChatList chatList={testChatList} />)

    const chatList = screen.getByRole('list')

    expect(chatList.children).toHaveLength(2)
  })
})
