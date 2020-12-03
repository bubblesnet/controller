import * as React from 'react'
import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import {useState} from "react";
import { useTheme } from 'rendition';

/** Fake login function
 *
 * @param e not used
 */
function setSuccessfulLogin(e) {
    console.log("successfulLogin");
    login(e)
}

function App() {
    console.log("Starting App")
    const theme = useTheme()

    let [successfulLogin, setSuccessfulLogin] = useState(false);
    const user = useUser()
//    return user ? <AuthenticatedApp /> : <UnauthenticatedApp successfulLogin={setSuccessfulLogin}/>

    return successfulLogin ? <AuthenticatedApp /> : <UnauthenticatedApp successfulLogin={setSuccessfulLogin}/>
}

export default App