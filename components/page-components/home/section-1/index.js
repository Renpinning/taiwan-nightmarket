import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const Section1 = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // 檢測是否為手機尺寸
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576)
    }

    // 初始檢測
    checkMobile()

    // 監聽視窗大小變化
    window.addEventListener('resize', checkMobile)

    // 建立 Intersection Observer 來監視元素是否進入視窗
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 一旦顯示，就停止觀察
          observer.unobserve(entry.target)
        }
      },
      {
        // 設定元素進入視窗 20% 時觸發
        threshold: 0.2,
      }
    )

    // 開始觀察
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // 清理函數
    return () => {
      const currentRef = sectionRef.current
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // 根據屏幕大小選擇背景圖片
  const backgroundImage = isMobile
    ? `${router.basePath}/image/banner/mb-1.png`
    : `${router.basePath}/image/banner/bg.png`

  return (
    <div>
      {/* 文字區塊 */}
      <section className={styles.textSection} ref={sectionRef}>
        <div
          className={styles.textSectionBackground}
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        ></div>

        {/* 文字內容 - 動畫類將根據 isVisible 狀態添加 */}
        <div
          className={`${styles.textSectionContent} animate__animated ${
            isVisible ? 'animate__fadeIn' : ''
          }`}
        >
          <p className={styles.textSectionParagraph}>
            台灣的飲食文化豐富多元，各地美食更是深受民眾與遊客喜愛。從夜市小吃到地方特色，每道經典小吃都蘊含著台灣人的生活記憶與飲食智慧。為了讓更多人認識台灣的經典小吃，央廣特別策劃了
            <span className={styles.highlight}>
              「台灣10大經典小吃」票選活動
            </span>
            ，我們誠摯邀請您參與，不僅可以為您最愛的台灣小吃投票，更能藉此機會探索台灣各地的美食文化。讓我們一起品味台灣的美味傳承，感受道地的飲食魅力。
          </p>
        </div>
      </section>
    </div>
  )
}

export default Section1
