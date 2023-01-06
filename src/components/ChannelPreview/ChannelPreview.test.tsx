import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import ChannelPreview from './ChannelPreview'

describe('ChannelPreview', () => {
  test('Renders link to channel with avatar and name', () => {
    render(
      <ChannelPreview
        channelId="1"
        user={{
          id: '1',
          created_at: '999',
          full_name: 'Test name',
          avatar_url: 'https://i.pravatar.cc/100',
          email: 'mail@test.com'
        }}
      />
    )

    expect(screen.getByRole('link')).toBeTruthy()
    expect(screen.getByAltText('Test name avatar')).toBeTruthy()
    expect(screen.getByText('Test name')).toBeTruthy()
    expect(screen.queryByText('mail@test.com')).toBeNull()
  })

  test("Renders email if name isn't provided", () => {
    render(
      <ChannelPreview
        channelId="1"
        user={{
          id: '1',
          created_at: '999',
          avatar_url: 'https://i.pravatar.cc/100',
          email: 'mail@test2.com'
        }}
      />
    )
    expect(screen.getByText('mail@test2.com')).toBeTruthy()
  })

  test('Renders default avatar if no avatar url is provided', () => {
    render(
      <ChannelPreview
        channelId="1"
        user={{
          id: '1',
          created_at: '999',
          full_name: 'Test name 3',
          email: ''
        }}
      />
    )
    expect(screen.queryByAltText('Test name 3 avatar')).toBeNull()
  })
})
