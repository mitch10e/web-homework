import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import UsersTable from './users-table'

export default function Users () {
  const [users, setUsers] = React.useState([])

  const handleUsersLoaded = (data) => {
    setUsers(data.users)
  }

  return (
    <Fragment>
      <Query query={gql`query GetUsers {
      users {
        id
        name
        email
      }
    }`
      }>
        {({ loading, error, data }) => {
          if (loading) { return <span /> }
          if (error) { return <p>ERROR</p> }

          handleUsersLoaded(data)
          return (
            <UsersTable users={users} />
          )
        }}
      </Query>
    </Fragment>
  )
}
