/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useI18n } from 'i18n/I18nContext'
import { Page } from 'shared/components/Page'
import { Text } from 'shared/components'

const SomethingWentWrongPage = () => {
  const { t } = useI18n({
    translationNamespace: 'dashboard',
  })

  return (
    <Page title={t('heading')}>
      <Text>{'some content'}</Text>
    </Page>
  )
}

export default SomethingWentWrongPage
