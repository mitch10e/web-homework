// React
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Icons
import HomeIcon from '@material-ui/icons/Home'
import PieChartIcon from '@material-ui/icons/PieChart'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SettingsIcon from '@material-ui/icons/Settings'
import DrawerSettings from './drawer-settings'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: DrawerSettings.drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: DrawerSettings.drawerWidth
  },
  toolbar: theme.mixins.toolbar
}))

export default function NavDrawer () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant='permanent'>
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={RouterLink} key='Home' to='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button component={RouterLink} key='Charts' to='/charts'>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary='Charts' />
          </ListItem>
          <ListItem button component={RouterLink} key='Transactions' to='/transactions'>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary='Transactions' />
          </ListItem>
          <ListItem button component={RouterLink} key='Users' to='/users'>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
          <ListItem button component={RouterLink} key='Merchants' to='/merchants'>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Merchants' />
          </ListItem>
          <ListItem button component={RouterLink} key='Settings' to='/settings'>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}
