/** @jsx jsx */
import { jsx } from '@emotion/core'
import { forwardRef, HTMLAttributes } from 'react'

export const Block = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    css={{
      position: 'relative',
    }}
    {...props}
  />
))
