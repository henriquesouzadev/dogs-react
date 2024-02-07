import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import Dogs from '../../Assets/dogs.svg?react'
import { UserContext } from '../../Context/UserContext'

const Header = () => {
  const userContext = React.useContext(UserContext)

  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo}>
          <Dogs />
        </Link>

        {userContext.data ? (
          <>
            <Link to="/conta" className={styles.login}>
              {userContext.data.nome}
            </Link>
          </>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Header