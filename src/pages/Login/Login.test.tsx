import { describe, test, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Login from './Login'

const queryClient = new QueryClient()

vi.mock('@/contexts/AuthContext')

describe('Login', async () => {
  const { useAuth }: { useAuth: any } = await import('@/contexts/AuthContext')
  useAuth.mockReturnValue({ signIn: () => {} })

  const testLogin = {
    email: 'mail@test.com',
    password: 'password123'
  }

  beforeAll(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    )
  })

  test('renders', () => {
    expect(screen.getByText('login.title')).toBeTruthy()
  })

  test('Shows error if there are empty fields', () => {
    const loginForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('login.email'), {
      target: { value: testLogin.email }
    })
    fireEvent.change(screen.getByLabelText('login.password'), {
      target: { value: '' }
    })

    fireEvent.submit(loginForm)
    expect(screen.getByText('validation.empty-error')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('login.email'), {
      target: { value: '' }
    })
    fireEvent.change(screen.getByLabelText('login.password'), {
      target: { value: testLogin.password }
    })

    fireEvent.submit(loginForm)
    expect(screen.getByText('validation.empty-error')).toBeTruthy()
  })

  test('Shows error if login fails', async () => {
    useAuth.mockReturnValueOnce({
      signIn: () => {
        throw Error('Failed to sign in')
      }
    })

    const loginForm = screen.getByRole('form')
    fireEvent.change(screen.getByLabelText('login.email'), {
      target: { value: testLogin.email }
    })
    fireEvent.change(screen.getByLabelText('login.password'), {
      target: { value: testLogin.password }
    })

    fireEvent.submit(loginForm)
    expect(await screen.findByText('Failed to sign in')).toBeTruthy()
  })
})
