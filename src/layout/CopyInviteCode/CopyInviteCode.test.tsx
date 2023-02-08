import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import CopyInviteCode from './CopyInviteCode'

describe('CopyInviteCode', () => {
  test('Renders copy invite code button', () => {
    render(<CopyInviteCode id="123" />)

    const button = screen.getByTitle('create-chat.clipboard')
    expect(button).toBeTruthy()
  })

  test('Copies invite code to clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    })
    const button = screen.getByTitle('create-chat.clipboard')

    fireEvent.click(button)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('123')
  })

  test('Shows success message and hides it later', async () => {
    const button = screen.getByTitle('create-chat.clipboard')

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('create-chat.clipboard-success')).toBeTruthy()
    })

    await waitFor(
      () => {
        expect(screen.queryByText('create-chat.clipboard-success')).toBeNull()
      },
      { timeout: 1500 }
    )
  })

  test("Doesn't copy invite code to clipboard if id is falsy", () => {
    render(<CopyInviteCode id="" />)

    const button = screen.getAllByTitle('create-chat.clipboard')[1]

    fireEvent.click(button)

    expect(navigator.clipboard.writeText).not.toHaveBeenCalledWith('')
  })
})
