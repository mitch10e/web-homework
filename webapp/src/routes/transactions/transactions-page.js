import React, { Fragment } from 'react'

import TransactionsTable from './transactions-table'
import { merchants, transactions, users } from './../../network/mock-client'

export function Transactions () {
  return (
    <Fragment>
      <TransactionsTable merchants={merchants} transactions={transactions} users={users} />
    </Fragment>
  )
}
