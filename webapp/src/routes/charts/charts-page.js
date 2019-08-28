import React, { Fragment, useEffect } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PolarChart from './polar-chart'

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

  const [filters, setFilters] = React.useState({
    date: 'All',
    merchant: 'All',
    user: 'All'
  })
  const [filteredTransactions, setFilteredTransactions] = React.useState([])

  const handleChange = name => event => {
    setFilters({ ...filters, [name]: event.target.value })
  }

  useEffect(() => {
    const filtered = handleFiltersChanged(filters)
    setFilteredTransactions(filtered)
    console.log(filters)
  }, [filters])

  const getAvailableDates = () => {
    var result = ['All']
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.date) === -1) {
        result.push(transaction.date)
      }
    })
    return result
  }

  const getAvailableMerchants = () => {
    var result = [{ id: 'all', name: 'All' }]
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.merchant_id) === -1) {
        const merchant = merchants.find(merchant => merchant.id === transaction.merchant_id)
        if (merchant) {
          result.push(merchant)
        }
      }
    })
    return result
  }

  const getAvailableUsers = () => {
    var result = [{ id: 'all', name: 'All' }]
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.user_id) === -1) {
        const user = users.find(user => user.id === transaction.user_id)
        if (user) {
          result.push(user)
        }
      }
    })
    return result
  }

  const handleDataLoaded = (data) => {
    setTransactions(data.transactions)
    setMerchants(data.merchants)
    setUsers(data.users)
  }

  const handleFiltersChanged = (filters) => {
    var result = []
    const allDates = filters.date === 'All'
    const allMerchants = filters.merchant === 'All'
    const allUsers = filters.user === 'All'

    transactions.forEach((transaction, index) => {
      const validDate = allDates || transaction.date === filters.date
      const validMerchant = allMerchants || transaction.merchant_id === merchants.find(merchant => merchant.name === filters.merchant).id
      const validUser = allUsers || transaction.user_id === users.find(user => user.name === filters.user).id

      if (validDate && validMerchant && validUser) {
        result.push(transaction)
      }
    })

    return result
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
                    id='outlined-select-date'
                    label='Date'
                    margin='normal'
                    onChange={handleChange('date')}
                    select
                    value={filters.date}
                    variant='outlined'
                  >
                    {getAvailableDates().map(date => (
                      <MenuItem key={date} value={date}>
                        {date}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    css={{
                      width: 250,
                      marginLeft: 16
                    }}
                    id='outlined-select-merchant'
                    label='Merchant'
                    margin='normal'
                    onChange={handleChange('merchant')}
                    select
                    value={filters.merchant}
                    variant='outlined'
                  >
                    {getAvailableMerchants().map(merchant => (
                      <MenuItem key={merchant.id} value={merchant.name}>
                        {merchant.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    css={{
                      width: 250,
                      marginLeft: 16
                    }}
                    id='outlined-select-user'
                    label='User'
                    margin='normal'
                    onChange={handleChange('user')}
                    select
                    value={filters.user}
                    variant='outlined'
                  >
                    {getAvailableUsers().map(user => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Toolbar>
                <PolarChart transactions={filteredTransactions} />
              </Paper>
            </Fragment>
          )
        }}
      </Query>
    </Fragment>
  )
}
