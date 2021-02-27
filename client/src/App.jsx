import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import { AuthContext } from './Context/auth'
import { ThemesProvider } from './Context/theme'
import { FirebaseProvider } from './Firebase/FirebaseContext'
import { GlobalStyles } from './styles/global_styles'

import Home from './Pages/Home'
import Login from './Pages/Login'
import NavBar from './Components/Navbar/Navbar'
import Profile from './Pages/Profile'
import ImagePage from './Pages/Image'

export default function App() {
    //checks if user is logged in
    const { user } = useContext(AuthContext)

    console.log(user)
    return (
        <FirebaseProvider>
            <ThemesProvider>
                <GlobalStyles />
                <Router>
                    <LastLocationProvider>
                        <NavBar />
                        <Route exact path="/">
                            {user ? (
                                <>
                                    <Home />
                                </>
                            ) : (
                                <Login />
                            )}
                        </Route>
                        <Route exact path="/profile/:id">
                            <Profile />
                        </Route>
                        <Route path="/image">
                            <ImagePage />
                        </Route>
                    </LastLocationProvider>
                </Router>
            </ThemesProvider>
        </FirebaseProvider>
    )
}
