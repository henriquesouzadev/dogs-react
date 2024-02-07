import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const userContext = useContext(UserContext)
  console.log('userContext', userContext)

  if (userContext.login === true) {
    return children
  } else if (userContext.login === false) {
    return <Navigate to="/login" />
  } else {
    return <></>
  }
}

export default ProtectedRoute