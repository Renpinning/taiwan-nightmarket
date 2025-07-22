import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import 'animate.css'
import {
  FaUsers,
  FaTrophy,
  FaExclamationTriangle,
  FaPhoneAlt,
} from 'react-icons/fa'

const Section8 = () => {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef(null)
  const router = useRouter()

  const getImagePath = (path) => `${router.basePath}${path}`

  // 設置 Intersection Observer 監控元素進入視口
  useEffect(() => {
    // 檢查瀏覽器是否支援 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setSectionVisible(true)
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // 當元素20%進入視口時觸發
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          // 一旦元素顯示，不再觀察
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // 開始觀察區塊
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // 清理函數
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className={styles.section6Wrapper} ref={sectionRef}>
      {/* 底層背景圖層 */}
      <div className={styles.bottomBackgroundLayer}>
        <img src={getImagePath('/image/food/bg-5.png')} alt="背景" />
      </div>

      <div
        className={`${styles.section6Container} ${
          sectionVisible
            ? 'animate__animated animate__fadeInUp'
            : styles.invisible
        }`}
      >
        {/* 標題區 */}
        <h2 className={styles.sectionTitle}>
          <img
            src={getImagePath('/image/gift/bg-2.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
          <span className={styles.titleText}>得獎須知</span>
          <img
            src={getImagePath('/image/gift/bg-2.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
        </h2>

        {/* 參與須知內容 */}
        <div className={styles.guidelinesContainer}>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineTitle}>
              <span className={styles.guidelineIcon}>
                <FaTrophy />
              </span>
              得獎通知
            </h3>
            <ul className={styles.guidelineList}>
              <li>
                <strong>得獎者須於名單公布後兩週內</strong>
                ，以電子郵件提供獎品寄送地址及收件人資料。
              </li>
              <li>
                <strong>逾期未提供者將失去得獎資格</strong>。
              </li>
            </ul>
          </div>

          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineTitle}>
              <span className={styles.guidelineIcon}>
                <FaExclamationTriangle />
              </span>
              重要提醒
            </h3>
            <ul className={styles.guidelineList}>
              <li>
                由於國際航空郵件管制，
                <strong>含電池產品的獎項將不附帶電池</strong>。
              </li>
              <li>
                因應突發狀況，
                <strong>主辦單位保有活動相關事項的最終更動與解釋權</strong>。
              </li>
            </ul>
          </div>

          {/* 聯絡方式 - 樣式與前三個區塊一致 */}
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineTitle}>
              <span className={styles.guidelineIcon}>
                <FaPhoneAlt />
              </span>
              聯絡方式
            </h3>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactLabel}>電子郵件：</span>
                <a
                  href="mailto:rtifans@rti.org.tw"
                  className={styles.contactLink}
                >
                  rtifans@rti.org.tw
                </a>
              </li>
              <li>
                <span className={styles.contactLabel}>活動聯絡人：</span>
                <span className={styles.contactValue}>陳怡蓓</span>
                <span className={styles.contactSeparator}>/</span>
                <a href="mailto:eluv@rti.org.tw" className={styles.contactLink}>
                  eluv@rti.org.tw
                </a>
              </li>
            </ul>
            <p className={styles.contactNote}>
              如有任何疑問，歡迎透過以上方式與我們聯繫。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section8
