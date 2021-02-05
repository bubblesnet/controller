import * as React from 'react'

let UserContext = React.createContext()

function login(e) {
  UserContext = React.createContext({})
}
const UserProvider = props => (
   <UserContext.Provider value={useUser().data.user} {...props} />
 )

const useUser = () => React.useContext(UserContext)

export {UserProvider, useUser, login}