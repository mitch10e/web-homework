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
import EditTransactionForm from './edit-transaction-form'

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    merchant: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default function TransactionsTable (props) {
  const classes = tableStyles()
  const { transactions, users, merchants } = props

  // Editing
  const defaultEditTransaction = {
    id: -1,
    user: -1,
    merchant: -1,
    cost: 0,
    tax: 0
  }
  const [openEdit, setOpenEdit] = React.useState(false)
  const [editTransaction, setEditTransaction] = React.useState(defaultEditTransaction)

  // Sorting
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
      const newSelecteds = transactions.map(transaction => transaction.id)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }

  const handleClick = (event, id) => {
    if (!event.target.tagName === 'INPUT') {
      return
    } else {
      event.stopPropagation()
    }

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
    let selectedTransaction = transactions.find(transaction => transaction.id === id)
    if (selectedTransaction) {
      setEditTransaction(selectedTransaction)
      setOpenEdit(true)
    }
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const transactionHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'user', numeric: false, disablePadding: false, label: 'User' },
    { id: 'merchant', numeric: false, disablePadding: false, label: 'Merchant' },
    { id: 'cost', numeric: true, disablePadding: false, label: 'Cost' },
    { id: 'tax', numeric: true, disablePadding: false, label: 'Tax' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Total Cost' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' }
  ]

  return (
    <Paper className={classes.root}>
      <TableToolbar
        dataType={'Transaction'}
        dataTypePlural={'Transactions'}
        merchants={merchants}
        selected={selected}
        users={users}
      />
      <Table className={classes.table}>
        <TableHeader
          classes={classes}
          dataTypePlural={'Transactions'}
          headers={transactionHeaders}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
          order={order}
          orderBy={orderBy}
          rowCount={transactions.length}
        />
        <TableBody>
          {stableSort(transactions, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction, index) => {
              const isItemSelected = isSelected(transaction.id)
              const labelId = 'enhanced-table-checkbox-' + index

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  hover
                  key={transaction.id}
                  onClick={event => handleClickToEdit(event, transaction.id)}
                  role='checkbox'
                  selected={isItemSelected}
                  tabIndex={-1}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={event => handleClick(event, transaction.id)}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>{transaction.id}</TableCell>
                  <TableCell>{users.find(user => user.id === transaction.user).name}</TableCell>
                  <TableCell>{merchants.find(merchant => merchant.id === transaction.merchant).name}</TableCell>
                  <TableCell align='right'>${transaction.cost.toFixed(2)}</TableCell>
                  <TableCell align='right'>${transaction.tax.toFixed(2)}</TableCell>
                  <TableCell align='right'>${(transaction.cost + transaction.tax).toFixed(2)}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
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
        count={transactions.length}
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
        <DialogTitle id='form-dialog-edit-title'>Edit Transaction (id: {editTransaction.id})</DialogTitle>
        <DialogContent>
          <EditTransactionForm handleCloseEdit={handleCloseEdit} merchants={merchants} transaction={editTransaction} users={users} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
