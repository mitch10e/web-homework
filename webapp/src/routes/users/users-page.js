import React, { Fragment } from 'react'

import UsersTable from './users-table'
import { users } from './../../network/mock-client'

export function Users () {
  return (
    <Fragment>
      <UsersTable users={users} />
    </Fragment>
  )
}
