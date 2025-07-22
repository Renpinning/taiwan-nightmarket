import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  const getImagePath = (path) => `${router.basePath}${path}`

  return (
    <div className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link
            href="https://www.rti.org.tw/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={getImagePath('/image/Rti_logo_big.png')}
              alt="中央廣播電臺 Logo"
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.address}>
            財團法人中央廣播電臺 臺北市104中山區北安路55號 TEL:886-2-28856168
            FAX:886-2-28855423
          </p>
          <p className={styles.browserSupport}>
            本網站建議使用Chrome、Firefox、Edge、Safari等電腦或行動裝置瀏覽器，本站不支援舊版IE瀏覽器。
          </p>
        </div>
      </div>
    </div>
  )
}
