import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Chart from './chart'

import {
  Toolbar,
  TextField,
  MenuItem,
  Paper
} from '@material-ui/core'

export function Charts () {
  const [transactions, setTransactions] = React.useState([])
  const [merchants, setMerchants] = React.useState([])
  const [users, setUsers] = React.useState([])

  const [filter, setFilter] = React.useState('Date')

  const handleChange = name => event => {
    setFilter(event.target.value)
  }

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
                <Toolbar>
                  <TextField
                    css={{
                      width: 250
                    }}
                    id='outlined-select-filter'
                    label='Filter'
                    margin='normal'
                    onChange={handleChange('filter')}
                    select
                    value={filter}
                    variant='outlined'
                  >
                    {['Date', 'Merchant', 'User'].map(f => (
                      <MenuItem key={f} value={f}>
                        {f}
                      </MenuItem>
                    ))}
                  </TextField>
                </Toolbar>
                <Chart filter={filter} merchants={merchants} transactions={transactions} users={users} />
              </Paper>
            </Fragment>
          )
        }}
      </Query>
    </Fragment>
  )
}
