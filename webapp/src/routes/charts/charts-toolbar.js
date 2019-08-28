import React, { useEffect } from 'react'

import PropTypes from 'prop-types'


export default function ChartsToolbar (props) {
  const { users, merchants, transactions, handleFiltersChangedCallback } = props
  const [filters, setFilters] = React.useState({
    date: 'All',
    merchant: 'All',
    user: 'All'
  })

  const handleChange = name => event => {
    // This is an async call, so it isn't reliable. However, using useEffect causes 
    // infinite render loop. Rock, meet hard place.
    setValues({ ...values, [name]: event.target.value })
  }

  useEffect(() => {
    // Using this causes an infinite render loop and crashes the app...
    // handleFiltersChangedCallback(values)
  })

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

  return (
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
        value={values.date}
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
        value={values.merchant}
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
        value={values.user}
        variant='outlined'
      >
        {getAvailableUsers().map(user => (
          <MenuItem key={user.id} value={user.name}>
            {user.name}
          </MenuItem>
        ))}
      </TextField>
    </Toolbar>
  )
}

ChartsToolbar.propTypes = {
  handleFiltersChangedCallback: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    merchant_id: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    credit: PropTypes.bool.isRequired,
    debit: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
