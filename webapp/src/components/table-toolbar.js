import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

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
  title: {
    flex: '0 0 auto'
  }
}))

export default function TableToolbar (props) {
  const classes = useStyles()
  const { numSelected, dataType, dataTypePlural } = props
  const [openAdd, setOpenAdd] = React.useState(false)

  function handleClickOpenAdd () {
    setOpenAdd(true)
  }

  function handleCloseAdd () {
    setOpenAdd(false)
  }

  return (
    <Toolbar className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0
    })}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color='inherit' variant='subtitle1'>{numSelected} selected</Typography>
        ) : (
          <Typography id='tableTitle' variant='h6'>{dataTypePlural}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='delete'>
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
        onClose={handleCloseAdd}
        open={openAdd}
      >
        <DialogTitle id='form-dialog-add-title'>Add New {dataType}</DialogTitle>
        <DialogContent>
          {dataType === 'User' ? (<div>User!</div>) : null}
          {dataType === 'Merchant' ? (<div>Merchant!</div>) : null}
          {dataType === 'Transaction' ? (<div>Transaction!</div>) : null}
        </DialogContent>
      </Dialog>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  dataType: PropTypes.string.isRequired,
  dataTypePlural: PropTypes.string.isRequired
}
