import * as React from 'react'
//import {useUser,login} from './context/UserContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import SetupApp from './SetupApp'

import useToken from './useToken';

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
/*
function getToken() {
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function setToken(loginResult) {
        sessionStorage.setItem('token', JSON.stringify(loginResult.token));
}

 */

function App() {
    console.log("Starting App")
    let needs_setup = false
    const { token, setToken } = useToken();

    function processLoginResult(loginResult) {
        console.log("processLoginResult "+loginResult)
        if(loginResult.auth === true ) {
            console.log("Setting token to " + JSON.stringify(loginResult))
            setToken(loginResult)  // this inspires the rerender that gets us the authenticatedApp
//            setLocalToken(loginResult.token)
        }
    }

    console.log("Rendering App with token set to " + JSON.stringify(token))
    if( needs_setup ) {
        return <SetupApp readyState={true}/>
    }

    return (token?.auth === true) ? <AuthenticatedApp nodeEnv={process.env.NODE_ENV}/> : <UnauthenticatedApp nodeEnv={process.env.NODE_ENV} processLoginResult={processLoginResult}/>
}

export default App