import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import addons from '@storybook/addons'
import { themeBase } from '../../src/theme/theme'
import { AddonPanel, Source } from '@storybook/components'

const ADDON_ID = 'theme-addon'
const PANEL_ID = `${ADDON_ID}/panel`
const THEME_INIT_EVENT_ID = `${ADDON_ID}:init`
const THEME_CHANGE_EVENT_ID = `${ADDON_ID}:change`
const DARK_MODE_INIT_EVENT_ID = `${ADDON_ID}:dark_mode_init`
const DARK_MODE_CHANGE_EVENT_ID = `${ADDON_ID}:dark_mode_change`
const PLATFORM_CHANGE_EVENT_ID = `${ADDON_ID}:platform_change`

interface PanelProps {
  channel: ReturnType<typeof addons.getChannel>
}

const getNewThemeState = (key: string, v: any, theme: typeof themeBase) => {
  const keyParts = key.split('.')
  let res: any = theme
  // Yes, we are mutating state here
  for (let i = 0; i < keyParts.length; ++i) {
    const k = keyParts[i]
    if (i < keyParts.length - 1) {
      res = res[k]
    } else {
      if (typeof res[k] === 'number') {
        res[k] = Number(v)
      } else {
        res[k] = String(v)
      }
    }
  }
  // We make sure state updates by creating a new object here
  return { ...theme }
}

interface LabelProps {
  label: string
  labelType?: 'normal' | 'h1' | 'h2' | 'h3'
  style?: any
}

const Label: FC<LabelProps> = ({ label, labelType = 'normal', style }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: labelType === 'normal' ? 'flex-end' : 'center',
        fontSize: labelType === 'h1' ? '1.5rem' : labelType === 'h2' ? '1.25rem' : '1rem',
        ...style,
      }}
    >
      <div>{label}</div>
    </div>
  )
}

interface ColorInputProps {
  color: string
  colorKey: string
  onChange: (k: string, v: string) => void
  order: 'left' | 'right'
}

const ColorInput: FC<ColorInputProps> = React.memo(
  ({ color, onChange, colorKey, order, ...props }) => {
    const originalColorRef = useRef(color)

    return (
      <div {...props}>
        {order === 'left' && (
          <button onClick={() => onChange(colorKey, originalColorRef.current)}>{'⟲'}</button>
        )}
        <input
          type={order === 'left' ? 'text' : 'color'}
          value={color}
          onChange={e => onChange(colorKey, e.target.value)}
        />
        <input
          type={order === 'left' ? 'color' : 'text'}
          value={color}
          onChange={e => onChange(colorKey, e.target.value)}
        />
        {order === 'right' && (
          <button onClick={() => onChange(colorKey, originalColorRef.current)}>{'⟲'}</button>
        )}
      </div>
    )
  }
)

const getFlatObjectKeys = (obj: Record<string | number, any>, parentKey = '') => {
  let res: Record<string, string | number> = {}

  Object.keys(obj).forEach(k => {
    const combinedKey = `${parentKey ? `${parentKey}_@*_` : ''}${k}`
    if (typeof obj[k] === 'string' || typeof obj[k] === 'number') {
      res[combinedKey] = obj[k]
    } else if (typeof obj[k] === 'object' && obj[k] !== null) {
      res = { ...res, ...getFlatObjectKeys(obj[k], combinedKey) }
    }
  })
  return res
}

const generateInputs = (theme: typeof themeBase, onChange: (k: string, v: any) => void) => {
  // TODO: Render all other them variables, not just colors!
  let flat = getFlatObjectKeys(theme)
  const ColorComponent = generateColorInputs(onChange, flat)
  const OtherComponent = generateRestOfThemeInputs(onChange, flat)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '2rem',
      }}
    >
      {ColorComponent}
      {OtherComponent}
    </div>
  )
}

