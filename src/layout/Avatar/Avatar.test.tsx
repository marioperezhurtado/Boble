import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import Avatar from './Avatar'

describe('Avatar', () => {
  test('Renders avatar if url can load', () => {
    render(
      <Avatar
        size="small"
        name="first"
        avatarUrl="https://i.pravatar.cc/100"
        id="123"
      />
    )
    const image = screen.getByAltText('first avatar')

    fireEvent.load(image)

    expect(screen.getByAltText('first avatar')).toBeTruthy()
  })

  test('Expands avatar and closes it', () => {
    render(
      <Avatar
        size="medium"
        name="second"
        avatarUrl="https://i.pravatar.cc/100"
        id="123"
      />
    )

    const image = screen.getByAltText('second avatar')
    fireEvent.click(image)

    const imageExpanded = screen.getByAltText('second avatar expanded')
    expect(
      imageExpanded.parentElement?.classList.contains('hidden')
    ).toBeTruthy()

    fireEvent.load(image)

    expect(
      imageExpanded.parentElement?.classList.contains('hidden')
    ).toBeFalsy()

    const nameExpanded = screen.getByText('~ second')
    const copyId = screen.getByTitle('create-chat.clipboard')

    expect(imageExpanded).toBeTruthy()

    expect(nameExpanded).toBeTruthy()
    expect(copyId).toBeTruthy()

    const backdrop = screen.getByRole('presentation')
    fireEvent.click(backdrop)

    expect(screen.queryByAltText('first avatar expanded')).toBeNull()
  })

  test('Renders default avatar with letter if no avatarUrl is provided', () => {
    render(<Avatar size="small" name="third" avatarUrl={null} />)

    expect(screen.getByText('T')).toBeTruthy()
    expect(screen.queryByAltText('third avatar')).toBeNull()
  })

  test('Renders default avatar with letter if avatarUrl fails to load', () => {
    render(<Avatar size="small" name="fourth" avatarUrl="invalid url" />)

    const image = screen.getByAltText('fourth avatar')

    fireEvent.error(image)

    expect(screen.getByText('T')).toBeTruthy()
    expect(screen.queryByAltText('fourth avatar')).toBeNull()
  })
})
