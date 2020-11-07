import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NavBar from './Components/Navbar'

import { AuthProvider } from './Context/auth'



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
    <AuthProvider>
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
    </AuthProvider>
  )
}

