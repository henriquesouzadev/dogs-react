import { useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import Enviar from '../../Assets/enviar.svg?react'
import { COMMENT_POST } from '../../Api/settings'
import Error from '../Helper/Error'
import styles from './PhotoCommentsForm.module.css'

export const PhotoCommentsForm = ({ id, setComments, single }) => {
  const { request, error } = useFetch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { url, options } = COMMENT_POST(id, { comment })
    const { response, json } = await request(url, options)

    if (response.ok) {
      setComment('')
      setComments((comments) => ([...comments, json]))
    }
  } 

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className={styles.button}>{<Enviar />}</button>

      <Error error={error} />
    </form>
  )
}