const generateRestOfThemeInputs = (
  onChange: (k: string, v: any) => void,
  flat: ReturnType<typeof getFlatObjectKeys>
) => {
  const flatKeys = Object.keys(flat)
  const res: ReactNode[] = []
  const notColorKeys = flatKeys.filter(k => !k.includes('colors_@*_'))

  let lastParentKeys = []
  notColorKeys.forEach((k, i) => {
    const allKeyParts = k.split('_@*_')
    const newParentKeys = allKeyParts.slice(0, -1)
    let diffIndex = undefined
    for (let index = 0; index < newParentKeys.length; ++index) {
      if (lastParentKeys[index] !== newParentKeys[index]) {
        diffIndex = index
        break
      }
    }

    lastParentKeys = newParentKeys

    if (diffIndex !== undefined) {
      while (diffIndex < newParentKeys.length) {
        res.push(
          <Label
            style={{
              gridColumn: `span 2`,
            }}
            key={`${k}-label-${i}-${diffIndex}`}
            label={newParentKeys[diffIndex]}
            labelType={diffIndex < 1 ? 'h1' : diffIndex < 2 ? 'h2' : 'h3'}
          />
        )
        ++diffIndex
      }
    }

    res.push(
      <Fragment key={k}>
        <Label label={allKeyParts.slice(-1)[0]} />
        <input
          type={typeof flat[k] === 'number' ? 'number' : 'text'}
          value={flat[k]}
          onChange={e => onChange(k.replace(/_@\*_/g, '.'), e.target.value)}
        />
      </Fragment>
    )
  })

  return (
    <div
      style={{
        display: 'inline-grid',
        minHeight: '0',
        gridAutoRows: 'auto',
        gridTemplateColumns: 'auto auto',
        rowGap: '0.25rem',
        columnGap: '0.5rem',
      }}
    >
      {res}
    </div>
  )
}

const generateColorInputs = (
  onChange: (k: string, v: any) => void,
  flat: ReturnType<typeof getFlatObjectKeys>
) => {
  const flatKeys = Object.keys(flat)
  const res: ReactNode[] = []
  const lightColorKeys = flatKeys.filter(k => k.includes('colors_@*_light'))
  const darkColorKeys = flatKeys.filter(k => k.includes('colors_@*_dark'))

  const uniqueColorKeys = {}
  lightColorKeys.forEach(k => {
    const subKey = k.replace('colors_@*_light_@*_', '')
    uniqueColorKeys[subKey] = 'light'
  })
  darkColorKeys.forEach(k => {
    const subKey = k.replace('colors_@*_dark_@*_', '')
    if (uniqueColorKeys[subKey] === 'light') {
      uniqueColorKeys[subKey] = 'both'
    } else {
      uniqueColorKeys[subKey] = 'dark'
    }
  })

  if (lightColorKeys.length || darkColorKeys.length) {
    res.push(<div key="color-header-spacer-1" />)
    res.push(
      <Label
        style={{
          gridColumn: `span 2`,
        }}
        key="color-header"
        label="Colors"
        labelType="h1"
      />
    )
    res.push(<div key="color-header-spacer-2" />)
    res.push(<Label key="light-header" label="Light" labelType="h2" />)
    res.push(<Label key="dark-header" label="Dark" labelType="h2" />)
  }

  let currentColorSubKey = undefined
  Object.keys(uniqueColorKeys).forEach((k, i) => {
    const newCurrentColorSubkey = k.split('_@*_')[0]
    if (currentColorSubKey !== newCurrentColorSubkey) {
      currentColorSubKey = newCurrentColorSubkey
      res.push(<div style={{ height: '0.5rem' }} key={`color-space-top-left-${i}`} />)
      res.push(
        <Label
          style={{ gridColumn: `span 2` }}
          key={`color-space-top-right-${i}`}
          label={currentColorSubKey}
          labelType="h3"
        />
      )
    }

    const v = uniqueColorKeys[k]
    let lightInput = undefined
    let darkInput = undefined
    let colorKey = ''
    if (v === 'light' || v === 'both') {
      const lightKey = flatKeys.find(key => key.includes(`colors_@*_light_@*_${k}`))
      const lightValue = String(flat[lightKey])
      const lightKeySegments = lightKey.split('_@*_')
      colorKey = lightKeySegments.slice(-1)[0]
      lightInput = (
        <ColorInput
          key={lightKey}
          color={lightValue}
          colorKey={lightKey.replace(/_@\*_/g, '.')}
          onChange={onChange}
          order="left"
        />
      )
    }
    if (v === 'dark' || v === 'both') {
      const darkKey = flatKeys.find(key => key.includes(`colors_@*_dark_@*_${k}`))
      const darkValue = String(flat[darkKey])
      const darkKeySegments = darkKey.split('_@*_')
      colorKey = darkKeySegments.slice(-1)[0]
      darkInput = (
        <ColorInput
          key={darkKey}
          color={darkValue}
          colorKey={darkKey.replace(/_@\*_/g, '.')}
          onChange={onChange}
          order="right"
        />
      )
    }
    res.push(<Label key={`color-label-${i}`} label={colorKey} />)
    if (lightInput) {
      res.push(lightInput)
    } else {
      res.push(<div key={`color-space-${i}`} />)
    }
    if (darkInput) {
      res.push(darkInput)
    } else {
      res.push(<div key={`color-space-${i}`} />)
    }
  })

  return (
    <div
      style={{
        display: 'inline-grid',
        gridAutoRows: 'auto',
        gridTemplateColumns: 'auto auto auto',
        rowGap: '0.25rem',
        columnGap: '0.5rem',
      }}
    >
      {res}
    </div>
  )
}

