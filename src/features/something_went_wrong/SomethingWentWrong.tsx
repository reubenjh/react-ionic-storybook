/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FC } from 'react'
import { useI18n } from 'i18n/I18nContext'
import { Page } from 'shared/components/Page'
import { Text } from 'shared/components'
import { useLocation } from 'react-router'
import { routes } from 'routes'
import { Trans } from 'react-i18next'

const getPreviousPathFromLocationState = (state: unknown): string | undefined => {
  const previousPath =
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    typeof state === 'object' && state && (state as Record<PropertyKey, unknown>).previousPath
  return typeof previousPath === 'string' ? previousPath : undefined
}

const SomethingWentWrongPage: FC = () => {
  const previousPath = getPreviousPathFromLocationState(useLocation().state)
  const shouldShowBackLink = !!previousPath && previousPath !== routes.somethingWentWrong

  const { t } = useI18n({
    translationNamespace: 'somethingWentWrong',
  })

  return (
    <Page title={t('heading')}>
      <Text element="p">{t('message')}</Text>
      {shouldShowBackLink ? (
        <Trans
          i18nKey="somethingWentWrong:go_back_or_return_home"
          components={{
            wrapper: <Text element="p" />,
            backlink: <a href={previousPath} />,
            homelink: <a href={routes.root} />,
          }}
        />
      ) : (
        <Trans
          i18nKey="somethingWentWrong:return_home"
          components={{
            wrapper: <Text element="p" />,
            homelink: <a href={routes.root} />,
          }}
        />
      )}
    </Page>
  )
}

export default SomethingWentWrongPage
