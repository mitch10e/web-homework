import React from 'react'
import PropTypes from 'prop-types'

import TableToolbar from './../../components/table-toolbar'
import TableHeader from './../../components/table-header'

// Material UI
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import { stableSort, getSorting } from './../../component-logic/table-sort'
import { tableStyles } from './../../component-logic/table-styles'

// Material UI - Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import EditMerchantForm from './edit-merchant-form'

MerchantsTable.propTypes = {
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })).isRequired
}

export default function MerchantsTable (props) {
  const classes = tableStyles()
  const { merchants } = props

  // Editing
  const defaultEditMerchant = {
    id: '',
    name: '',
    email: ''
  }

  const [openEdit, setOpenEdit] = React.useState(false)
  const [editMerchant, setEditMerchant] = React.useState(defaultEditMerchant)

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const isSelected = id => selected.indexOf(id) !== -1
  const emptyRows = items => rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = merchants.map(merchant => merchant.id)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClickToEdit = (event, id) => {
    let selectedMerchant = merchants.find(merchant => merchant.id === id)
    if (selectedMerchant) {
      setEditMerchant(selectedMerchant)
      setOpenEdit(true)
    }
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const merchantHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' }
  ]

  return (
    <Paper className={classes.root}>
      <TableToolbar
        dataType={'Merchant'}
        dataTypePlural={'Merchants'}
        selected={selected}
      />
      <Table className={classes.table}>
        <TableHeader
          classes={classes}
          dataTypePlural={'Merchants'}
          headers={merchantHeaders}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
          order={order}
          orderBy={orderBy}
          rowCount={merchants.length}
        />
        <TableBody>
          {stableSort(merchants, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((merchant, index) => {
              const isItemSelected = isSelected(merchant.id)
              const labelId = 'enhanced-table-checkbox-' + index

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  hover
                  key={merchant.id}
                  onClick={event => handleClickToEdit(event, merchant.id)}
                  role='checkbox'
                  selected={isItemSelected}
                  tabIndex={-1}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={event => handleClick(event, merchant.id)}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>{merchant.id}</TableCell>
                  <TableCell>{merchant.name}</TableCell>
                  <TableCell>{merchant.email}</TableCell>
                </TableRow>
              )
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        component='div'
        count={merchants.length}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
      />
      <Dialog
        aria-labelledby='form-dialog-edit-title'
        fullWidth
        onClose={handleCloseEdit}
        open={openEdit}
      >
        <DialogTitle id='form-dialog-edit-title'>Edit User (id: {editMerchant.id})</DialogTitle>
        <DialogContent>
          <EditMerchantForm handleCloseEdit={handleCloseEdit} merchant={editMerchant} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
