import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import 'animate.css'
import { FaTrophy, FaMedal, FaAward, FaGift } from 'react-icons/fa'

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
      category: '徵文第一名',
      prize: '太陽眼鏡',
      icon: <FaTrophy />,
      iconColor: '#FFD700', // 金色
      winners: ['待公布'],
    },
    {
      category: '徵文第二名和第三名',
      prize: '造型墨鏡',
      icon: <FaMedal />,
      iconColor: '#C0C0C0', // 銀色
      winners: ['待公布'],
    },
    {
      category: '徵文佳作獎',
      prize: '胖胖包（共5名）',
      icon: <FaAward />,
      iconColor: '#CD7F32', // 銅色
      winners: ['待公布'],
    },
    {
      category: '票選幸運獎',
      prize: '鴨舌帽（共8名）',
      icon: <FaGift />,
      iconColor: '#5B84B1', // 藍色
      winners: ['待公布'],
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
              className={`${styles.awardCard} ${
                sectionVisible ? styles.visible : ''
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
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
                <p className={styles.prizeInfo}>{award.prize}</p>
                <div className={styles.winnersList}>
                  {award.winners.map((winner, winnerIndex) => (
                    <span key={winnerIndex} className={styles.winnerName}>
                      {winner}
                      {winnerIndex < award.winners.length - 1 && (
                        <span className={styles.winnerSeparator}> • </span>
                      )}
                    </span>
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
