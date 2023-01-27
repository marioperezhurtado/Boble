import { useState, useEffect } from 'react'

export type FontSize = 'normal' | 'large' | 'xlarge'

const FONT_SIZES = {
  normal: 'text-md',
  large: 'text-lg',
  xlarge: 'text-xl'
}

export default function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>('normal')

  const changeFontSize = (size: FontSize) => setFontSize(size)

  useEffect(() => {
    const localFontSize = localStorage.getItem('fontSize') as FontSize

    if (!localFontSize) return
    if (!FONT_SIZES[localFontSize]) return

    setFontSize(localFontSize)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all font size classes
    Object.values(FONT_SIZES).forEach((fontSize) => {
      root.classList.remove(fontSize)
    })
    // Add current font size class
    root.classList.add(FONT_SIZES[fontSize])

    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  return { fontSize, changeFontSize }
}
