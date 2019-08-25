import React, { Fragment } from 'react'

import TransactionsTable from './transactions-table'

function createTransaction (id, user, merchant, cost, tax, date) {
  return { id, user, merchant, cost, tax, date }
}

const transactions = [
  createTransaction(10, 'John Doe', 'ABC Company', 3.00, 0.14, '05/24/2019'),
  createTransaction(12, 'John Doe', 'XYZ Company', 4.00, 0.18, '05/25/2019'),
  createTransaction(23, 'John Doe', 'MNO Company', 5.00, 0.16, '05/26/2019'),
  createTransaction(39, 'Jane Doe', 'ABC Company', 15.00, 0.14, '05/23/2019')
]

export function Transactions () {
  return (
    <Fragment>
      <TransactionsTable transactions={transactions} />
    </Fragment>
  )
}
