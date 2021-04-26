import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AuthContext } from './Context/auth'
import { ThemesProvider } from './Context/theme'
import { GlobalStyles } from './styles/global_styles'

import Home from './Pages/Home'
import Login from './Pages/Login'
import NavBar from './Components/Navbar/Navbar'
import Profile from './Pages/Profile'
import ImagePage from './Pages/Image'
import Authentication from './Pages/Redirect/Authentication'
import { MessengerProvider } from './Context/messenger'
import Messenger from './Components/Messenger/Messenger'

export default function App() {
    //checks if user is logged in
    const { isLogged } = useContext(AuthContext)

    return (
        <ThemesProvider>
            <MessengerProvider>
                <GlobalStyles />
                <Router>
                    <NavBar />
                    <Route exact path="/">
                        {isLogged ? (
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
                    <Route path="/image/:id">
                        <ImagePage />
                    </Route>
                    <Route path="/auth">
                        <Authentication />
                    </Route>
                </Router>
                {isLogged && <Messenger />}
            </MessengerProvider>
        </ThemesProvider>
    )
}
