import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

// Material UI
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

// Material UI - Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// Forms
import AddUserForm from './../routes/users/add-user-form'
import AddMerchantForm from './../routes/merchants/add-merchant-form'
import AddTransactionFrom from './../routes/transactions/add-transaction-form'

import DeleteMerchantForm from './../routes/merchants/delete-merchant-form'
import DeleteUserForm from './../routes/users/delete-user-form'
import DeleteTransactionForm from '../routes/transactions/delete-transaction-form'

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
  const { t } = useTranslation()
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

  return (
    <Toolbar className={clsx(classes.root, {
      [classes.highlight]: selected.length > 0
    })}>
      <div className={classes.title}>
        {selected.length > 0 ? (
          <Typography color='inherit' variant='subtitle1'>{selected.length} {t('selected')}</Typography>
        ) : (
          <Typography id='tableTitle' variant='h6'>{dataTypePlural}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {selected.length > 0 ? (
          <Tooltip title={t('delete')}>
            <IconButton
              aria-label='delete'
              onClick={handleClickOpenDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('add') + ' ' + dataType}>
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
        <DialogTitle id='form-dialog-add-title'>{t('addNew')} {dataType}</DialogTitle>
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
        <DialogTitle id='form-dialog-delete-title'>{t('deleteSelected')} {selected.length > 1 ? dataTypePlural : dataType}?</DialogTitle>
        {dataType === 'User' ? <DeleteUserForm handleCloseDelete={handleCloseDelete} selectedUsers={selected} /> : null}
        {dataType === 'Merchant' ? <DeleteMerchantForm handleCloseDelete={handleCloseDelete} selectedMerchants={selected} /> : null}
        {dataType === 'Transaction' ? <DeleteTransactionForm handleCloseDelete={handleCloseDelete} selectedTransactions={selected} /> : null }
      </Dialog>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dataType: PropTypes.oneOf(['User', 'Merchant', 'Transaction']).isRequired,
  dataTypePlural: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired),
  merchants: PropTypes.arrayOf(PropTypes.object.isRequired)
}
