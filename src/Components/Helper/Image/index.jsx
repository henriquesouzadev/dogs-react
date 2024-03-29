import { useState } from 'react'
import styles from './index.module.css'

const Image = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = useState(true)

  const handleLoad = (e) => {
    setSkeleton(false)
    e.target.style.opacity = 1
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} src="" alt={alt} {...props} />
    </div>
  )
}

export default Image