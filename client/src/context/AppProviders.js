import * as React from 'react'
import {AuthProvider} from './AuthContext'
import {UserProvider} from './UserContext'

function AppProviders({children}) {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}

export default AppProviders