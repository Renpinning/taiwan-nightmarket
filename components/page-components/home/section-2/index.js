import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const Section2 = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [isTabletPortrait, setIsTabletPortrait] = useState(false)
  const cardRefs = useRef([])
  const router = useRouter()

  // 創建一個函數來處理圖片路徑
  const getImagePath = (path) => `${router.basePath}${path}`

  // 檢測螢幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // 修改邏輯：768px 以下才是手機，768px 剛好是平板邊界
      setIsMobile(width < 768)
      // 檢測直式平板 (寬度在 768-1024px 且高度大於寬度)
      setIsTabletPortrait(width >= 768 && width <= 1024 && height > width)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // 夜市資料
  const nightMarketData = [
    {
      id: 1,
      name: '士林夜市',
      description: '台北規模最大夜市之一，集美食、遊戲與購物於一地，人氣不墜。',
    },
    {
      id: 2,
      name: '饒河夜市',
      description: '緊鄰松山慈祐宮，以胡椒餅與蚵仔麵線著稱，是觀光客必訪景點。',
    },
    {
      id: 3,
      name: '南機場夜市',
      description: '台北在地人私藏口袋名單，價格實惠、品質高。',
    },
    {
      id: 4,
      name: '逢甲夜市',
      description: '台中地標級夜市，創意小吃與學生人氣攤位雲集。',
    },
    {
      id: 5,
      name: '六合夜市',
      description: '高雄代表性夜市，海鮮與台式滷味應有盡有。',
    },
    {
      id: 6,
      name: '瑞豐夜市',
      description: '高雄規模最大夜市之一，分區規劃完善，動線順暢。',
    },
    {
      id: 7,
      name: '花園夜市',
      description: '台南最大夜市，開闊場地、攤位數眾多，美食選擇豐富。',
    },
    {
      id: 8,
      name: '義大世界夜市',
      description: '結合大型購物中心設施，展現現代夜市風貌。',
    },
    {
      id: 9,
      name: '東大門夜市',
      description: '花蓮指標性夜市，融合原民文化與在地小吃。',
    },
    {
      id: 10,
      name: '廟口夜市',
      description: '基隆傳統夜市，以海鮮、甜點與宮廟文化並存聞名。',
    },
  ]

  // 設置 Intersection Observer
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisibleCards(Array(nightMarketData.length).fill(true))
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.findIndex(
            (ref) => ref === entry.target
          )
          if (index !== -1) {
            // 更新可見狀態陣列
            setVisibleCards((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            // 一旦卡片進入視口並觸發動畫，不再觀察它
            observer.unobserve(entry.target)
          }
        }
      })
    }, observerOptions)

    // 初始化空的可見狀態陣列
    setVisibleCards(Array(nightMarketData.length).fill(false))

    // 為每個卡片添加觀察者
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // 清理函數
    return () => {
      const refs = [...cardRefs.current]
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [nightMarketData.length])

  // 初始化 refs 陣列
  if (cardRefs.current.length !== nightMarketData.length) {
    cardRefs.current = Array(nightMarketData.length)
      .fill()
      .map((_, i) => cardRefs.current[i] || null)
  }

  // 根據螢幕大小選擇背景圖片
  const getBackgroundImage = () => {
    if (isMobile) {
      return getImagePath('/image/market/m-dec.png')
    } else if (isTabletPortrait) {
      return getImagePath('/image/market/t-dec.png')
    } else {
      return getImagePath('/image/market/w-dec.png')
    }
  }

  return (
    <div className={styles.Wrapper}>
      {/* 背景圖層 */}
      <div className={styles.backgroundLayer}>
        <img src={getBackgroundImage()} alt="裝飾背景" />
      </div>

      {/* 內容區 */}
      <div className={styles.Container}>
        <h2 className={styles.sectionTitle}>
          <img
            src={getImagePath('/image/market/title-1.png')}
            alt="台灣十大夜市"
            className={styles.titleImage}
          />
        </h2>

        <div className={styles.CardContainer}>
          {nightMarketData.map((market, index) => (
            <div
              key={market.id}
              className={`${styles.nightMarketCard} ${
                visibleCards[index] ? 'animate__animated animate__fadeIn' : ''
              }`}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {/* 編號標籤 */}
              <div className={styles.numberTag}>{market.id}</div>

              {/* 卡片內容 */}
              <div className={styles.cardContent}>
                <h3 className={styles.marketName}>{market.name}</h3>
                <p className={styles.marketDescription}>{market.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section2
