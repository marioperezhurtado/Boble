import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import GroupPreview from './GroupPreview'

describe('GroupPreview', async () => {
  test('Renders group preview', () => {
    render(
      <GroupPreview
        group={{
          id: '1',
          name: 'Test Group',
          avatar_url: 'avatar.png',
          created_at: '999',
          creator_id: '1'
        }}
      />
    )
    expect(screen.getByText('Test Group')).toBeTruthy()
  })
})
