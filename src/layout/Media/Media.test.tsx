import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import Media from './Media'

describe('Media', () => {
  test('Renders media children and a button to expand it', () => {
    render(<Media>Media children example</Media>)

    const media = screen.getByText('Media children example')
    expect(media).toBeTruthy()

    const button = screen.getByAltText('Expand media')
    expect(button).toBeTruthy()
  })

  test('Expands media and closes it', () => {
    const button = screen.getByAltText('Expand media')

    fireEvent.click(button)

    const media = screen.getAllByText('Media children example')
    expect(media).toHaveLength(2)

    const backdrop = screen.getByRole('presentation')
    expect(backdrop).toBeTruthy()

    fireEvent.click(backdrop)

    expect(screen.getAllByText('Media children example')).toHaveLength(1)
  })
})
