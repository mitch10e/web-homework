import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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

  const EDIT_USER_GQL = gql`
  mutation editUser($id: String, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
  `

  return (
    <Fragment>
      <Mutation mutation={EDIT_USER_GQL}>
        {(editUser, { loading, data }) => {
          return (
            <form className={classes.container} onSubmit={(event) => {
              const id = values.id
              const name = values.name
              const email = values.email.toLowerCase()
              editUser({ variables: { id, name, email } })
            }}>
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
                <Button className={classes.button} color='primary' onClick={handleClickEdit} type='submit' variant='contained'>Update User</Button>
                <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </Fragment>
  )
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  handleCloseEdit: PropTypes.func.isRequired
}
