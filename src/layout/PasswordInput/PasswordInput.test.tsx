import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  test('Shows and hides password', () => {
    render(
      <form name="testForm">
        <label htmlFor="password">Password</label>
        <PasswordInput name="password" id="password" />
      </form>
    )

    const input = screen.getByLabelText<HTMLInputElement>('Password')
    expect(input.type).toBe('password')

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(input.type).toBe('text')
  })
})
