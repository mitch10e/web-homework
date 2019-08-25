import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
  }
}))

export default function AddMerchantForm (props) {
  const classes = formStyles()
  const { handleCloseAdd } = props

  const [values, setValues] = React.useState({
    name: '',
    email: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleClickAdd = () => {
    handleCloseAdd()
  }

  const handleCancel = () => {
    handleCloseAdd()
  }

  return (
    <form className={classes.container}>
      <TextField
        className={classes.textField}
        fullWidth
        id='name'
        label='Name'
        onChange={handleChange('name')}
        value={values.name}
        variant='outlined'
      />
      <TextField
        className={classes.textField}
        fullWidth
        id='email'
        label='Email'
        onChange={handleChange('email')}
        type='email'
        value={values.email}
        variant='outlined'
      />
      <div className={classes.actions}>
        <Button className={classes.button} color='primary' onClick={handleClickAdd} variant='contained'>Add Merchant</Button>
        <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  )
}

AddMerchantForm.propTypes = {
  handleCloseAdd: PropTypes.func.isRequired
}
