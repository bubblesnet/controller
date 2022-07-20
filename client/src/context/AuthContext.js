/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
