/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import { Card } from '../Card'

const meta: Meta<ComponentProps<typeof Card>> = {
  title: 'Shared/Card',
  component: Card,
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta

const Template: Story<ComponentProps<typeof Card>> = props => <Card {...props} />

export const Index = Template.bind({})
