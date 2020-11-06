import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

import NavBar from './Components/Navbar'
import { ThemeProvider } from 'styled-components'

const darkTheme = {
  backgroundColor: "#18191a",
  primaryColor: "#3646D8",
  primaryElementColor: "#242526",
  secondaryElementColor: "#898989",
  secondaryFontColor: "#707070",
  primaryFontColor: "#fff",
};


export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Route exact path='/' >
          <NavBar />
          {/* if user is not login - display login/register component */}
          <Home />
        </Route>
        <Route exact path='/register' >
          <Register />
        </Route>
        <Route exact path='/login' >
          <Login />
        </Route>
      </Router>
    </ThemeProvider>
  )
}

