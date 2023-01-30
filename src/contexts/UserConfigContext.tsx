import { createContext, useContext } from 'react'
import useTheme from '@/hooks/useTheme'
import useFontSize from '@/hooks/useFontSize'
import useTranslate from '@/hooks/useTranslate'

import type { Theme } from '@/hooks/useTheme'
import type { Language } from '@/hooks/useTranslate'
import type { FontSize } from '@/hooks/useFontSize'

interface Props {
  children: React.ReactNode
}

interface UserConfigContext {
  theme: Theme
  toggleTheme: () => void
  language: Language
  changeLanguage: (language: Language) => void
  fontSize: FontSize
  changeFontSize: (fontSize: FontSize) => void
}

const initialAuthCtx = {
  theme: 'light' as Theme,
  toggleTheme: () => {},
  language: 'en' as Language,
  changeLanguage: () => {},
  fontSize: 'medium' as FontSize,
  changeFontSize: () => {}
}

const UserCtx = createContext<UserConfigContext>(initialAuthCtx)

export function UserConfigProvider({ children }: Props) {
  const { theme, toggleTheme } = useTheme()
  const { fontSize, changeFontSize } = useFontSize()
  const { language, changeLanguage } = useTranslate()

  const userConfig = {
    theme,
    toggleTheme,
    language,
    changeLanguage,
    fontSize,
    changeFontSize
  }

  return <UserCtx.Provider value={userConfig}>{children}</UserCtx.Provider>
}

export const useUserConfig = () => useContext(UserCtx)
