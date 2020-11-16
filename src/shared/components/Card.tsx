/** @jsx jsx */
import { jsx } from '@emotion/core'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { forwardRef, HTMLAttributes } from 'react'
import { Variant } from 'theme/theme'
import { useTheme } from 'theme/ThemeContext'
import Stack from './Stack'

interface CardProps extends HTMLAttributes<HTMLIonCardElement> {
  title?: string
  subtitle?: string
  variant?: Variant
}

export const Card = forwardRef<HTMLIonCardElement, CardProps>(
  ({ title, subtitle, children, variant = 'neutral', ...props }, ref) => {
    const { theme } = useTheme()

    return (
      <IonCard color={variant} ref={ref} {...props}>
        {(!!title || !!subtitle) && (
          <IonCardHeader>
            {(!!title || !!subtitle) && (
              <Stack space={theme.space.xs} direction="block">
                {!!title && <IonCardTitle>{title}</IonCardTitle>}
                {!!subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
              </Stack>
            )}
          </IonCardHeader>
        )}
        <IonCardContent>{children}</IonCardContent>
      </IonCard>
    )
  }
)
