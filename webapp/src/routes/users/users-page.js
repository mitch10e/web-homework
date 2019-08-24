import React, { Fragment } from 'react'

import UsersTable from './users-table'

// Data Management
function createUser (id, name, email, created, updated) {
  return { id, name, email, created, updated }
}

const users = [
  createUser(0, 'John Doe', 'john@doe.com', 'created date', 'updated date3'),
  createUser(1, 'Jane Doe', 'jane@doe.com', 'created date2', 'updated date2')
]

export function Users () {
  return (
    <Fragment>
      <UsersTable users={users} />
    </Fragment>
  )
}
