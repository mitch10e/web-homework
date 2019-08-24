import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function NavBar () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton aria-label='menu' className={classes.menuButton} color='inherit' edge='start'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            Mitchell Tenney - Homework
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
