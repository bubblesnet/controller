import * as React from 'react'
import Loader from '../components/Loader'
const AuthContext = React.createContext()

function AuthProvider(props) {
    // code for pre-loading the user's information if we have their token in
    // localStorage goes here
    // 🚨 this is the important bit.
    // Normally your provider components render the context provider with a value.
    // But we post-pone rendering any of the children until after we've determined
    // whether or not we have a user token and if we do, then we render a spinner
    // while we go retrieve that user's information.
    if (weAreStillWaitingToGetTheUserData) {
        return <Loader />
    }
    const login = () => {} // make a login request
    const register = () => {} // register the user
    const logout = () => {} // clear the token in localStorage and the user data
    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.
    return (
        <AuthContext.Provider value={{data, login, logout, register}} {...props} />
    )
}
const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
