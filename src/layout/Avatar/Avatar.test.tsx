import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import Avatar from './Avatar'

describe('Avatar', () => {
  test('Renders avatar if url can load', () => {
    render(
      <Avatar size="small" name="first" avatarUrl="https://i.pravatar.cc/100" />
    )
    const image = screen.getByAltText('first avatar')

    fireEvent.load(image)

    expect(screen.getByAltText('first avatar')).toBeTruthy()
  })

  test('Renders default avatar with letter if no avatarUrl is provided', () => {
    render(<Avatar size="small" name="second" avatarUrl={null} />)

    expect(screen.getByText('S')).toBeTruthy()
    expect(screen.queryByAltText('second avatar')).toBeNull()
  })

  test('Renders default avatar with letter if avatarUrl fails to load', () => {
    render(<Avatar size="small" name="third" avatarUrl="invalid url" />)

    const image = screen.getByAltText('third avatar')

    fireEvent.error(image)

    expect(screen.getByText('T')).toBeTruthy()
    expect(screen.queryByAltText('third avatar')).toBeNull()
  })
})
