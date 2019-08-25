import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

// Material UI
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// Material UI - Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

// Forms
import AddUserForm from './../routes/users/add-user-form'
import AddMerchantForm from './../routes/merchants/add-merchant-form'
import AddTransactionFrom from './../routes/transactions/add-transaction-form'

// Material Icons
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

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

export default function TableToolbar (props) {
  const classes = useStyles()
  const { selected, dataType, dataTypePlural, users, merchants } = props
  const [openAdd, setOpenAdd] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  function handleClickOpenAdd () {
    setOpenAdd(true)
  }

  function handleCloseAdd () {
    setOpenAdd(false)
  }

  function handleClickOpenDelete () {
    setOpenDelete(true)
  }

  function handleCloseDelete () {
    setOpenDelete(false)
  }

  function handleDeleteItems () {
    handleCloseDelete()
  }

  return (
    <Toolbar className={clsx(classes.root, {
      [classes.highlight]: selected.length > 0
    })}>
      <div className={classes.title}>
        {selected.length > 0 ? (
          <Typography color='inherit' variant='subtitle1'>{selected.length} selected</Typography>
        ) : (
          <Typography id='tableTitle' variant='h6'>{dataTypePlural}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {selected.length > 0 ? (
          <Tooltip title='Delete'>
            <IconButton
              aria-label='delete'
              onClick={handleClickOpenDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={'Add ' + dataType}>
            <IconButton
              aria-label='add'
              onClick={handleClickOpenAdd}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <Dialog
        aria-labelledby='form-dialog-add-title'
        fullWidth
        onClose={handleCloseAdd}
        open={openAdd}
      >
        <DialogTitle id='form-dialog-add-title'>Add New {dataType}</DialogTitle>
        <DialogContent>
          {dataType === 'User' ? <AddUserForm handleCloseAdd={handleCloseAdd} /> : null}
          {dataType === 'Merchant' ? <AddMerchantForm handleCloseAdd={handleCloseAdd} /> : null}
          {dataType === 'Transaction' ? <AddTransactionFrom handleCloseAdd={handleCloseAdd} merchants={merchants} users={users} /> : null}
        </DialogContent>
      </Dialog>
      <Dialog
        aria-labelledby='form-dialog-delete-title'
        fullWidth
        onClose={handleCloseDelete}
        open={openDelete}
      >
        <DialogTitle id='form-dialog-delete-title'>Delete the selected {selected.length > 1 ? dataTypePlural : dataType}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hitting delete will proceed to delete the selected {selected.length > 1 ? dataTypePlural : dataType}. Please note that this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button className={classes.dialogButton} color='primary' onClick={handleCloseDelete}>Cancel</Button>
          <Button className={classes.dialogButton} color='secondary' onClick={handleDeleteItems} variant='contained'>Delete</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  dataType: PropTypes.oneOf(['User', 'Merchant', 'Transaction']).isRequired,
  dataTypePlural: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired),
  merchants: PropTypes.arrayOf(PropTypes.object.isRequired)
}
