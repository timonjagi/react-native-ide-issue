import React, { useContext } from 'react'

export const AuthContext = React.createContext({} as any)

export const AuthProvider = ({ children, authManager }) => {
  return (
    <AuthContext.Provider value={authManager}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
