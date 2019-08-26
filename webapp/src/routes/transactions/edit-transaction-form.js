import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { formStyles } from './../../component-logic/form-styles'

export default function EditTransactionForm (props) {
  const classes = formStyles()
  const { transaction, users, merchants, handleCloseEdit } = props
  const currentUser = users.find(user => user.id === transaction.user)
  const currentMerchant = merchants.find(merchant => merchant.id === transaction.merchant)

  const [values, setValues] = React.useState({
    id: transaction.id,
    user: currentUser.name,
    merchant: currentMerchant.name,
    cost: transaction.cost,
    tax: transaction.tax
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleClickEdit = () => {
    handleCloseEdit()
  }

  const handleCancel = () => {
    handleCloseEdit()
  }

  return (
    <form className={classes.container}>
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
        onChange={handleChange('user')}
        select
        value={values.user}
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
        onChange={handleChange('merchant')}
        select
        value={values.merchant}
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
      <div className={classes.actions}>
        <Button className={classes.button} color='primary' onClick={handleClickEdit} variant='contained'>Update Transaction</Button>
        <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  )
}

EditTransactionForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    merchant: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired
  }).isRequired,
  handleCloseEdit: PropTypes.func.isRequired
}
