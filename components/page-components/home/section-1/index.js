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
            台灣夜市文化是島嶼生活的重要縮影，也是展現地方風情與飲食文化的最佳場域。
            從琳瑯滿目的街頭美食、熱鬧非凡的遊戲攤位，到充滿人情味的互動場景，每個夜市都有屬於自己的故事與魅力。
            為了讓更多人認識台灣夜市的多元風貌，央廣特別策劃
            <span className={styles.highlight}>
              「台灣10大夜市」票選及徵文活動
            </span>
            ，誠摯邀請您一同參與。
            不僅能選出您心中的夢幻夜市，更能藉此機會細細品味台灣最在地的夜生活文化。
          </p>
        </div>
      </section>
    </div>
  )
}

export default Section1
