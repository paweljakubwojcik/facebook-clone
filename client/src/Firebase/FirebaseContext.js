import React, { createContext } from 'react'
import config from './config'
import firebase from 'firebase'


const FirebaseContext = createContext({
    storage: null
})

firebase.initializeApp(config);
const storage = firebase.storage();

function FirebaseProvider(props) {
    return (
        <FirebaseContext.Provider value={{ storage }} {...props}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }