import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

const Section5 = () => {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  const getImagePath = (path) => `${router.basePath}${path}`

  // 獎品資料 - 直接在定義時應用 getImagePath
  const prizes = [
    {
      id: 1,
      image: getImagePath('/image/gift/1.png'),
      rank: '徵文第一名',
      name: '鋼珠筆三套組禮盒（內含筆記本）',
    },
    {
      id: 2,
      image: getImagePath('/image/gift/2.png'),
      rank: '徵文第二名',
      name: '鋼珠筆三套組',
    },
    {
      id: 3,
      image: getImagePath('/image/gift/3.png'),
      rank: '徵文第三至五名',
      name: '鋼珠筆（共3名）',
    },
    {
      id: 4,
      image: getImagePath('/image/gift/4.png'),
      rank: '徵文佳作獎',
      name: '翠玉白菜加熱眼罩（共2名）',
    },
    {
      id: 5,
      image: getImagePath('/image/gift/5.png'),
      rank: '票選幸運獎',
      name: '雙筷組（共10名）',
    },
  ]

  // 檢測螢幕尺寸，設置手機狀態
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 初始檢測
    checkMobile()

    // 預加載圖片
    const preloadImages = () => {
      const imagePromises = prizes.map(prize => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = prize.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      // 加入背景圖片預加載
      const bgImages = [
        getImagePath('/image/food/bg-5.png'),
        getImagePath('/image/gift/bg.png'),
        getImagePath('/image/gift/mb.png'),
        getImagePath('/image/gift/bg-3.png')
      ];

      bgImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch(err => {
          console.log('Some images failed to load, showing anyway');
          setImagesLoaded(true);
        });
    };

    preloadImages();

    // 監聽螢幕尺寸變化，但限制觸發頻率
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkMobile();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // 清理函數
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    }
  }, []);

  // 設置 Intersection Observer 監控元素進入視口
  useEffect(() => {
    // 檢查瀏覽器是否支援 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setSectionVisible(true)
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px', // 提前觀察，增加緩衝
      threshold: 0.1, // 降低需要進入視窗的比例，更早觸發
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 延遲一點點時間再設置可見性，給瀏覽器更多時間進行渲染
          setTimeout(() => {
            setSectionVisible(true);
          }, 100);
          
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

  const renderSection = imagesLoaded || true; // 即使圖片未完全加載也顯示，避免永遠不顯示的問題

  return (
    <div className={styles.section5Wrapper} ref={sectionRef}>
      {renderSection && (
        <>
          {/* 底層背景圖層 - 使用與 Section3 相同的背景 */}
          <div className={styles.bottomBackgroundLayer}>
            <img src={getImagePath('/image/food/bg-5.png')} alt="底層背景" />
          </div>

          {/* 第二層背景圖層 - 根據裝置尺寸選擇不同背景 */}
          <div className={styles.backgroundLayer}>
            {isMobile ? (
              // 手機版背景
              <img
                src={getImagePath('/image/gift/mb.png')}
                alt="手機背景"
                className={styles.mobileBackground}
              />
            ) : (
              // 桌面版背景
              <img
                src={getImagePath('/image/gift/bg.png')}
                alt="桌面背景"
                className={styles.desktopBackground}
              />
            )}
          </div>

          <div className={`${styles.section5Container} ${sectionVisible ? styles.visible : ''}`}>
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

            {/* 獎品展示區 - 第一排 */}
            <div className={styles.prizesRowTop}>
              {prizes.slice(0, 3).map((prize, index) => (
                <div
                  key={prize.id}
                  className={`${styles.prizeItem} ${sectionVisible ? styles.visible : ''}`}
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

            {/* 獎品展示區 - 第二排 */}
            <div className={styles.prizesRowBottom}>
              {prizes.slice(3, 5).map((prize, index) => (
                <div
                  key={prize.id}
                  className={`${styles.prizeItem} ${sectionVisible ? styles.visible : ''}`}
                  style={{ transitionDelay: `${0.65 + index * 0.15}s` }}
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
        </>
      )}
    </div>
  )
}

export default Section5