/** @jsx jsx */
import { jsx } from '@emotion/core'
import { forwardRef, HTMLAttributes } from 'react'

const alignOptions = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

const spaceOptions = {
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'block' | 'inline'
  blockAlign?: keyof typeof alignOptions
  inlineAlign?: keyof typeof alignOptions
  // eslint-disable-next-line @typescript-eslint/ban-types
  space?: keyof typeof spaceOptions | (string & {})
  stretch?: boolean
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ blockAlign, direction, inlineAlign, space, stretch, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const wellknownSpacing = space && spaceOptions[space as keyof typeof spaceOptions]
    const isBlock = direction === 'block'
    const align = isBlock ? inlineAlign : blockAlign
    const justify = isBlock ? blockAlign : inlineAlign
    const customSpacing = !wellknownSpacing && space

    return (
      <div
        ref={ref}
        css={{
          alignSelf: 'stretch',
          alignItems: stretch ? 'stretch' : (align && alignOptions[align]) || 'flex-start',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: isBlock ? 'column' : 'row',
          justifyContent: wellknownSpacing || (justify && alignOptions[justify]) || 'flex-start',
          position: 'relative',
          '& > *': {
            flexShrink: 0,
            ...(customSpacing && {
              [isBlock ? 'marginBlockStart' : 'marginInlineStart']: customSpacing,
              '&:first-child': {
                [isBlock ? 'marginBlockStart' : 'marginInlineStart']: '0',
              },
            }),
          },
        }}
        {...props}
      />
    )
  }
)

export default Stack
