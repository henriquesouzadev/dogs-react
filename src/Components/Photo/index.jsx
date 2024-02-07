import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PHOTO_GET } from '../../Api/settings'
import Error from '../Helper/Error'
import { Loading } from '../Helper/Loading'
import { PhotoContent } from './PhotoContent'
import useFetch from 'src/Hooks/useFetch'

export const Photo = () => {
  const { id } = useParams()
  const { data, error, request, loading } = useFetch()

  useEffect(() => {
    const { url, options } = PHOTO_GET(id)
    request(url, options)
  }, [id, request])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  )
  return null
}