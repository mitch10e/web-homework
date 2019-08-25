import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { formStyles } from './../../component-logic/form-styles'

export default function EditUserForm (props) {
  const classes = formStyles()
  const { user, handleCloseEdit } = props

  const [values, setValues] = React.useState({
    id: user.id,
    name: user.name,
    email: user.email
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
        <Button className={classes.button} color='primary' onClick={handleClickEdit} variant='contained'>Update User</Button>
        <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  )
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  handleCloseEdit: PropTypes.func.isRequired
}
