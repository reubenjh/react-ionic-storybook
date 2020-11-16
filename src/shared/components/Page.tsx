/* eslint-disable react/jsx-fragments */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { FC } from 'react'

interface PageProps {
  title?: string
}

export const Page: FC<PageProps> = ({ children, title }) => {
  return (
    // eslint-disable-next-line react/forbid-component-props
    <IonPage className="base-page">
      <IonHeader>
        <IonToolbar>{!!title && <IonTitle>{title}</IonTitle>}</IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>{children}</IonContent>
    </IonPage>
  )
}
