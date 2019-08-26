import React, { Fragment } from 'react'

export default function DeleteUserForm (props) {
  const { selectedUsers } = props

  return (
    <Fragment>
      <DialogContent>
        <DialogContentText>
          Hitting delete will proceed to delete the selected {selected.length > 1 ? 'users' : 'user'}. Please note that this action cannot be undone.
          </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.dialogButton} color='primary' onClick={handleCloseDelete}>Cancel</Button>
        <Button className={classes.dialogButton} color='secondary' onClick={handleDeleteItems} variant='contained'>Delete</Button>
      </DialogActions>
    </Fragment>
  )
}