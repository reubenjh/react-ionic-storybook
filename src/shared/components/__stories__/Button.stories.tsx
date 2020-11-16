/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import { capitaliseString, disabledControl, StoryGrid, StoryLabel } from 'storybookUtils'
import { Button } from '../Button'
import { variants } from 'theme/theme'

const meta: Meta<ComponentProps<typeof Button>> = {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
  argTypes: {
    children: { control: 'text' },
    variant: disabledControl(),
    routerLink: disabledControl(),
    routerDirection: disabledControl(),
    routerOptions: disabledControl(),
  },
}

export default meta

export const Index: Story<ComponentProps<typeof Button>> = props => {
  return (
    <StoryGrid cols={variants.length + 1}>
      <div />
      {variants.map(v => (
        <StoryLabel key={`${v}-label`} text={capitaliseString(v)} />
      ))}
      <div />
      {variants.map(v => (
        <Button key={v} {...props} variant={v} />
      ))}
      <StoryLabel text="Disabled" line="right" />
      {variants.map(v => (
        <Button key={`${v}-disabled`} {...props} variant={v} disabled={true} />
      ))}
    </StoryGrid>
  )
}
