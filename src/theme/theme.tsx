/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
//
// Theme base
//

import ColorGenerator from './ColorGenerator'

const colorValuesLight = {
  primary: '#00c65e',
  secondary: '#f67599',
  info: '#0f6fff',
  success: '#4bd14f',
  warning: '#f2ce04',
  danger: '#ff3542',
  neutral: {
    backgroundColor: '#ffffff',
    textColor: '#1e1a34',
  },
}

const colorValuesDark = {
  primary: '#00a34c',
  secondary: '#f33f72',
  info: '#0052cc',
  success: '#2aa22e',
  warning: '#deb202',
  danger: '#cc000e',
  neutral: {
    backgroundColor: '#1e1a34',
    textColor: '#ffffff',
  },
}

const transparencyValues = {
  0: '0.08',
  1: '0.16',
  2: '0.24',
  3: '0.32',
  4: '0.4',
  5: '0.48',
}

const fontSizeValues = {
  base: 1,
  unit: 'rem',
  values: {
    xxs: 0.5625,
    xs: 0.6875,
    sm: 0.8125,
    md: 1,
    lg: 1.1875,
    xl: 1.5,
    xxl: 1.875,
    xxxl: 2.5,
    xxxxl: 3.25,
  },
}

// 0.5rem === 8px (8dp grid)
const spaceValues = {
  baseIos: 0.625,
  baseAndroid: 0.5,
  unit: 'rem',
  values: {
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 4,
    xl: 8,
  },
}

const themeBaseValue = {
  colors: {
    dark: colorValuesDark,
    light: colorValuesLight,
    transparency: transparencyValues,
  },
  fontSizes: fontSizeValues,
  space: spaceValues,
}

//
// Build theme
//

const buildSpace = (space: typeof spaceValues, isIos: boolean) => {
  const { baseIos, baseAndroid, unit, values } = space
  const base = isIos ? baseIos : baseAndroid

  const spaceKeys = Object.keys(values) as (keyof typeof values)[]
  const spaces = spaceKeys.reduce<Record<keyof typeof values, string>>((res, k) => {
    res[k] = `${base * values[k]}${unit}`
    return res
  }, {} as Record<keyof typeof values, string>)

  return Object.assign(
    (...args: ('0' | keyof typeof values)[]) =>
      args.map(s => (s === '0' ? '0' : values[s])).join(' '),
    spaces
  )
}

const buildFontSizes = (fontSizes: typeof fontSizeValues) => {
  const { base, unit, values } = fontSizes

  return (Object.keys(values) as (keyof typeof values)[]).reduce<
    Record<keyof typeof values, string>
  >((res, k) => {
    res[k] = `${base * values[k]}${unit}`
    return res
  }, {} as Record<keyof typeof values, string>)
}

const buildColors = (colors: typeof themeBaseValue['colors'], isDarkMode: boolean) => {
  const { neutral, ...otherColors } = isDarkMode ? colors.dark : colors.light
  const generatedColors = Object.keys(otherColors).reduce<
    Record<
      keyof typeof otherColors,
      {
        base: string
        contrast: string
        shade: string
        tint: string
      }
    >
  >((res, k) => {
    const base = otherColors[k as keyof typeof otherColors]
    const gen = new ColorGenerator(base)
    res[k as keyof typeof otherColors] = {
      base,
      contrast: gen.contrast().hex,
      shade: gen.shade().hex,
      tint: gen.tint().hex,
    }
    return res
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any)

  const neutralGenerator = new ColorGenerator(neutral.backgroundColor)
  const generatedNeutrals = {
    0: neutralGenerator.mix(neutral.textColor, 0).hex,
    50: neutralGenerator.mix(neutral.textColor, 0.05).hex,
    100: neutralGenerator.mix(neutral.textColor, 0.1).hex,
    150: neutralGenerator.mix(neutral.textColor, 0.15).hex,
    200: neutralGenerator.mix(neutral.textColor, 0.2).hex,
    250: neutralGenerator.mix(neutral.textColor, 0.25).hex,
    300: neutralGenerator.mix(neutral.textColor, 0.3).hex,
    350: neutralGenerator.mix(neutral.textColor, 0.35).hex,
    400: neutralGenerator.mix(neutral.textColor, 0.4).hex,
    450: neutralGenerator.mix(neutral.textColor, 0.45).hex,
    500: neutralGenerator.mix(neutral.textColor, 0.5).hex,
    550: neutralGenerator.mix(neutral.textColor, 0.55).hex,
    600: neutralGenerator.mix(neutral.textColor, 0.6).hex,
    650: neutralGenerator.mix(neutral.textColor, 0.65).hex,
    700: neutralGenerator.mix(neutral.textColor, 0.7).hex,
    750: neutralGenerator.mix(neutral.textColor, 0.75).hex,
    800: neutralGenerator.mix(neutral.textColor, 0.8).hex,
    850: neutralGenerator.mix(neutral.textColor, 0.85).hex,
    900: neutralGenerator.mix(neutral.textColor, 0.9).hex,
    950: neutralGenerator.mix(neutral.textColor, 0.95).hex,
    1000: neutralGenerator.mix(neutral.textColor, 1).hex,
  }

  return {
    ...generatedColors,
    neutral: generatedNeutrals,
    transparency: (hexColor: string, transparency: keyof typeof colors.transparency) => {
      let fullHex: string[] = []
      if (hexColor.length < 4) {
        fullHex = ['0', '0', '0']
      } else if (hexColor.length < 7) {
        fullHex = Array.from(hexColor.slice(1, 4)).map(s => s.repeat(2))
      } else {
        fullHex = [hexColor.slice(1, 3), hexColor.slice(3, 5), hexColor.slice(5, 7)]
      }
      const [r, g, b] = fullHex.map(h => parseInt(h, 16))
      return `rgba(${r},${g},${b},${colors.transparency[transparency]})`
    },
  }
}

export const buildTheme = (
  themeBase: typeof themeBaseValue,
  isDarkMode: boolean,
  isIos: boolean
) => {
  return {
    space: buildSpace(themeBase.space, isIos),
    fontSizes: buildFontSizes(themeBase.fontSizes),
    colors: buildColors(themeBase.colors, isDarkMode),
  }
}

export const themeBase = themeBaseValue

export const variants = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'danger',
  'neutral',
] as const

export type Variant = typeof variants[number]
