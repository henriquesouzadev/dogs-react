import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { PhotoCommentsForm } from './PhotoCommentsForm'
import styles from './PhotoComments.module.css'

export const PhotoComments = (props) => {
  const commentsSection = useRef(null)
  const [comments, setComments] = useState(() => props.comments)
  const { login } = useContext(UserContext)

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight
  }, [comments])

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {comments?.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {login && (
        <PhotoCommentsForm
          id={props.id}
          single={props.single}
          setComments={setComments}
        />
      )}
    </>
  )
}