const Panel: FC<PanelProps> = ({ channel }) => {
  // TODO: indiviudal inputs for each theme variable
  const [state, setState] = useState<typeof themeBase>()
  const [tab, setTab] = useState<'INPUTS' | 'JSON'>('INPUTS')
  const [platform, setPlatform] = useState<'md' | 'ios'>('md')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    channel.on(THEME_INIT_EVENT_ID, setState)
    channel.on(DARK_MODE_INIT_EVENT_ID, setIsDarkMode)
    return () => {
      channel.removeListener(THEME_INIT_EVENT_ID, setState)
      channel.removeListener(DARK_MODE_INIT_EVENT_ID, setIsDarkMode)
    }
  }, [channel])

  const onChange = useCallback(
    (k: string, v: any) => {
      const newState = getNewThemeState(k, v, state)
      setState(newState)
      channel.emit(THEME_CHANGE_EVENT_ID, newState)
    },
    [state, channel]
  )

  const generatedInputs = useMemo(() => (state ? generateInputs(state, onChange) : undefined), [
    state,
    onChange,
  ])

  useEffect(() => {}, [state])

  if (!state || !platform) {
    return null
  }

  const onPlatformChange = () => {
    const newPlatform = platform === 'md' ? 'ios' : 'md'
    setPlatform(newPlatform)
    channel.emit(PLATFORM_CHANGE_EVENT_ID, newPlatform)
  }

  const onIsDarkModeChange = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    channel.emit(DARK_MODE_CHANGE_EVENT_ID, newIsDarkMode)
  }

  return (
    <div
      style={{
        padding: '1rem',
        minWidth: '48rem',
        position: 'relative',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '12rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem',
            alignItems: 'center',
          }}
        >
          <div>{`Platform: ${platform === 'md' ? 'Android' : 'iOS'}`}</div>
          <button onClick={onPlatformChange}>{`VIEW: ${
            platform === 'md' ? 'IOS' : 'ANDROID'
          }`}</button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.5rem',
            alignItems: 'center',
          }}
        >
          <button onClick={onIsDarkModeChange}>{`TURN DARK MODE ${
            isDarkMode ? 'OFF' : 'ON'
          }`}</button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem',
            alignItems: 'center',
          }}
        >
          <div>{tab}</div>
          <button onClick={() => setTab(prev => (prev === 'INPUTS' ? 'JSON' : 'INPUTS'))}>
            {`VIEW ${tab === 'INPUTS' ? 'JSON' : 'INPUTS'}`}
          </button>
        </div>
      </div>
      <div
        style={{
          width: `calc(100% - 12rem)`,
          overflow: 'auto',
          maxHeight: '100%',
          height: '100%',
        }}
      >
        {tab === 'INPUTS' ? (
          generatedInputs
        ) : tab === 'JSON' ? (
          <Source code={JSON.stringify(state, null, 2)} language="json" />
        ) : null}
      </div>
    </div>
  )
}

addons.register(ADDON_ID, api => {
  const channel = addons.getChannel()
  addons.addPanel(PANEL_ID, {
    title: 'Theme',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel channel={channel} />
      </AddonPanel>
    ),
  })
})
