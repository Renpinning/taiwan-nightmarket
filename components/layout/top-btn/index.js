import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { ChevronUp, ArrowUpCircle } from 'lucide-react'

export default function TopBtn() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`${styles['top-btn']} ${visible ? styles['visible'] : ''}`}
      aria-label="回到頂部"
    >
      <div className={styles['icon-container']}>
        <ChevronUp
          className={`${styles['default']} animate__animated animate__pulse animate__infinite animate__slow`}
          size={48}
        />
        <ArrowUpCircle
          className={`${styles['hover']} animate__animated animate__tada animate__infinite`}
          size={48}
        />
      </div>
    </button>
  )
}
