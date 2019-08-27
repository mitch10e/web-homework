import React from 'react'

import PropTypes from 'prop-types'
import {
  Toolbar,
  TextField,
  MenuItem
} from '@material-ui/core'

export default function ChartsToolbar (props) {
  const { users, merchants, transactions } = props

  const [values, setValues] = React.useState({
    date: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const getAvailableDates = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.date) === -1) {
        result.push(transaction.date)
      }
    })
    return result
  }

  const getTransactionsForDate = (date) => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (transaction.date === date) {
        result.push(transaction)
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
    </Toolbar>
  )
}

ChartsToolbar.propTypes = {
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
