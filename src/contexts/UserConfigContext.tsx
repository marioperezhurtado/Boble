import { createContext, useContext } from 'react'
import useTheme from '../hooks/useTheme'
import useTranslate from '../hooks/useTranslate'

interface Props {
  children: React.ReactNode
}

interface UserConfigContext {
  theme: string
  toggleTheme: () => void
  language: string
  changeLanguage: (language: string) => void
}

const initialAuthCtx = {
  theme: 'light',
  toggleTheme: () => {},
  language: 'en',
  changeLanguage: () => {}
}

const UserCtx = createContext<UserConfigContext>(initialAuthCtx)

export function UserConfigProvider({ children }: Props) {
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useTranslate()

  const userConfig = {
    theme,
    toggleTheme,
    language,
    changeLanguage
  }

  return <UserCtx.Provider value={userConfig}>{children}</UserCtx.Provider>
}

export const useUserConfig = () => useContext(UserCtx)
