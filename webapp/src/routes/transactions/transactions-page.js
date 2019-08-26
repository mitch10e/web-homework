import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import TransactionsTable from './transactions-table'

export function Transactions () {
  const [transactions, setTransactions] = React.useState([])
  const [merchants, setMerchants] = React.useState([])
  const [users, setUsers] = React.useState([])

  const handleTransactionsLoaded = (data) => {
    setTransactions(data.transactions)
    setMerchants(data.merchants)
    setUsers(data.users)
  }

  return (
    <Fragment>
      <Query query={gql`query GetTransactionData {
  users {
    id
    name
    email
  }
  merchants {
    id
    name
    email
  }
  transactions {
    id
    user_id
    merchant_id
    cost
    tax
    debit
    credit
    description
  }
}`
      }>
        {({ loading, error, data }) => {
          if (loading) { return <span /> }
          if (error) { return <p>ERROR</p> }

          handleTransactionsLoaded(data)
          return (
            <TransactionsTable merchants={merchants} transactions={transactions} users={users} />
          )
        }}
      </Query>
    </Fragment>
  )
}
