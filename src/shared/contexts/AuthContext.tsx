import React, { FC, createContext, useContext, useState } from 'react'

interface IAuthContext {
  isAuthenticated: boolean
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
