/* eslint-disable @typescript-eslint/consistent-type-assertions */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { render, screen } from 'testUtils'
import SignUp from '../SignUp'

describe('Sign up', () => {
  it('renders the component', async () => {
    render(<SignUp />)

    expect(await screen.findByText('signUp:heading')).toBeInTheDocument()
  })
})
