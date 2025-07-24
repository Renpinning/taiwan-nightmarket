import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaPen, FaTrophy, FaExclamationTriangle, FaPhone } from 'react-icons/fa'
import styles from './styles.module.css'

const Section6 = () => {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const sectionRef = useRef(null)
  const router = useRouter()

  const getImagePath = (path) => `${router.basePath}${path}`

  // 參與須知資料
  const participationRules = [
    {
      id: 1,
      title: '1. 參與方式：',
      icon: <FaPen />,
      content:
        '可透過本網站、電子信箱、傳統信件郵寄、傳真或網路社群平台等方式參與。',
    },
    {
      id: 2,
      title: '2. 得獎通知',
      icon: <FaTrophy />,
      items: [
        '活動結束後，將統計票選結果並公布得獎名單。',
        '得獎者須於名單公布後兩週內，以電子郵件提供獎品寄送地址及收件人資料。',
        '逾期未提供者將失去得獎資格。',
      ],
    },
    {
      id: 3,
      title: '3. 重要提醒',
      icon: <FaExclamationTriangle />,
      items: [
        '由於國際航空郵件管制，含電池產品的獎項將不附帶電池。',
        '因應突發狀況，主辦單位保有活動相關事項的最終更動與解釋權。',
      ],
    },
    {
      id: 4,
      title: '4. 聯絡方式：',
      icon: <FaPhone />,
      content: (
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>電子郵件：</span>
            <a href="mailto:rtifans@rti.org.tw" className={styles.contactLink}>
              rtifans@rti.org.tw
            </a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>活動聯絡人：</span>
            <span>陳怡蓓／</span>
            <a href="mailto:eluv@rti.org.tw" className={styles.contactLink}>
              eluv@rti.org.tw
            </a>
          </div>
          <div className={styles.contactNote}>
            （如有任何疑問，歡迎透過以上方式與我們聯繫）
          </div>
        </div>
      ),
    },
  ]

  // 預加載圖片
  useEffect(() => {
    const preloadImages = () => {
      // 預加載裝飾圖片
      const decorImg = new Image()
      decorImg.src = getImagePath('/image/gift/bg-3.png')

      decorImg.onload = () => {
        setImagesLoaded(true)
      }

      decorImg.onerror = () => {
        console.log('Decoration image failed to load, showing anyway')
        setImagesLoaded(true)
      }
    }

    preloadImages()
  }, [])

  // 設置 Intersection Observer 監控元素進入視口
  useEffect(() => {
    // 檢查瀏覽器是否支援 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setSectionVisible(true)
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setSectionVisible(true)
          }, 100)

          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      const currentRef = sectionRef.current
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const renderSection = imagesLoaded || true

  return (
    <div className={styles.section6Wrapper} ref={sectionRef}>
      {renderSection && (
        <div
          className={`${styles.section6Container} ${
            sectionVisible ? styles.visible : ''
          }`}
        >
          {/* 標題區 */}
          <h2 className={styles.sectionTitle}>
            <img
              src={getImagePath('/image/gift/bg-3.png')}
              alt="裝飾"
              className={styles.decorImage}
            />
            <span className={styles.titleText}>參與須知</span>
            <img
              src={getImagePath('/image/gift/bg-3.png')}
              alt="裝飾"
              className={styles.decorImage}
            />
          </h2>

          {/* 參與須知內容區 */}
          <div className={styles.rulesContainer}>
            <div
              className={`${styles.ruleItem} ${
                sectionVisible ? styles.visible : ''
              }`}
              style={{ transitionDelay: `0.2s` }}
            >
              {participationRules.map((rule, index) => (
                <div key={rule.id} className={styles.ruleSection}>
                  <h3 className={styles.ruleTitle}>
                    <span className={styles.ruleIcon}>{rule.icon}</span>
                    {rule.title}
                  </h3>
                  {rule.content &&
                    (typeof rule.content === 'string' ? (
                      <p className={styles.ruleContent}>{rule.content}</p>
                    ) : (
                      <div className={styles.ruleContent}>{rule.content}</div>
                    ))}
                  {rule.items && (
                    <ul className={styles.ruleList}>
                      {rule.items.map((item, itemIndex) => (
                        <li key={itemIndex} className={styles.ruleListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {index < participationRules.length - 1 && (
                    <div className={styles.ruleDivider}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Section6
