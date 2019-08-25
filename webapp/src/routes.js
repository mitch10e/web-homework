import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Fragments / Components
import { Home } from './routes/home'
import { Transactions } from './routes/transactions'
import { Users, AddUser } from './routes/users'
import { Merchants } from './routes/merchants'
import { Charts } from './routes/charts'
import { Settings } from './routes/settings'

// Material Components
import { makeStyles } from '@material-ui/core/styles'
import NavBar from './components/navbar'
import NavDrawer from './components/navdrawer'
import DrawerSettings from './components/drawer-settings'

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 0,
    marginLeft: DrawerSettings.drawerWidth,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}))

function AppRouter () {
  const classes = useStyles()

  return (
    <Router>
      <NavBar />
      <NavDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route component={Home} exact path='/' />
        <Route component={Transactions} exact path='/transactions' />
        <Route component={Users} exact path='/users' />
        <Route component={AddUser} exact path='/users/add' />
        <Route component={Merchants} exact path='/merchants' />
        <Route component={Charts} exact path='/charts' />
        <Route component={Settings} exact path='/settings' />
      </main>
    </Router>
  )
}

export default AppRouter
