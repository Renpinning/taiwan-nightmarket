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
      const currentRef = sectionRef.current
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // 獎項資料
  const awardData = [
    {
      category: '徵文第一名',
      prize: '鋼珠筆禮盒（內含筆記本）三套組',
      icon: <FaTrophy />,
      iconColor: '#FFD700', // 金色
      winners: ['李o容'],
    },
    {
      category: '徵文第二名',
      prize: '鋼珠筆三套組',
      icon: <FaMedal />,
      iconColor: '#C0C0C0', // 銀色
      winners: ['陳o'],
    },
    {
      category: '徵文第三至五名',
      prize: '鋼珠筆禮盒一組',
      icon: <FaMedal />,
      iconColor: '#CD7F32', // 銅色
      winners: ['魚o寶', 'zn•fer', '陳o'],
    },
    {
      category: '徵文佳作獎',
      prize: '翠玉白菜加熱眼罩',
      icon: <FaAward />,
      iconColor: '#6A8D73', // 綠色
      winners: ['韓o波', '田o'],
    },
    {
      category: '票選幸運獎',
      prize: '雙筷組',
      icon: <FaGift />,
      iconColor: '#5B84B1', // 藍色
      winners: [
        '金o',
        '梁o山',
        '張o田',
        '陳o龍',
        '曹o',
        '米o強',
        '一棵o花的樹',
        '張o峰',
        '褚o榮',
        '泥o娃',
      ],
    },
  ]

  return (
    <div className={styles.section7Wrapper} ref={sectionRef}>
      {/* 底層背景圖層 */}
      <div className={styles.bottomBackgroundLayer}>
        <img src={getImagePath('/image/food/bg-5.png')} alt="背景" />
      </div>

      <div
        className={`${styles.section7Container} ${
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
          <span className={styles.titleText}>得獎名單</span>
          <img
            src={getImagePath('/image/gift/bg-2.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
        </h2>

        {/* 得獎名單內容 */}
        <div className={styles.awardsContainer}>
          {awardData.map((award, index) => (
            <div key={index} className={styles.awardCard}>
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

        {/* 恭喜訊息 */}
        <div
          className={styles.congratsMessage}
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          恭喜以上得獎者！
        </div>
      </div>
    </div>
  )
}

export default Section7
