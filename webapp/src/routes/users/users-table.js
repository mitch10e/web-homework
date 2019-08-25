import React from 'react'
import PropTypes from 'prop-types'

import TableToolbar from './../../components/table-toolbar'
import TableHeader from './../../components/table-header'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'

// Styling
const tableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string
  })).isRequired
}

// Sorting Logic
function desc (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort (array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting (order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

export default function UsersTable (props) {
  const classes = tableStyles()
  const { users } = props

  const userHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'updated', numeric: false, disablePadding: false, label: 'Updated' }
  ]

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleRequestSort (event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleSelectAllClick (event) {
    if (event.target.checked) {
      const newSelecteds = users.map(n => n.name)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }

  function handleClick (event, name) {
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

  function handleChangePage (event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage (event) {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

  return (
    <Paper className={classes.root}>
      <TableToolbar dataType={'User'} numSelected={selected.length} />
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
