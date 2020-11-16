/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { themeBase } from './theme'
import { useLayoutEffect } from 'react'
import ColorGenerator from './ColorGenerator'

export const useSetIonTheme = (theme: typeof themeBase) => {
  useLayoutEffect(() => {
    const ionThemeCssString = themeToIonCssString(theme)
    const stylesheetId = 'custom-ion-styles'
    let styleSheet = document.getElementById(stylesheetId)
    if (!styleSheet) {
      const head = window.document.head
      styleSheet = document.createElement('style')
      styleSheet.setAttribute('id', stylesheetId)
      head.appendChild(styleSheet)
    }
    styleSheet.innerHTML = ionThemeCssString
  }, [theme])
}

const themeToIonCssString = (theme: typeof themeBase) => {
  return `
  body.dark {
    ${colorModeToThemeCssString(theme.colors.dark)}
  }
  body.light {
    ${colorModeToThemeCssString(theme.colors.light)}
  }

  :root {
    /* Non-dark-mode specific custom styles go here */
  }

  /* Custom ion color variants */
  
  .ion-color-neutral {
    --ion-color-base: var(--ion-color-neutral);
    --ion-color-base-rgb: var(--ion-color-neutral-rgb);
    --ion-color-contrast: var(--ion-color-neutral-contrast);
    --ion-color-contrast-rgb: var(--ion-color-neutral-contrast-rgb);
    --ion-color-shade: var(--ion-color-neutral-shade);
    --ion-color-tint: var(--ion-color-neutral-tint);
  }

  .ion-color-info {
    --ion-color-base: var(--ion-color-info);
    --ion-color-base-rgb: var(--ion-color-info-rgb);
    --ion-color-contrast: var(--ion-color-info-contrast);
    --ion-color-contrast-rgb: var(--ion-color-info-contrast-rgb);
    --ion-color-shade: var(--ion-color-info-shade);
    --ion-color-tint: var(--ion-color-info-tint);
  }

  `
}

