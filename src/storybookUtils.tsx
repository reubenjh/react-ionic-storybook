/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FC } from 'react'

export const disabledControl = () => ({
  table: {
    disable: true,
  },
})

export const capitaliseString = (s: string) => `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`

interface StoryGridProps {
  cols?: number
  rowGap?: number
  colGap?: number
  size?: 'auto' | 'even'
}

export const StoryGrid: FC<StoryGridProps> = ({
  children,
  cols = 1,
  rowGap = 1,
  colGap = 1,
  size = 'auto',
}) => {
  return (
    <div
      css={{
        display: 'inline-grid',
        gridTemplateColumns: `${size === 'even' ? '1fr' : 'auto'} `.repeat(cols).trimEnd(),
        minWidth: '0',
        gridAutoRows: 'min-content',
        columnGap: `${colGap}rem`,
        rowGap: `${rowGap}rem`,
      }}
    >
      {children}
    </div>
  )
}

interface StoryLabelProps {
  colSpan?: number
  text: string
  line?: 'top' | 'right' | 'bottom' | 'left'
}

export const StoryLabel: FC<StoryLabelProps> = ({
  colSpan: columnSpan = 1,
  text,
  line = 'bottom',
}) => {
  const borderKey = `border${line.slice(0, 1).toUpperCase()}${line.slice(1)}`

  return (
    <div
      css={{
        display: 'grid',
        gridColumn: `span ${columnSpan}`,
        userSelect: 'none',
      }}
    >
      <div
        css={{
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          inlineSize: '100%',
          blockSize: '100%',
          padding: '0.5rem',
          color: '#aaa',
          [borderKey]: '2px solid #ddd',
        }}
      >
        {text}
      </div>
    </div>
  )
}
