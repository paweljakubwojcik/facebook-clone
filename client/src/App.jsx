import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AuthContext } from './Context/auth'

import Home from './Pages/Home'
import Login from './Pages/Login'
import NavBar from './Components/General/Navbar'


import { darkTheme } from './styles/themes'
import Profile from './Pages/Profile'


export default function App() {

  //checks if user is logged in
  const { user } = useContext(AuthContext)

  const [whichForm, setForm] = useState('login')

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
              <Login whichForm={whichForm} setForm={setForm} />
            )}
        </Route>
        <Route exact path='/profile/:id' >
          <NavBar setForm={setForm} />
          <Profile />
        </Route>
      </Router>
    </ThemeProvider>
  )
}

