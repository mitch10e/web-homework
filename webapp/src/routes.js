import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Material Components
import NavBar from './components/navbar'
import NavDrawer from './components/navdrawer'

function AppRouter () {
  return (
    <Router>
      <NavBar />
      <NavDrawer />
    </Router>
  )
}

export default AppRouter
