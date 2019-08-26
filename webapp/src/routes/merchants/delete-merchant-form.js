import React, { Fragment } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Material UI - Dialog
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

// Styling
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  dialogActions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  dialogButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flex: '0 0 auto'
  }
}))

export default function DeleteMerchantForm (props) {
  const classes = useStyles()
  const { selectedMerchants, handleCloseDelete } = props

  function handleDeleteItems () {
    handleCloseDelete()
  }

  const DELETE_MERCHANTS_GQL = gql`
  mutation DeleteMerchants($ids: [String]) {
    deleteMerchants(ids: $ids) {
      id
    }
  }
  `

  return (
    <Fragment>
      <Mutation mutation={DELETE_MERCHANTS_GQL}>
        {(deleteMerchants, { loading, data }) => {
          return (
            <form onSubmit={(event) => {
              const ids = selectedMerchants
              deleteMerchants({ variables: { ids } })
            }}>
              <DialogContent>
                <DialogContentText>
                  Hitting delete will proceed to delete the selected {selectedMerchants.length > 1 ? 'merchants' : 'merchant'}. Please note that this action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.dialogActions}>
                <Button className={classes.dialogButton} color='primary' onClick={handleCloseDelete}>Cancel</Button>
                <Button className={classes.dialogButton} color='secondary' onClick={handleDeleteItems} type='submit' variant='contained'>Delete</Button>
              </DialogActions>
            </form>
          )
        }}
      </Mutation>
    </Fragment>
  )
}

DeleteMerchantForm.propTypes = {
  selectedMerchants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleCloseDelete: PropTypes.func.isRequired
}
