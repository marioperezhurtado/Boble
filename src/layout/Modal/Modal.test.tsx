import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import Modal from './Modal'

describe('Modal', () => {
  test('Renders modal', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    )

    expect(screen.getByText('Modal content')).toBeTruthy()
  })

  test('Closes modal when clicking on backdrop', () => {
    const onClose = vi.fn()
    render(
      <Modal onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    )

    const backdrop = screen.getAllByRole('presentation')[1]
    fireEvent.click(backdrop)

    expect(onClose).toBeCalled()
  })
})
