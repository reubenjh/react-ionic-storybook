/** @jsx jsx */
import { jsx } from '@emotion/core'
import { forwardRef, ComponentProps } from 'react'
import { IonButton } from '@ionic/react'
import { Variant } from 'theme/theme'

export interface ButtonProps extends ComponentProps<typeof IonButton> {
  variant?: Variant
}

export const Button = forwardRef<HTMLIonButtonElement, ButtonProps>(
  ({ variant = 'neutral', ...props }, ref) => {
    return <IonButton color={variant} ref={ref} {...props} />
  }
)
