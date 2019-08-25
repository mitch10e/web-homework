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

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string
  })).isRequired
}

export default function UsersTable (props) {
  const classes = tableStyles()
  const { users } = props

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const isSelected = name => selected.indexOf(name) !== -1
  const emptyRows = items => rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map(n => n.name)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
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

  const userHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'updated', numeric: false, disablePadding: false, label: 'Updated' }
  ]

  return (
    <Paper className={classes.root}>
      <TableToolbar
        dataType={'User'}
        dataTypePlural={'Users'}
        numSelected={selected.length}
      />
      <Table className={classes.table}>
        <TableHeader
          classes={classes}
          dataTypePlural={'Users'}
          headers={userHeaders}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
          order={order}
          orderBy={orderBy}
          rowCount={users.length}
        />
        <TableBody>
          {stableSort(users, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => {
              const isItemSelected = isSelected(user.name)
              const labelId = 'enhanced-table-checkbox-' + index

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  hover
                  key={user.id}
                  onClick={event => handleClick(event, user.name)}
                  role='checkbox'
                  selected={isItemSelected}
                  tabIndex={-1}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell>{user.updated}</TableCell>
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
        count={users.length}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
      />
    </Paper>
  )
}
