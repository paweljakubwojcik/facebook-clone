import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AuthContext } from './Context/auth'
import { ThemesProvider } from './Context/theme'

import Home from './Components/HomePage/Home'
import Login from './Components/LoginPage/Login'
import NavBar from './Components/Navbar/Navbar'
import Profile from './Components/ProfilePage/Profile'

export default function App() {

  //checks if user is logged in
  const { user } = useContext(AuthContext)
  const [whichForm, setForm] = useState('login')


  return (
    <ThemesProvider >
      <Router>
        <Route exact path='/' >
          {user ? (
            <>
              <NavBar changeTheme={null} />
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
    </ThemesProvider>
  )
}

