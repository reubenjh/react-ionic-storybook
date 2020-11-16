import React, {
  FC,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useLayoutEffect,
} from 'react'
import { buildTheme, themeBase } from './theme'
import { useSetIonTheme } from './useSetIonTheme'
import { isPlatform } from '@ionic/react'

interface IThemeContext {
  theme: ReturnType<typeof buildTheme>
  setThemeBase: Dispatch<SetStateAction<typeof themeBase>>
  isDarkMode: boolean
  setIsDarkMode: Dispatch<SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: FC = ({ children }) => {
  const [themeBaseState, setThemeBaseState] = useState(themeBase)

  // TODO: get default from media query prefers dark
  const [isDarkMode, setIsDarkMode] = useState(false)

  useLayoutEffect(() => {
    const body = document.body
    if (isDarkMode) {
      body.classList.remove('light')
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
      body.classList.add('light')
    }
  }, [isDarkMode])

  useSetIonTheme(themeBaseState)

  const theme = useMemo(() => buildTheme(themeBaseState, isDarkMode, isPlatform('ios')), [
    themeBaseState,
    isDarkMode,
  ])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeBase: setThemeBaseState,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
