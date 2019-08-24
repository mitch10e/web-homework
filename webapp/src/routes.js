import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Material Components
import NavBar from './components/navbar'

function AppRouter () {
  return (
    <Router>
      <NavBar />
    </Router>
  )
}

export default AppRouter
