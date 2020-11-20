import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AuthContext } from './Context/auth'

import Home from './Components/HomePage/Home'
import Login from './Components/LoginPage/Login'
import NavBar from './Components/Navbar/Navbar'
import Profile from './Components/ProfilePage/Profile'


import { darkTheme } from './styles/themes'



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

