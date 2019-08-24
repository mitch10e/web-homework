// React
import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Icons
import PieChartIcon from '@material-ui/icons/PieChart'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SettingsIcon from '@material-ui/icons/Settings'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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
          <ListItem button key='Charts'>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary='Charts' />
          </ListItem>
          <ListItem button key='Transactions'>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary='Transactions' />
          </ListItem>
          <ListItem button key='Users'>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
          <ListItem button key='Merchants'>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Merchants' />
          </ListItem>
          <ListItem button key='Settings'>
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
