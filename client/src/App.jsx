import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AuthContext } from './Context/auth'

import Home from './Pages/Home'
import Login from './Pages/Login'
import NavBar from './Components/Navbar'


import { darkTheme } from './themes'


export default function App() {

  // way of checking if user is logged - because every refresh was deleting user from context
  let { user } = useContext(AuthContext)

  const username = sessionStorage.getItem('user')
  const token = sessionStorage.getItem('token')
  const id = sessionStorage.getItem('id')

  if (!user && username && token && id) {
    user = {
      username,
      token,
      id
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Route exact path='/' >
          {user ? (
            <>
              <NavBar />
              <Home />
            </>
          ) : (
              <Login />
            )}
        </Route>
        <Route exact path='/other' >

        </Route>
      </Router>
    </ThemeProvider>
  )
}

