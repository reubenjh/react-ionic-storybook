/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useI18n } from 'i18n/I18nContext'
import { FC } from 'react'
import { Text, Page, Button } from 'shared/components'
import { Card } from 'shared/components/Card'
import Stack from 'shared/components/Stack'
import { useTheme } from 'theme/ThemeContext'

const LoginPage = () => {
  const { t } = useI18n({
    translationNamespace: 'login',
  })

  const { theme } = useTheme()

  return (
    <Page title={t('heading')}>
      <Stack
        css={{
          padding: theme.space.md,
          inlineSize: '100%',
        }}
        stretch={true}
        space={theme.space.md}
        direction="block"
      >
        {[...Array(3)].map((_, i) => (
          <ExampleCard key={i} />
        ))}
      </Stack>
    </Page>
  )
}

export default LoginPage

const ExampleCard: FC = props => {
  const { setIsDarkMode, theme } = useTheme()
  return (
    <Card title={'Title'} subtitle={'Subtitle'} {...props}>
      <Stack direction="block" space={theme.space.sm}>
        <Text>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        </Text>
        <Text>
          {
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }
        </Text>
        <Stack inlineAlign="end" space={theme.space.sm}>
          <Button variant="primary">{'View'}</Button>
          <Button variant="neutral" onClick={() => setIsDarkMode(p => !p)}>
            {'Toggle dark mode'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}
