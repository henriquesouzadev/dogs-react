import { Route, Routes } from 'react-router-dom'
import UserHeader from './UserHeader'
import UserStats from './UserStats'
import UserPhotoPost from './UserPhotoPost'
import Feed from '../Feed'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import NotFound from '../NotFound'

const User = () => {
  const { data } = useContext(UserContext)

  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default User