/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useI18n } from 'i18n/I18nContext'
import { Text } from 'shared/components'
import { Page } from 'shared/components/Page'

const SignUpPage = () => {
  const { t } = useI18n({
    translationNamespace: 'signUp',
  })

  return (
    <Page title={t('heading')}>
      <Text>{'some content'}</Text>
    </Page>
  )
}

export default SignUpPage
