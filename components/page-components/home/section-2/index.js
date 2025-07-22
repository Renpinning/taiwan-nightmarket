import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const Section2 = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])
  const router = useRouter()

  // 創建一個函數來處理圖片路徑
  const getImagePath = (path) => `${router.basePath}${path}`

  // 卡片資料
  const cardData = [
    {
      id: 1,
      image: '/image/food/1.jpg',
      cornerImage: '/image/food-name/1.png',
      description:
        '全球聞名的台灣手搖飲品，濃郁奶香搭配Q彈珍珠，成為台灣最具代表性的飲品之一。',
    },
    {
      id: 2,
      image: '/image/food/2.png',
      cornerImage: '/image/food-name/2.png',
      description:
        '外酥內嫩的發酵豆腐，搭配獨特泡菜與醬汁，香氣四溢，是夜市必吃美食。',
    },
    {
      id: 3,
      image: '/image/food/3.jpg',
      cornerImage: '/image/food-name/3.png',
      description:
        '濃郁的湯底搭配鮮美的蚵仔與滑順麵線，口感細膩，深受在地與觀光客喜愛。',
    },
    {
      id: 4,
      image: '/image/food/4.jpg',
      cornerImage: '/image/food-name/4.png',
      description:
        '以糯米腸包裹烤香腸，搭配酸菜與蒜片，多層次口感讓人一試成主顧。',
    },
    {
      id: 5,
      image: '/image/food/5.png',
      cornerImage: '/image/food-name/5.png',
      description:
        '外皮金黃酥脆、內部多汁鮮嫩，搭配特調胡椒粉，是台灣最受歡迎的炸物之一。',
    },
    {
      id: 6,
      image: '/image/food/6.jpg',
      cornerImage: '/image/food-name/6.png',
      description:
        '新鮮蚵仔與雞蛋、粉漿煎製而成，搭配獨特甜辣醬，口感外酥內嫩。',
    },
    {
      id: 7,
      image: '/image/food/7.jpg',
      cornerImage: '/image/food-name/7.png',
      description:
        '外皮酥脆，內餡香甜的傳統點心，紅豆、奶油、花生等口味深受喜愛。',
    },
    {
      id: 8,
      image: '/image/food/8.png',
      cornerImage: '/image/food-name/8.png',
      description:
        '外皮Q彈，內餡飽滿，淋上特製醬汁，是台灣南北皆有不同風味的經典小吃。',
    },
    {
      id: 9,
      image: '/image/food/9.jpg',
      cornerImage: '/image/food-name/9.png',
      description: '米漿蒸製的傳統美食，口感滑嫩，搭配蒜泥與醬油膏風味獨特。',
    },
    {
      id: 10,
      image: '/image/food/10.png',
      cornerImage: '/image/food-name/10.png',
      description: '以糯米與豬血製成，口感Q彈，沾上花生粉與甜醬，別具風味。',
    },
  ]

  // 設置 Intersection Observer
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisibleCards(Array(cardData.length).fill(true))
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
    setVisibleCards(Array(cardData.length).fill(false))

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
  }, [cardData.length])

  // 初始化 refs 陣列
  if (cardRefs.current.length !== cardData.length) {
    cardRefs.current = Array(cardData.length)
      .fill()
      .map((_, i) => cardRefs.current[i] || null)
  }

  return (
    <div className={styles.Wrapper}>
      {/* 背景圖層 */}
      <div className={styles.backgroundLayer}>
        <img src={getImagePath('/image/food/bg-5.png')} alt="背景" />
      </div>

      {/* 卡片內容區 */}
      <div className={styles.Container}>
        <h2 className={styles.sectionTitle}>
          <img
            src={getImagePath('/image/food/title.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
          <span className={styles.titleText}>台灣10大經典小吃</span>
          <img
            src={getImagePath('/image/food/title-2.png')}
            alt="裝飾"
            className={styles.decorImage}
          />
        </h2>

        <div className={styles.CardContainer}>
          {cardData.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.foodCard} ${
                visibleCards[index] ? 'animate__animated animate__fadeIn' : ''
              }`}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {/* 標籤圖片 */}
              <div className={styles.cornerImageWrapper}>
                <img
                  src={getImagePath(card.cornerImage)}
                  alt="食物標籤"
                  className={styles.cornerImage}
                />
              </div>

              {/* 卡片主圖 */}
              <div className={styles.cardImageWrapper}>
                <img
                  src={getImagePath(card.image)}
                  alt="美食圖片"
                  className={styles.cardImage}
                />
              </div>

              {/* 卡片文字區域 */}
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section2
