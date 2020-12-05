import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

import { AuthContext } from './Context/auth'
import { ThemesProvider } from './Context/theme'

import Home from './Components/HomePage/Home'
import Login from './Components/LoginPage/Login'
import NavBar from './Components/Navbar/Navbar'
import Profile from './Components/ProfilePage/Profile'
import ImagePage from './Components/ImagePage/ImagePage'

export default function App() {

  //checks if user is logged in
  const { user } = useContext(AuthContext)
  const [whichForm, setForm] = useState('login')


  return (
    <ThemesProvider >

      <Router>
        <LastLocationProvider>
          <NavBar setForm={setForm} />
          <Route exact path='/' >
            {user ? (
              <>
                <Home />
              </>
            ) : (
                <Login whichForm={whichForm} setForm={setForm} />
              )}
          </Route>
          <Route exact path='/profile/:id' >
            <Profile />
          </Route>
          <Route path='/image' >
            <ImagePage />
          </Route>
        </LastLocationProvider>
      </Router>

    </ThemesProvider>
  )
}

