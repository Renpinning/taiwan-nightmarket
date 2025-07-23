import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

const Section5 = () => {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const sectionRef = useRef(null)
  const router = useRouter()

  const getImagePath = (path) => `${router.basePath}${path}`

  // 獎品資料 - 更新為4個獎品
  const prizes = [
    {
      id: 1,
      image: getImagePath('/image/gift/1.png'),
      rank: '徵文第一名',
      name: '太陽眼鏡',
    },
    {
      id: 2,
      image: getImagePath('/image/gift/2.png'),
      rank: '徵文第二名和第三名',
      name: '造型墨鏡',
    },
    {
      id: 3,
      image: getImagePath('/image/gift/3.png'),
      rank: '徵文佳作獎',
      name: '胖胖包（共5名）',
    },
    {
      id: 4,
      image: getImagePath('/image/gift/4.png'),
      rank: '票選幸運獎',
      name: '鴨舌帽（共8名）',
    },
  ]

  // 預加載圖片
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = prizes.map((prize) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = prize.image
          img.onload = resolve
          img.onerror = reject
        })
      })

      // 預加載裝飾圖片
      const decorImg = new Image()
      decorImg.src = getImagePath('/image/gift/bg-3.png')

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true)
        })
        .catch((err) => {
          console.log('Some images failed to load, showing anyway')
          setImagesLoaded(true)
        })
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
    <div className={styles.section5Wrapper} ref={sectionRef}>
      {renderSection && (
        <div
          className={`${styles.section5Container} ${
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
            <span className={styles.titleText}>精美禮品</span>
            <img
              src={getImagePath('/image/gift/bg-3.png')}
              alt="裝飾"
              className={styles.decorImage}
            />
          </h2>

          {/* 獎品展示區 */}
          <div className={styles.prizesContainer}>
            {prizes.map((prize, index) => (
              <div
                key={prize.id}
                className={`${styles.prizeItem} ${
                  sectionVisible ? styles.visible : ''
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className={styles.prizeImageContainer}>
                  <img
                    src={prize.image}
                    alt={`獎品 ${prize.id}`}
                    className={styles.prizeImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.prizeInfo}>
                  <span className={styles.prizeRank}>{prize.rank}</span>
                  <span className={styles.prizeName}>{prize.name}</span>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.prizeSource}>圖片取自於故宮精品商城</p>
        </div>
      )}
    </div>
  )
}

export default Section5
