import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core'

// Styling
const formStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}))

export default function AddTransactionForm (props) {
  const classes = formStyles()
  const { users, merchants } = props
  const [values, setValues] = React.useState({
    user: '',
    merchant: '',
    cost: '',
    tax: '',
    date: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
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
        <Button className={classes.button} color='primary' variant='contained'>Add Transaction</Button>
        <Button className={classes.button} color='secondary'>Cancel</Button>
      </div>
    </form>
  )
}

AddTransactionForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

AddTransactionForm.defaultProps = {
  users: [{ id: -1, name: 'Please create a user' }],
  merchants: [{ id: -1, name: 'Please create a merchant' }]
}
