/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Text } from 'shared/components'
import { useI18n } from 'i18n/I18nContext'
import { Page } from 'shared/components/Page'

const NotFoundPage = () => {
  const { t } = useI18n({
    translationNamespace: 'notFound',
  })

  return (
    <Page title={t('heading')}>
      <Text>{'some content'}</Text>
    </Page>
  )
}

export default NotFoundPage
