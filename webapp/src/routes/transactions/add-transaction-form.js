import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { formStyles } from './../../component-logic/form-styles'

// Date Picker
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

export default function AddTransactionForm (props) {
  const classes = formStyles()
  const { users, merchants, handleCloseAdd } = props
  const [values, setValues] = React.useState({
    user_id: '',
    merchant_id: '',
    cost: '',
    tax: '',
    date: new Date(),
    type: '',
    description: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const getUserNameByID = (id) => {
    if (!id) return ''
    return users.find(user => user.id === id).name
  }

  const getMerchantNameByID = (id) => {
    if (!id) return ''
    return merchants.find(merchant => merchant.id === values.merchant_id).name
  }

  const handleChangeSelectUser = (name) => event => {
    // This is not a good way to handle this, as duplicate user names will collide and
    // you could possibly assign the wrong user. However, I don't want to use up too
    // much time on this trying to get the data validation correct, so for now
    // this will have to do.
    let username = event.target.value
    let userID = users.find(user => user.name === username).id

    setValues({ ...values, [name]: userID })
  }

  const handleChangeSelectMerchant = (name) => event => {
    // This is not a good way to handle this, as duplicate merchant names will collide and
    // you could possibly assign the wrong merchant. However, I don't want to use up too
    // much time on this trying to get the data validation correct, so for now
    // this will have to do.
    let merchantName = event.target.value
    let merchantID = merchants.find(merchant => merchant.name === merchantName).id

    setValues({ ...values, [name]: merchantID })
  }

  const handleClickAdd = () => {
    handleCloseAdd()
  }

  const handleCancel = () => {
    handleCloseAdd()
  }

  const ADD_TRANSACTION_GQL = gql`
  mutation createTransaction($user_id: String, $merchant_id: String, $cost: Float, $tax: Float, $date: String, $debit: Boolean, $credit: Boolean, $description: String) {
    addTransaction(user_id: $user_id, merchant_id: $merchant_id, cost: $cost, tax: $tax, date: $date, debit: $debit, credit: $credit, description: $description) {
      id
    }
  }
  `

  return (
    <Fragment>
      <Mutation mutation={ADD_TRANSACTION_GQL}>
        {(addTransaction, { loading, data }) => {
          return (
            <form className={classes.container} onSubmit={(event) => {
              const userID = values.user_id
              const merchantID = values.merchant_id
              const cost = parseFloat(values.cost)
              const tax = parseFloat(values.tax)
              const date = values.date
              const credit = values.type === 'Credit'
              const debit = values.type === 'Debit'
              const description = values.description
              addTransaction({ variables: { user_id: userID, merchant_id: merchantID, cost, tax, date, debit, credit, description } })
            }}>
              <TextField
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                className={classes.textField}
                fullWidth
                helperText='Please select the user that made this transaction'
                id='outlined-select-user'
                label='User'
                margin='normal'
                onChange={handleChangeSelectUser('user_id')}
                select
                value={getUserNameByID(values.user_id)}
                variant='outlined'
              >
                {users.map(user => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                className={classes.textField}
                fullWidth
                helperText='Please select the merchant that fulfilled this transaction'
                id='outlined-select-merchant'
                label='Merchant'
                margin='normal'
                onChange={handleChangeSelectMerchant('merchant_id')}
                select
                value={getMerchantNameByID(values.merchant_id)}
                variant='outlined'
              >
                {merchants.map(merchant => (
                  <MenuItem key={merchant.id} value={merchant.name}>
                    {merchant.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                className={classes.textField}
                fullWidth
                helperText='The amount of the transaction without tax'
                id='outlined-adornment-cost'
                label='Cost'
                onChange={handleChange('cost')}
                value={values.cost}
                variant='outlined'
              />
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                className={classes.textField}
                fullWidth
                id='outlined-adornment-tax'
                label='Tax'
                onChange={handleChange('tax')}
                value={values.tax}
                variant='outlined'
              />
              <TextField
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                className={classes.textField}
                fullWidth
                helperText='Debit or Credit?'
                id='outlined-select-merchant'
                label='Type'
                margin='normal'
                onChange={handleChange('type')}
                select
                value={values.type}
                variant='outlined'
              >
                {['Credit', 'Debit'].map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  className={classes.textField}
                  disableFuture
                  disableToolbar
                  format='MM/dd/yyyy'
                  fullWidth
                  id='date-picker-inline'
                  inputVariant='outlined'
                  label='Date'
                  onChange={handleChange('date')}
                  value={values.date}
                />
              </MuiPickersUtilsProvider>
              <TextField
                className={classes.textField}
                fullWidth
                id='outlined-adornment-description'
                label='Description'
                multiline
                onChange={handleChange('description')}
                rows='5'
                value={values.description}
                variant='outlined'
              />
              <div className={classes.actions}>
                <Button className={classes.button} color='primary' onClick={handleClickAdd} type='submit' variant='contained'>Add Transaction</Button>
                <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </Fragment>
  )
}

AddTransactionForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  handleCloseAdd: PropTypes.func.isRequired
}
