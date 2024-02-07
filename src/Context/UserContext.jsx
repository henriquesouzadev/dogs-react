import React from "react"
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Api/settings"
import { useNavigate } from "react-router-dom"

export const UserContext = React.createContext()

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const getUser = async (token) => {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()

    setData(json)
    setLogin(true)
    console.log(json)
  }

  const userLogin = async (username, password) => {
    try {
      setError(null)
      setLoading(true)

      const { url, options } = TOKEN_POST({ username, password })
      const response = await fetch(url, options)

      if (!response.ok) throw new Error(`Error: Usuário inválido`)

      const { token } = await response.json()

      localStorage.setItem('token', token)
      await getUser(token)

      navigate('/conta')
    } catch (error) {
      setError(error.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  const userLogout = React.useCallback(async () => {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)

    localStorage.removeItem('token')
  }, [])

  const autoLogin = React.useCallback(async () => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        setError(null)
        setLoading(true)

        const { url, options } = TOKEN_VALIDATE_POST(token)
        const response = await fetch(url, options)

        if (!response.ok) throw new Error('Token inválido')

        await getUser(token)
      } catch (error) {
        userLogout()
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      setLogin(false)
    }
  }, [userLogout]) 

  React.useEffect(() => {
    autoLogin()
  }, [autoLogin])

  return (
    <UserContext.Provider value={{
      userLogin,
      userLogout,
      data,
      error,
      loading,
      login
    }}>
      {children}
    </UserContext.Provider>
  )
}