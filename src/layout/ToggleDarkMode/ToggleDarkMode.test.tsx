import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import ToggleDarkMode from './ToggleDarkMode'

vi.mock('@/contexts/UserConfigContext')

describe('ToggleDarkMode', async () => {
  const { useUserConfig }: { useUserConfig: any } = await import(
    '@/contexts/UserConfigContext'
  )

  const toggleTheme = vi.fn()

  test('Renders toggle dark mode button', () => {
    useUserConfig.mockReturnValueOnce({
      theme: 'light',
      toggleTheme
    })

    render(<ToggleDarkMode />)
    const button = screen.getByTitle('dark-mode.title')
    expect(button).toBeTruthy()
  })

  test('Renders dark mode icon', () => {
    useUserConfig.mockReturnValueOnce({
      theme: 'dark',
      toggleTheme
    })

    render(<ToggleDarkMode />)
    const darkModeIcon = screen.getByAltText('Change to light mode')
    expect(darkModeIcon).toBeTruthy()

    fireEvent.click(darkModeIcon)
    expect(toggleTheme).toHaveBeenCalled()
  })

  test('Renders light mode icon', () => {
    useUserConfig.mockReturnValueOnce({
      theme: 'light',
      toggleTheme
    })

    render(<ToggleDarkMode />)
    const lightModeIcon = screen.getAllByAltText('Change to dark mode')[0]
    expect(lightModeIcon).toBeTruthy()

    fireEvent.click(lightModeIcon)
    expect(toggleTheme).toHaveBeenCalled()
  })
})
