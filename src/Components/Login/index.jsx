import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Form from "./Form"
import Create from "./Create"
import PasswordLost from "./PasswordLost"
import PasswordReset from "./PasswordReset"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import styles from './index.module.css'
import NotFound from "../NotFound"

const Login = () => {
  const userContext = useContext(UserContext)
  console.log('app userContext', userContext)

  if (userContext.login === true) return <Navigate to="/conta" />
  return (
    <div className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/criar" element={<Create />} />
          <Route path="/perdeu" element={<PasswordLost />} />
          <Route path="/resetar" element={<PasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default Login