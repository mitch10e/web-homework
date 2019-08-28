import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Users from './../src/routes/users/users-page'
import { MockedProvider } from '@apollo/react-testing'
import gql from 'graphql-tag'

const GET_USERS_GQL = gql`query GetUsers {
  users {
    id
    name
    email
  }
}`

const mocks = [
  {
    request: {
      query: GET_USERS_GQL
    },
    result: {
      data: {}
    }
  }
]

test('Opens the add new user dialog', async () => {
  const url = '/users'
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Users />
    </MockedProvider>
  )

  fireEvent.click(getByTestId(document.body, 'add-user-button'))

  const addUserDialogTitle = await waitForElement(() => {
    getByTestId('add-item-dialog')
  })

  expect(getByTestId('add-item-dialog')).toHaveTextContent('Add New User')
})