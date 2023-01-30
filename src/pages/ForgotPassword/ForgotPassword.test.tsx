import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ForgotPassword from './ForgotPassword'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/contexts/AuthContext')

describe('ForgotPassword', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')

  test('Does not send recovery email if email is not provided and shows validation error', async () => {
    const sendResetPasswordEmail = vi.fn()
    useAuth.mockReturnValue({ sendResetPasswordEmail })

    render(
      <QueryClientProvider client={queryClient}>
        <ForgotPassword />
      </QueryClientProvider>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(sendResetPasswordEmail).not.toHaveBeenCalled()
    expect(await screen.findByText('validation.email-error')).toBeTruthy()
  })

  test('Shows error if recovery email fails to send', async () => {
    useAuth.mockReturnValue({
      sendResetPasswordEmail: () => {
        throw new Error('Failed to send recovery email')
      }
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ForgotPassword />
      </QueryClientProvider>
    )

    const form = screen.getAllByRole('form')[0]
    const emailInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(emailInput, { target: { value: 'mail@test.com' } })
    fireEvent.submit(form)

    expect(
      await screen.findByText('Failed to send recovery email')
    ).toBeTruthy()
  })

  test('Sends recovery email and shows success message', async () => {
    const sendResetPasswordEmail = vi.fn()
    useAuth.mockReturnValue({ sendResetPasswordEmail })

    render(
      <QueryClientProvider client={queryClient}>
        <ForgotPassword />
      </QueryClientProvider>
    )

    const form = screen.getAllByRole('form')[2]
    const emailInput = screen.getAllByRole('textbox')[2]
    fireEvent.change(emailInput, { target: { value: 'mail@test.com' } })
    fireEvent.submit(form)

    expect(await screen.findByText('forgot-password.success')).toBeTruthy()
  })
})
