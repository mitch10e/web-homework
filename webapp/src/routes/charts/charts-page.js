import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PolarChart from './polar-chart'
import ChartsToolbar from './charts-toolbar'

import Paper from '@material-ui/core/Paper'

export function Charts () {
  const [transactions, setTransactions] = React.useState([])
  const [merchants, setMerchants] = React.useState([])
  const [users, setUsers] = React.useState([])

  const handleDataLoaded = (data) => {
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
    date
    description
  }
}`
      }>
        {({ loading, error, data }) => {
          if (loading) { return <span /> }
          if (error) { return <p>ERROR</p> }

          handleDataLoaded(data)
          return (
            <Fragment>
              <Paper>
                <ChartsToolbar
                  merchants={merchants}
                  transactions={transactions}
                  users={users}
                />
                <PolarChart />
              </Paper>
            </Fragment>
          )
        }}
      </Query>
    </Fragment>
  )
}
