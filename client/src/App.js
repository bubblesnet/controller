import * as React from 'react'
//import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
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

    let [successfulLogin, setSuccessfulLogin] = useState(false);
//    const user = useUser()
//    return user ? <TestApp /> : <UnauthenticatedApp successfulLogin={setSuccessfulLogin}/>

    return successfulLogin ? <AuthenticatedApp /> : <UnauthenticatedApp successfulLogin={setSuccessfulLogin}/>
}

export default App