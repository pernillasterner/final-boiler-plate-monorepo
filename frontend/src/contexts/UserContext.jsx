/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authenticated, setAuthenticated] = useState({
    accessToken: localStorage.getItem("accessToken"),
    auth: false,
  })
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"

  // Load username from localStorage
  useEffect(() => {
    const firstName = localStorage.getItem("firstName")
    if (firstName) {
      setUser({ firstName: firstName })
    }
  }, [])

  const login = async (loginData, accessToken) => {
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(`${apiUrl}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
      if (!response.ok) {
        console.info("Login failed")
        throw new Error("Failed to get user")
      }

      const data = await response.json()
      console.info("Login success", data)

      // Save accesstoken and username in local storage
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("firstName", data.firstName)
      setAuthenticated({
        accessToken,
        auth: true,
      })

      setUser({
        firstName: data.firstName,
      })

      setIsLoggedIn(true)
      navigate("/spela")
    } catch (err) {
      console.error("No user was found:", err)
    }
  }

  const signout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("firstName")
    setIsLoggedIn(false)
    setAuthenticated({
      auth: false,
    })

    navigate("/")
  }

  // Function that sends userData to MongoDB to create a new user
  const registerUser = async (userData) => {
    try {
      // Ensure this points to the correct backend URL
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      if (!response.ok) {
        throw new Error("Failed to register user")
      }

      const data = await response.json()
      console.info("Registration success", data)

      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("firstName", data.firstName)
      setAuthenticated({
        accessToken: data.accessToken,
        auth: true,
      })

      setUser({
        firstName: data.firstName,
      })

      setIsLoggedIn(true)
      navigate("/spela")
    } catch (err) {
      console.error("Error registering new user:", err)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        authenticated,
        login,
        signout,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export const useLogin = () => useContext(UserContext)

UserProvider.propTypes = {
  children: PropTypes.any,
}
