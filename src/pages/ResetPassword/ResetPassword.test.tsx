import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ResetPassword from './ResetPassword'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('../../contexts/AuthContext')

describe('ResetPassword', async () => {
  const { useAuth }: { useAuth: any } = await import(
    '../../contexts/AuthContext'
  )

  const changePassword = vi.fn()
  useAuth.mockReturnValue({ changePassword })

  test('Does not send change password if there are empty fields or passwords do not match and shows errors', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ResetPassword />
      </QueryClientProvider>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(changePassword).not.toHaveBeenCalled()
    expect(await screen.findByText('There are empty fields')).toBeTruthy()

    const password = screen.getByLabelText('New password')
    const repeatPassword = screen.getByLabelText('Confirm password')

    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '1234' } })
    fireEvent.submit(form)

    expect(changePassword).not.toHaveBeenCalled()
    expect(await screen.findByText('Passwords do not match')).toBeTruthy()
  })

  test('Changes password and shows success message', async () => {
    const form = screen.getByRole('form')
    const password = screen.getByLabelText('New password')
    const repeatPassword = screen.getByLabelText('Confirm password')
    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '123' } })
    fireEvent.submit(form)

    expect(
      await screen.findByText('Your password has been reset succesfully.')
    ).toBeTruthy()
  })

  test('Shows error if changing password fails', async () => {
    changePassword.mockRejectedValueOnce(new Error('Failed to change password'))

    render(
      <QueryClientProvider client={queryClient}>
        <ResetPassword />
      </QueryClientProvider>
    )

    const form = screen.getAllByRole('form')[0]
    const password = screen.getAllByLabelText('New password')[0]
    const repeatPassword = screen.getAllByLabelText('Confirm password')[0]
    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '123' } })
    fireEvent.submit(form)

    expect(await screen.findByText('Failed to change password')).toBeTruthy()
  })
})
