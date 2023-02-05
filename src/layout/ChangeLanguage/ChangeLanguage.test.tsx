import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import ChangeLanguage from './ChangeLanguage'

vi.mock('@/contexts/UserConfigContext')

describe('ChangeFontSize', async () => {
  const { useUserConfig }: { useUserConfig: any } = await import(
    '@/contexts/UserConfigContext'
  )

  const changeLanguage = vi.fn()

  useUserConfig.mockReturnValue({
    language: 'en',
    changeLanguage
  })

  test('Renders change language button', () => {
    render(<ChangeLanguage />)
    const button = screen.getByTitle('translation.title')
    expect(button).toBeTruthy()
  })

  test('Opens language options', () => {
    const button = screen.getByTitle('translation.title')

    fireEvent.click(button)

    const list = screen.getByRole('list')
    expect(list).toBeTruthy()
  })

  test('Changes language and closes', () => {
    const optionEN = screen.getByTitle('translation.en')
    if (optionEN) fireEvent.click(optionEN)

    expect(changeLanguage).toHaveBeenCalledWith('en')
    expect(screen.queryByRole('list')).toBeNull()

    const button = screen.getByTitle('translation.title')
    fireEvent.click(button)

    const optionES = screen.getByTitle('translation.es')
    fireEvent.click(optionES)

    expect(changeLanguage).toHaveBeenCalledWith('es')
    expect(screen.queryByRole('list')).toBeNull()

    fireEvent.click(button)

    const optionFR = screen.getByTitle('translation.fr')
    fireEvent.click(optionFR)

    expect(changeLanguage).toHaveBeenCalledWith('fr')
  })

  test('Renders current language as active option', () => {
    const button = screen.getByTitle('translation.title')
    fireEvent.click(button)

    expect(
      screen.getByTitle('translation.en').classList.contains('bg-zinc-100')
    ).toBeTruthy()

    expect(
      screen.getByTitle('translation.es').classList.contains('bg-zinc-100')
    ).toBeFalsy()

    expect(
      screen.getByTitle('translation.fr').classList.contains('bg-zinc-100')
    ).toBeFalsy()
  })
})