const colorModeToThemeCssString = (
  colors: typeof themeBase['colors']['dark'] | typeof themeBase['colors']['light']
) => {
  const primary = new ColorGenerator(colors.primary)
  const secondary = new ColorGenerator(colors.secondary)
  const info = new ColorGenerator(colors.info)
  const success = new ColorGenerator(colors.success)
  const warning = new ColorGenerator(colors.warning)
  const danger = new ColorGenerator(colors.danger)
  const backgroundColor = new ColorGenerator(colors.neutral.backgroundColor)
  const textColor = new ColorGenerator(colors.neutral.textColor)

  return `--ion-color-primary: ${primary.hex};
    --ion-color-primary-rgb: ${primary.toRgbList()};
    --ion-color-primary-contrast: ${primary.contrast().hex};
    --ion-color-primary-contrast-rgb: ${primary.contrast().toRgbList()};
    --ion-color-primary-shade: ${primary.shade().hex};
    --ion-color-primary-tint: ${primary.tint().hex};

    --ion-color-secondary: ${secondary.hex};
    --ion-color-secondary-rgb: ${secondary.toRgbList()};
    --ion-color-secondary-contrast: ${secondary.contrast().hex};
    --ion-color-secondary-contrast-rgb: ${secondary.contrast().toRgbList()};
    --ion-color-secondary-shade: ${secondary.shade().hex};
    --ion-color-secondary-tint: ${secondary.tint().hex};
    
    --ion-color-success: ${success.hex};
    --ion-color-success-rgb: ${success.toRgbList()};
    --ion-color-success-contrast: ${success.contrast().hex};
    --ion-color-success-contrast-rgb: ${success.contrast().toRgbList()};
    --ion-color-success-shade: ${success.shade().hex};
    --ion-color-success-tint: ${success.tint().hex};
    
    --ion-color-warning: ${warning.hex};
    --ion-color-warning-rgb: ${warning.toRgbList()};
    --ion-color-warning-contrast: ${warning.contrast().hex};
    --ion-color-warning-contrast-rgb: ${warning.contrast().toRgbList()};
    --ion-color-warning-shade: ${warning.shade().hex};
    --ion-color-warning-tint: ${warning.tint().hex};
    
    --ion-color-danger: ${danger.hex};
    --ion-color-danger-rgb: ${danger.toRgbList()};
    --ion-color-danger-contrast: ${danger.contrast().hex};
    --ion-color-danger-contrast-rgb: ${danger.contrast().toRgbList()};
    --ion-color-danger-shade: ${danger.shade().hex};
    --ion-color-danger-tint: ${danger.tint().hex};
    
    --ion-color-info: ${info.hex};
    --ion-color-info-rgb: ${info.toRgbList()};
    --ion-color-info-contrast: ${info.contrast().hex};
    --ion-color-info-contrast-rgb: ${info.contrast().toRgbList()};
    --ion-color-info-shade: ${info.shade().hex};
    --ion-color-info-tint: ${info.tint().hex};
    
    --ion-color-neutral: ${backgroundColor.mix(textColor.hex, 0.1).hex};
    --ion-color-neutral-rgb: ${backgroundColor.mix(textColor.hex, 0.1).toRgbList()};
    --ion-color-neutral-contrast: ${textColor.hex};
    --ion-color-neutral-contrast-rgb: ${textColor.toRgbList()};
    --ion-color-neutral-shade: ${backgroundColor.mix(textColor.hex, 0.15).hex};
    --ion-color-neutral-tint: ${backgroundColor.mix(textColor.hex, 0.05).hex};
    
    --ion-color-light: ${backgroundColor.mix(textColor.hex, 0.1).hex};
    --ion-color-light-rgb: ${backgroundColor.mix(textColor.hex, 0.1).toRgbList()};
    --ion-color-light-contrast: ${textColor.hex};
    --ion-color-light-contrast-rgb: ${textColor.toRgbList()};
    --ion-color-light-shade: ${backgroundColor.mix(textColor.hex, 0.15).hex};
    --ion-color-light-tint: ${backgroundColor.mix(textColor.hex, 0.05).hex};
    
    --ion-color-medium: ${backgroundColor.mix(textColor.hex, 0.1).hex};
    --ion-color-medium-rgb: ${backgroundColor.mix(textColor.hex, 0.1).toRgbList()};
    --ion-color-medium-contrast: ${textColor.hex};
    --ion-color-medium-contrast-rgb: ${textColor.toRgbList()};
    --ion-color-medium-shade: ${backgroundColor.mix(textColor.hex, 0.15).hex};
    --ion-color-medium-tint: ${backgroundColor.mix(textColor.hex, 0.05).hex};

    --ion-color-dark: ${backgroundColor.mix(textColor.hex, 0.1).hex};
    --ion-color-dark-rgb: ${backgroundColor.mix(textColor.hex, 0.1).toRgbList()};
    --ion-color-dark-contrast: ${textColor.hex};
    --ion-color-dark-contrast-rgb: ${textColor.toRgbList()};
    --ion-color-dark-shade: ${backgroundColor.mix(textColor.hex, 0.15).hex};
    --ion-color-dark-tint: ${backgroundColor.mix(textColor.hex, 0.05).hex};
    
    --ion-background-color: ${backgroundColor.hex};
    --ion-background-color-rgb: ${backgroundColor.toRgbList()};
    
    --ion-text-color: ${textColor.hex};
    --ion-text-color-rgb: ${textColor.toRgbList()};
    
    --ion-color-step-50: ${backgroundColor.mix(textColor.hex, 0.05).hex};
    --ion-color-step-100: ${backgroundColor.mix(textColor.hex, 0.1).hex};
    --ion-color-step-150: ${backgroundColor.mix(textColor.hex, 0.15).hex};
    --ion-color-step-200: ${backgroundColor.mix(textColor.hex, 0.2).hex};
    --ion-color-step-250: ${backgroundColor.mix(textColor.hex, 0.25).hex};
    --ion-color-step-300: ${backgroundColor.mix(textColor.hex, 0.3).hex};
    --ion-color-step-350: ${backgroundColor.mix(textColor.hex, 0.35).hex};
    --ion-color-step-400: ${backgroundColor.mix(textColor.hex, 0.4).hex};
    --ion-color-step-450: ${backgroundColor.mix(textColor.hex, 0.45).hex};
    --ion-color-step-500: ${backgroundColor.mix(textColor.hex, 0.5).hex};
    --ion-color-step-550: ${backgroundColor.mix(textColor.hex, 0.55).hex};
    --ion-color-step-600: ${backgroundColor.mix(textColor.hex, 0.6).hex};
    --ion-color-step-650: ${backgroundColor.mix(textColor.hex, 0.65).hex};
    --ion-color-step-700: ${backgroundColor.mix(textColor.hex, 0.7).hex};
    --ion-color-step-750: ${backgroundColor.mix(textColor.hex, 0.75).hex};
    --ion-color-step-800: ${backgroundColor.mix(textColor.hex, 0.8).hex};
    --ion-color-step-850: ${backgroundColor.mix(textColor.hex, 0.85).hex};
    --ion-color-step-900: ${backgroundColor.mix(textColor.hex, 0.9).hex};
    --ion-color-step-950: ${backgroundColor.mix(textColor.hex, 0.95).hex};
  `
}

/*

Uncustomised ion CSS globals 

--ion-backdrop-color
  --ion-backdrop-opacity
  --ion-overlay-background-color
  --ion-border-color
  --ion-box-shadow-color
  --ion-tab-bar-background
  --ion-tab-bar-background-focused
  --ion-tab-bar-border-color
  --ion-tab-bar-color
  --ion-tab-bar-color-selected
  --ion-toolbar-background
  --ion-toolbar-border-color
  --ion-toolbar-color
  --ion-toolbar-segment-color
  --ion-toolbar-segment-color-checked
  --ion-toolbar-segment-background
  --ion-toolbar-segment-background-checked
  --ion-toolbar-segment-indicator-color
  --ion-item-background
  --ion-item-border-color
  --ion-item-color
  --ion-placeholder-color

  */
