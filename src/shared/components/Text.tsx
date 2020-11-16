/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FC, HTMLAttributes } from 'react'
import { IonText } from '@ionic/react'

type TextProps = {
  element?: 'blockquote' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

export const Text: FC<TextProps & HTMLAttributes<HTMLElement>> = ({
  element: Element = 'div',
  children,
  ...props
}) => (
  <IonText {...props}>
    <Element>{children}</Element>
  </IonText>
)
