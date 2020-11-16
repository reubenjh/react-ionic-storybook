import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { IonApp, IonContent, IonPage } from '@ionic/react'
import { ThemeContext } from '../src/theme/ThemeContext'
import { themeBase, buildTheme, Variant } from '../src/theme/theme'
import { useSetIonTheme } from '../src/theme/useSetIonTheme'
import addons from '@storybook/addons'

// Core CSS for platform specific style
import '@ionic/react/css/core.css'

// CSS reset
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'

// Custom css reset
import 'theme/reset.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
}

const IonWrapper = ({ children }) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div style={{ padding: '1rem' }}>{children}</div>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

const ADDON_ID = 'theme-addon'
const THEME_CHANGE_EVENT_ID = `${ADDON_ID}:change`
const THEME_INIT_EVENT_ID = `${ADDON_ID}:init`
const PLATFORM_CHANGE_EVENT_ID = `${ADDON_ID}:platform_change`
const DARK_MODE_INIT_EVENT_ID = `${ADDON_ID}:dark_mode_init`
const DARK_MODE_CHANGE_EVENT_ID = `${ADDON_ID}:dark_mode_change`

const setPlatform = platform => {
  const htmlEl = window?.document?.getElementsByTagName('html')[0]
  htmlEl.setAttribute('mode', platform)

  const platformToRemove = platform === 'ios' ? 'md' : 'ios'
  var els = document.getElementsByClassName(platformToRemove)
  for (const el of els) {
    el.classList.remove(platformToRemove)
    el.classList.add(platform)
  }
}

const getPlatform = () => {
  const htmlEl = window?.document?.getElementsByTagName('html')[0]
  return htmlEl.getAttribute('mode') === 'ios' ? 'ios' : 'md'
}

interface StoryThemeProviderProps {
  channel: ReturnType<typeof addons.getChannel>
}

// Store theme in variable to persist theme between different stories
let currentThemeBase = themeBase
let currentIsDarkMode = false

// This theme provider is identical to the app's ThemeProvider, except:
// - It persists state in global variables "currentThemeBase" and "currentIsDarkMode"
// - It subscribes to channel events from the Storybook toolbar
export const StoryThemeProvider: FC<StoryThemeProviderProps> = ({ children, channel }) => {
  const [themeBaseState, setThemeBaseState] = useState(currentThemeBase)
  const [isDarkMode, setIsDarkMode] = useState(currentIsDarkMode)

  useSetIonTheme(themeBaseState)

  const theme = useMemo(() => buildTheme(themeBaseState, isDarkMode, getPlatform() === 'ios'), [
    themeBaseState,
    isDarkMode,
  ])

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

  useEffect(() => {
    const onThemeBaseChange = newThemeBase => {
      currentThemeBase = newThemeBase
      setThemeBaseState(newThemeBase)
    }
    const onPlatformChange = newPlatform => {
      setPlatform(newPlatform)
    }
    const onIsDarkModeChange = newIsDarkMode => {
      currentIsDarkMode = newIsDarkMode
      setIsDarkMode(newIsDarkMode)
    }
    channel.on(THEME_CHANGE_EVENT_ID, onThemeBaseChange)
    channel.on(PLATFORM_CHANGE_EVENT_ID, onPlatformChange)
    channel.on(DARK_MODE_CHANGE_EVENT_ID, onIsDarkModeChange)
    return () => {
      channel.removeListener(THEME_CHANGE_EVENT_ID, onThemeBaseChange)
      channel.removeListener(PLATFORM_CHANGE_EVENT_ID, onPlatformChange)
      channel.removeListener(DARK_MODE_CHANGE_EVENT_ID, onIsDarkModeChange)
    }
  }, [channel])

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

export const decorators = [
  storyFn => <IonWrapper>{storyFn()}</IonWrapper>,
  storyFn => {
    const channel = addons.getChannel()
    channel.emit(THEME_INIT_EVENT_ID, currentThemeBase)
    channel.emit(DARK_MODE_INIT_EVENT_ID, currentIsDarkMode)
    return <StoryThemeProvider channel={channel}>{storyFn()}</StoryThemeProvider>
  },
]
