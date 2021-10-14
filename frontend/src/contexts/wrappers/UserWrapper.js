import React, { useEffect, useReducer, createContext } from "react"
import userReducer from "../reducers/user-reducer"
import { setUser } from "../actions"
import axios from "axios"

export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
  const defaultUser = { username: "Guest" }
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const [user, dispatchUser] = useReducer(
    userReducer,
    storedUser || defaultUser
  )

  useEffect(() => {
    if (storedUser) {
      setTimeout(() => {
        axios
          .get("http://localhost:1337/users/me", {
            headers: {
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          })
          .then(response => {
            dispatchUser(
              setUser({
                ...response.data,
                jwt: storedUser.jwt,
                onboarding: true,
              })
            )
          })
          .catch(error => {
            console.error(error)
            dispatchUser(setUser(defaultUser))
          })
      }, 3000)
    }
  }, [])

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  )
}
