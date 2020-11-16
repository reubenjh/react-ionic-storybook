/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Story, Meta } from '@storybook/react'
import { ComponentProps, Fragment } from 'react'
import { disabledControl } from 'storybookUtils'
import { Stack } from '../Stack'

const meta: Meta<ComponentProps<typeof Stack>> = {
  title: 'Shared/Stack',
  component: Stack,
  argTypes: {
    space: {
      control: 'text',
      description: `Also accepts a string such as 16px`,
    },
    direction: {
      defaultValue: 'inline',
    },
    blockAlign: {
      defaultValue: 'start',
    },
    inlineAlign: {
      defaultValue: 'start',
    },
    stretch: {
      defaultValue: false,
    },
    children: disabledControl(),
  },
}

export default meta

const Template: Story<ComponentProps<typeof Stack>> = props => <Stack {...props} />

export const Index = Template.bind({})
Index.args = {
  children: (
    <Fragment>
      <div
        style={{
          backgroundColor: '#E02D51',
          minInlineSize: '4rem',
          minBlockSize: '4rem',
          borderRadius: '1rem',
        }}
      />
      <div
        style={{
          backgroundColor: '#FFBA30',
          minInlineSize: '4rem',
          minBlockSize: '6rem',
          borderRadius: '1rem',
        }}
      />
      <div
        style={{
          backgroundColor: '#40BD5D',
          minInlineSize: '5rem',
          minBlockSize: '5rem',
          borderRadius: '1rem',
        }}
      />
      <div
        style={{
          backgroundColor: '#2285F5',
          minInlineSize: '7rem',
          minBlockSize: '3rem',
          borderRadius: '1rem',
        }}
      />
    </Fragment>
  ),
}
