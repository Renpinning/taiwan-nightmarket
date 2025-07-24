import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const AnimatedBanner = () => {
  const [mounted, setMounted] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [bgImageLoaded, setBgImageLoaded] = useState(false)
  const containerRef = useRef(null)
  const router = useRouter()

  // 創建一個函數來處理圖片路徑
  const getImagePath = (path) => `${router.basePath}${path}`

  // 預加載第一張背景圖片
  useEffect(() => {
    // 根據當前設備類型選擇要預加載的背景圖
    let firstBgSrc = ''
    if (isMobile) {
      firstBgSrc = getImagePath('/image/banner/mb.png')
    } else if (isTablet) {
      firstBgSrc = getImagePath('/image/banner/tg.png')
    } else {
      firstBgSrc = getImagePath('/image/banner/bg-1.png')
    }

    // 預加載第一張背景圖片
    const img = new Image()
    img.onload = () => {
      setBgImageLoaded(true)
      // 圖片加載完成後再設置淡入動畫
      setTimeout(() => {
        setMounted(true)
      }, 100)
    }
    img.onerror = () => {
      // 即使圖片載入失敗也要繼續顯示內容
      setBgImageLoaded(true)
      setTimeout(() => {
        setMounted(true)
      }, 100)
    }
    img.src = firstBgSrc

    // 如果圖片已從緩存載入，onload 可能不會觸發
    if (img.complete) {
      setBgImageLoaded(true)
      setTimeout(() => {
        setMounted(true)
      }, 100)
    }
  }, [isMobile, isTablet, router.basePath])

  useEffect(() => {
    // 檢測裝置類型
    const handleResize = () => {
      const currentWidth = window.innerWidth

      // 先判斷是否為手機 (寬度 <= 576px)
      const isMobileDevice = currentWidth <= 576
      setIsMobile(isMobileDevice)

      // 如果不是手機，再判斷是否為平板
      if (!isMobileDevice) {
        // 檢測是否為 iPad mini 橫向模式 (1024x768)
        const isIPadMiniLandscape =
          currentWidth === 1024 && window.innerHeight === 768

        // 檢測是否為寬度 540px 的設備（需要顯示平板版）
        const is540Width = currentWidth === 540

        // 檢測是否為寬度 720px 的設備（需要顯示桌面版）
        const is720Width = currentWidth === 720

        setIsTablet(
          (currentWidth <= 1024 &&
            currentWidth > 576 &&
            !isIPadMiniLandscape &&
            !is720Width) ||
            is540Width
        )
      } else {
        // 如果是手機，確保平板狀態是關閉的
        setIsTablet(false)
      }
    }

    // 初始檢測
    handleResize()

    // 監聽視窗大小變化 - 使用去抖動函數優化效能
    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  // 手機版本渲染 (必須先檢查，優先於平板和桌面版)
  if (isMobile) {
    return (
      <div className={styles.mobileBannerContainer} ref={containerRef}>
        {/* 手機第一張背景圖 */}
        <div className={styles.mobileBannerBg1}>
          <img
            src={getImagePath('/image/banner/mb.png')}
            alt="手機背景圖片1"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{ transform: 'translateZ(0)' }}
          />
        </div>

        {/* 手機裝飾圖片 - 霓虹燈動畫 */}
        <div
          className={styles.mobileBannerBg2}
          style={{ opacity: mounted ? 1 : 0 }}
        >
          <img
            src={getImagePath('/image/banner/mb-dec.png')}
            alt="手機裝飾圖片"
            loading="lazy"
            className={styles.decorationImage}
          />
        </div>

        {/* 主要標誌 - 彈入動畫，無浮動效果 */}
        <div className={styles.mobileLogoContainer}>
          <div
            className={`${styles.mobileLogoWrapper} ${
              mounted ? 'animate__animated animate__bounceIn' : styles.hidden
            }`}
          >
            <img
              src={getImagePath('/image/banner/m-logo.png')}
              alt="台灣經典小吃票選活動"
              className={styles.floatingLogo}
              loading="eager"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
              }}
            />
          </div>
        </div>

        {/* RTI logo固定於左上角 */}
        <div className={styles.mobileRtiLogoContainer}>
          <img
            src={getImagePath('/image/banner/Rti-logo.png')}
            alt="RTI Logo"
            loading="eager"
          />
        </div>
      </div>
    )
  }

  // 平板版本渲染
  if (isTablet) {
    return (
      <div className={styles.tabletBannerContainer} ref={containerRef}>
        {/* 平板第一張背景圖 */}
        <div className={styles.tabletBannerBg1}>
          <img
            src={getImagePath('/image/banner/tg.png')}
            alt="平板背景圖片1"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{ transform: 'translateZ(0)' }}
          />
        </div>

        {/* 平板裝飾圖片 - 霓虹燈動畫 */}
        <div
          className={styles.tabletBannerBg2}
          style={{ opacity: mounted ? 1 : 0 }}
        >
          <img
            src={getImagePath('/image/banner/dec.png')}
            alt="平板裝飾圖片"
            loading="lazy"
            className={styles.decorationImage}
          />
        </div>

        {/* 主要標誌 - 彈入動畫與浮動效果 */}
        <div className={styles.tabletLogoContainer}>
          <div
            className={`${styles.tabletLogoWrapper} ${
              mounted ? 'animate__animated animate__bounceIn' : styles.hidden
            }`}
          >
            <img
              src={getImagePath('/image/banner/tg-logo.png')}
              alt="台灣經典小吃票選活動"
              className={styles.floatingLogo}
              loading="eager"
            />
          </div>
        </div>

        {/* RTI logo固定於左上角 */}
        <div className={styles.rtiLogoContainer}>
          <img
            src={getImagePath('/image/banner/Rti-logo.png')}
            alt="RTI Logo"
            loading="eager"
          />
        </div>
      </div>
    )
  }

  // 桌面版本渲染
  return (
    <div className={styles.bannerContainer} ref={containerRef}>
      {/* 第一張背景圖 (bg-1) */}
      <div className={styles.bannerBg1}>
        <img
          src={getImagePath('/image/banner/bg-1.png')}
          alt="背景圖片1"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      {/* 桌面裝飾圖片 - 霓虹燈動畫 */}
      <div className={styles.bannerBg2} style={{ opacity: mounted ? 1 : 0 }}>
        <img
          src={getImagePath('/image/banner/web-dec.png')}
          alt="桌面裝飾圖片"
          loading="lazy"
          className={styles.decorationImage}
        />
      </div>

      {/* 主要標誌 - 彈入動畫與浮動效果 */}
      <div className={styles.logoContainer}>
        <div
          className={`${styles.logoWrapper} ${
            mounted ? 'animate__animated animate__bounceIn' : styles.hidden
          }`}
        >
          <img
            src={getImagePath('/image/banner/logo.png')}
            alt="台灣經典小吃票選活動"
            className={styles.floatingLogo}
            loading="eager"
          />
        </div>
      </div>

      {/* RTI logo固定於左上角 */}
      <div className={styles.rtiLogoContainer}>
        <img
          src={getImagePath('/image/banner/Rti-logo.png')}
          alt="RTI Logo"
          loading="eager"
        />
      </div>
    </div>
  )
}

export default AnimatedBanner
