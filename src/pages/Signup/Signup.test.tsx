import { describe, test, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Signup from './Signup'

const queryClient = new QueryClient()

vi.mock('@/contexts/AuthContext')

describe('Signup', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  useAuth.mockReturnValue({ signUp: () => {} })

  const testSignup = {
    email: 'mail@test.com',
    password: 'password123'
  }

  beforeAll(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Signup />
      </QueryClientProvider>
    )
  })

  test('renders', () => {
    expect(screen.getByText('signup.title')).toBeTruthy()
  })

  test('Shows error if there are empty fields', () => {
    const signupForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('signup.email'), {
      target: { value: testSignup.email }
    })

    fireEvent.submit(signupForm)
    expect(screen.getByText('validation.empty-error')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('signup.password'), {
      target: { value: testSignup.password }
    })

    fireEvent.submit(signupForm)
    expect(screen.getByText('validation.empty-error')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('signup.confirm'), {
      target: { value: testSignup.password }
    })
    fireEvent.change(screen.getByLabelText('signup.email'), {
      target: { value: '' }
    })

    fireEvent.submit(signupForm)
    expect(screen.getByText('validation.empty-error')).toBeTruthy()
  })

  test("Shows error if passwords don't match", () => {
    const signupForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('signup.email'), {
      target: { value: testSignup.email }
    })
    fireEvent.change(screen.getByLabelText('signup.password'), {
      target: { value: testSignup.password }
    })
    fireEvent.change(screen.getByLabelText('signup.confirm'), {
      target: { value: 'Different password' }
    })

    fireEvent.submit(signupForm)
    expect(screen.getByText('validation.password-match-error')).toBeTruthy()
  })

  test('Shows error if signup fails', async () => {
    useAuth.mockReturnValueOnce({
      signUp: () => {
        throw Error('Failed to create an account')
      }
    })

    const signupForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('signup.email'), {
      target: { value: testSignup.email }
    })
    fireEvent.change(screen.getByLabelText('signup.password'), {
      target: { value: testSignup.password }
    })
    fireEvent.change(screen.getByLabelText('signup.confirm'), {
      target: { value: testSignup.password }
    })

    fireEvent.submit(signupForm)
    expect(await screen.findByText('Failed to create an account')).toBeTruthy()
  })

  test('Shows success message and resets on signup', async () => {
    const signupForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('signup.email'), {
      target: { value: testSignup.email }
    })
    fireEvent.change(screen.getByLabelText('signup.password'), {
      target: { value: testSignup.password }
    })
    fireEvent.change(screen.getByLabelText('signup.confirm'), {
      target: { value: testSignup.password }
    })

    fireEvent.submit(signupForm)
    expect(await screen.findByText('signup.success')).toBeTruthy()

    const email = screen.getByLabelText<HTMLInputElement>('signup.email')
    await waitFor(() => expect(email.value).toBe(''))
  })
})
