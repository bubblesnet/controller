import * as React from 'react'
//import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import SetupApp from './SetupApp'
import {useState} from "react";


/** Fake login function
 *
 * @param e not used
 */
/*
function setSuccessfulLogin(e) {
    console.log("successfulLogin");
    login(e)
}

 */

function App() {
    console.log("Starting App")
    let needs_setup = false
    const [token, setToken] = useState({auth: false, token: ""});

//    const user = useUser()
//    return user ? <TestApp /> : <UnauthenticatedApp successfulLogin={setSuccessfulLogin}/>

    console.log("Rendering App with token set to " + JSON.stringify(token ))
    if( needs_setup ) {
        return <SetupApp readyState={true}/>
    }
    return (token.auth === true) ? <AuthenticatedApp /> : <UnauthenticatedApp setToken={setToken}/>
}

export default App