import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { formStyles } from './../../component-logic/form-styles'

export default function AddUserForm (props) {
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

  const ADD_USER_GQL = gql`
  mutation createUser($name: String, $email: String) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
  `

  return (
    <Fragment>
      <Mutation mutation={ADD_USER_GQL}>
        {(addUser, { loading, data }) => {
          return (
            <form className={classes.container} onSubmit={(event) => {
              const name = values.name
              const email = values.email
              console.log(name)
              addUser({ variables: { name, email } })
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
                <Button
                  className={classes.button}
                  color='primary'
                  onClick={handleClickAdd}
                  type='submit'
                  variant='contained'
                >Add User</Button>
                <Button className={classes.button} color='secondary' onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </Fragment>
  )
}

AddUserForm.propTypes = {
  handleCloseAdd: PropTypes.func.isRequired
}
