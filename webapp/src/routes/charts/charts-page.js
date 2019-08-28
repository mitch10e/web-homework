import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { useTranslation } from 'react-i18next'

import Chart from './chart'

import {
  Toolbar,
  TextField,
  MenuItem,
  Paper
} from '@material-ui/core'

export function Charts () {
  const { t } = useTranslation()
  const [transactions, setTransactions] = React.useState([])
  const [merchants, setMerchants] = React.useState([])
  const [users, setUsers] = React.useState([])

  const [filter, setFilter] = React.useState(t('date'))
  const [chart, setChart] = React.useState(t('bar'))

  const handleChange = name => event => {
    setFilter(event.target.value)
  }

  const handleChart = name => event => {
    setChart(event.target.value)
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
                    label={t('filter')}
                    margin='normal'
                    onChange={handleChange('filter')}
                    select
                    value={filter}
                    variant='outlined'
                  >
                    {[t('date'), t('merchant'), t('user')].map(f => (
                      <MenuItem key={f} value={f}>
                        {f}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    css={{
                      width: 250,
                      marginLeft: 16
                    }}
                    id='outlined-select-chart'
                    label={t('chartType')}
                    margin='normal'
                    onChange={handleChart('chart')}
                    select
                    value={chart}
                    variant='outlined'
                  >
                    {[t('bar'), t('pie'), t('polar')].map(c => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Toolbar>
                <Chart chart={chart} filter={filter} merchants={merchants} transactions={transactions} users={users} />
              </Paper>
            </Fragment>
          )
        }}
      </Query>
    </Fragment>
  )
}
