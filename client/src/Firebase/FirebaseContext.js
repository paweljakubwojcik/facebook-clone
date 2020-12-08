import React, { createContext } from 'react'
import config from './config'
import firebase from 'firebase'


const FirebaseContext = createContext({
    storage: null
})


function FirebaseProvider(props) {

    firebase.initializeApp(config);
    const storage = firebase.storage();

    return (
        <FirebaseContext.Provider value={{ storage }} {...props}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }