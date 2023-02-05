import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import ChangeFontSize from './ChangeFontSize'

vi.mock('@/contexts/UserConfigContext')

describe('ChangeFontSize', async () => {
  const { useUserConfig }: { useUserConfig: any } = await import(
    '@/contexts/UserConfigContext'
  )

  const changeFontSize = vi.fn()

  useUserConfig.mockReturnValue({
    fontSize: 'normal',
    changeFontSize
  })

  test('Renders change font size button', () => {
    render(<ChangeFontSize />)
    const button = screen.getByTitle('font-size.title')
    expect(button).toBeTruthy()
  })

  test('Opens size options', () => {
    const button = screen.getByTitle('font-size.title')

    fireEvent.click(button)

    const list = screen.getByRole('list')
    expect(list).toBeTruthy()
  })

  test('Changes font size and closes', () => {
    const optionNormal = screen.getByTitle('font-size.normal')
    if (optionNormal) fireEvent.click(optionNormal)

    expect(changeFontSize).toHaveBeenCalledWith('normal')
    expect(screen.queryByRole('list')).toBeNull()

    const button = screen.getByTitle('font-size.title')
    fireEvent.click(button)

    const optionLarge = screen.getByTitle('font-size.large')
    fireEvent.click(optionLarge)

    expect(changeFontSize).toHaveBeenCalledWith('large')
    expect(screen.queryByRole('list')).toBeNull()

    fireEvent.click(button)

    const optionExtraLarge = screen.getByTitle('font-size.extra-large')
    fireEvent.click(optionExtraLarge)

    expect(changeFontSize).toHaveBeenCalledWith('xlarge')
  })

  test('Renders current font size as active option', () => {
    const button = screen.getByTitle('font-size.title')
    fireEvent.click(button)

    expect(
      screen.getByTitle('font-size.normal').classList.contains('bg-zinc-100')
    ).toBeTruthy()

    expect(
      screen.getByTitle('font-size.large').classList.contains('bg-zinc-100')
    ).toBeFalsy()

    expect(
      screen
        .getByTitle('font-size.extra-large')
        .classList.contains('bg-zinc-100')
    ).toBeFalsy()
  })
})
