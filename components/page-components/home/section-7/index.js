import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import 'animate.css'
import { FaTrophy, FaGift } from 'react-icons/fa'

const Section7 = () => {
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

  // 更新的獎項資料
  const awardData = [
    {
      category: '徵文比賽得獎者',
      icon: <FaTrophy />,
      iconColor: '#FFD700',
      winners: ['第一名：晴OCCR', '第二名：陳O龍', '第三名：O先生'],
    },
    {
      category: '票選幸運獎得主',
      icon: <FaGift />,
      iconColor: '#5B84B1',
      winners: [
        '尹O畺',
        '黎O正',
        '于O雁',
        '劉O暉',
        '朱O澤',
        '小O',
        '馮O翔',
        'O霞',
      ],
    },
  ]

  return (
    <div className={styles.section7Wrapper} ref={sectionRef}>
      <div
        className={`${styles.section7Container} ${
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
          <span className={styles.titleText}>得獎名單</span>
          <img
            src={getImagePath('/image/gift/bg-3.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
        </h2>

        {/* 得獎名單內容 */}
        <div className={styles.awardsContainer}>
          {awardData.map((award, index) => (
            <div
              key={index}
              className={`${styles.awardCard} ${styles.visible}`}
            >
              <h3 className={styles.awardTitle}>
                <span
                  className={styles.awardIcon}
                  style={{ color: award.iconColor }}
                >
                  {award.icon}
                </span>
                {award.category}
              </h3>
              <div className={styles.awardContent}>
                <div className={styles.winnersList}>
                  {award.winners.map((winner, winnerIndex) => (
                    <div key={winnerIndex} className={styles.winnerName}>
                      {winner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section7
