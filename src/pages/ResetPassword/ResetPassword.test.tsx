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

vi.mock('@/contexts/AuthContext')

describe('ResetPassword', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')

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
    expect(await screen.findByText('validation.empty-error')).toBeTruthy()

    const password = screen.getByLabelText('change-password.password')
    const repeatPassword = screen.getByLabelText('change-password.confirm')

    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '1234' } })
    fireEvent.submit(form)

    expect(changePassword).not.toHaveBeenCalled()
    expect(
      await screen.findByText('validation.password-match-error')
    ).toBeTruthy()
  })

  test('Changes password and shows success message', async () => {
    const form = screen.getByRole('form')
    const password = screen.getByLabelText('change-password.password')
    const repeatPassword = screen.getByLabelText('change-password.confirm')
    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '123' } })
    fireEvent.submit(form)

    expect(await screen.findByText('change-password.success')).toBeTruthy()
  })

  test('Shows error if changing password fails', async () => {
    changePassword.mockRejectedValueOnce({})

    render(
      <QueryClientProvider client={queryClient}>
        <ResetPassword />
      </QueryClientProvider>
    )

    const form = screen.getAllByRole('form')[0]
    const password = screen.getAllByLabelText('change-password.password')[0]
    const repeatPassword = screen.getAllByLabelText(
      'change-password.confirm'
    )[0]
    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.change(repeatPassword, { target: { value: '123' } })
    fireEvent.submit(form)

    expect(await screen.findByText('change-password.error')).toBeTruthy()
  })
})
