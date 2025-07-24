import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const Section3 = () => {
  const [leftSectionVisible, setLeftSectionVisible] = useState(false)
  const [rightSectionVisible, setRightSectionVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTabletPortrait, setIsTabletPortrait] = useState(false)
  const leftSectionRef = useRef(null)
  const rightSectionRef = useRef(null)
  const router = useRouter()

  // 創建一個函數來處理圖片路徑
  const getImagePath = (path) => `${router.basePath}${path}`

  // 檢測螢幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

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

  // 根據螢幕大小選擇背景圖片
  const getBackgroundImage = () => {
    if (isMobile) {
      return getImagePath('/image/market/m-dec-02.png')
    } else if (isTabletPortrait) {
      return getImagePath('/image/market/t-dec-02.png')
    } else {
      return getImagePath('/image/market/w-dec-02.png')
    }
  }

  // 跳轉到票選活動騰訊表單
  const redirectToVoteTencentForm = () => {
    window.open('https://wj.qq.com/s2/19624850/3457/', '_blank')
  }

  // 跳轉到票選活動Google表單
  const redirectToVoteGoogleForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfQx_cD7lK5a2WacVmOLeKIBbwSllS5I7uYdDq9sNsrK_q_KQ/viewform?usp=dialog',
      '_blank'
    )
  }

  // 跳轉到徵文活動騰訊表單
  const redirectToWriteTencentForm = () => {
    window.open('https://wj.qq.com/s2/19612936/k065/', '_blank')
  }

  // 跳轉到徵文活動Google表單
  const redirectToWriteGoogleForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeuPt_Eu2EcvipyK-fqHFzt1Pn9goly_0C-e2Uf7Wn2couQ1Q/viewform?usp=sharing&ouid=108228840425763263474',
      '_blank'
    )
  }

  // 設置 Intersection Observer 監控元素進入視口
  useEffect(() => {
    // 檢查瀏覽器是否支援 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setLeftSectionVisible(true)
      setRightSectionVisible(true)
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
          // 判斷是哪個元素進入視口
          if (entry.target === leftSectionRef.current) {
            setLeftSectionVisible(true)
          } else if (entry.target === rightSectionRef.current) {
            setRightSectionVisible(true)
          }
          // 一旦元素顯示，不再觀察
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // 開始觀察左右兩欄
    if (leftSectionRef.current) {
      observer.observe(leftSectionRef.current)
    }
    if (rightSectionRef.current) {
      observer.observe(rightSectionRef.current)
    }

    // 清理函數
    return () => {
      const leftRef = leftSectionRef.current
      const rightRef = rightSectionRef.current

      if (leftRef) {
        observer.unobserve(leftRef)
      }
      if (rightRef) {
        observer.unobserve(rightRef)
      }
    }
  }, [])

  return (
    <div className={styles.section3Wrapper}>
      {/* 背景圖層 */}
      <div className={styles.backgroundLayer}>
        <img src={getBackgroundImage()} alt="背景" />
      </div>

      <div className={styles.section3Container}>
        {/* 標題區域 - 像 Section2 那樣置中 */}
        <div className={styles.sectionTitle}>
          <img
            src={getImagePath('/image/market/title-2.png')}
            alt="活動標題"
            className={styles.titleImage}
          />
        </div>

        <div className={styles.activitiesContainer}>
          {/* 左側區域 - 票選活動 */}
          <div
            ref={leftSectionRef}
            className={`${styles.leftSection} ${
              leftSectionVisible
                ? 'animate__animated animate__fadeInLeft'
                : styles.invisible
            }`}
          >
            {/* 票選活動小標題 */}
            <div className={styles.sectionSubtitle}>
              <span>票選活動</span>
            </div>

            {/* 票選活動內容區 */}
            <div className={styles.contentBox}>
              {/* 活動描述 */}
              <p className={styles.activityDescription}>
                我們將在央廣官網和社群媒體平台介紹台灣10大夜市。
                <br />
                透過 Google表單/騰訊表單
                投票，選出您心目中最想造訪的台灣夜市，並請標註您是從哪個節目得知此活動。
              </p>

              {/* 按鈕容器 */}
              <div className={styles.buttonsContainer}>
                {/* Google 表單按鈕 */}
                <div className={styles.tencentButtonWrapper}>
                  <button
                    className={styles.tencentButton}
                    onClick={redirectToVoteGoogleForm}
                  >
                    <img
                      src={getImagePath('/image/market/forms-1.png')}
                      alt="Google表單"
                      className={styles.tencentIcon}
                    />
                    <span>投票Google表單</span>
                  </button>
                </div>

                {/* 騰訊表單按鈕 */}
                <div className={styles.tencentButtonWrapper}>
                  <button
                    className={styles.tencentButton}
                    onClick={redirectToVoteTencentForm}
                  >
                    <img
                      src={getImagePath('/image/market/forms.png')}
                      alt="騰訊表單"
                      className={styles.tencentIcon}
                    />
                    <span>投票騰訊表單</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右側區域 - 徵文活動 */}
          <div
            ref={rightSectionRef}
            className={`${styles.rightSection} ${
              rightSectionVisible
                ? 'animate__animated animate__fadeInRight'
                : styles.invisible
            }`}
          >
            {/* 徵文活動小標題 */}
            <div className={styles.sectionSubtitle}>
              <span>徵文活動</span>
            </div>

            {/* 徵文活動內容區 */}
            <div className={styles.contentBox}>
              {/* 徵文活動描述 */}
              <p className={styles.activityDescription}>
                主題：「我與台灣夜市的故事」
                <br />
                字數要求：50-100字
                <br />
                內容：分享您與台灣夜市之間的 難忘故事或特別經歷。
                <br />
                <br />
                投稿方式： <br />
                a. 電子郵件：發送至 rtifans@rti.org.tw <br />
                b. 線上投稿：透過 Google表單/騰訊表單 <br />
                請在投票或投稿時，標註您是從哪個節目得知此活動
              </p>

              {/* 徵文活動按鈕 */}
              <div className={styles.buttonsContainer}>
                {/* Google 表單按鈕 */}
                <div className={styles.tencentButtonWrapper}>
                  <button
                    className={styles.tencentButton}
                    onClick={redirectToWriteGoogleForm}
                  >
                    <img
                      src={getImagePath('/image/market/forms-1.png')}
                      alt="Google表單"
                      className={styles.tencentIcon}
                    />
                    <span>徵文Google表單</span>
                  </button>
                </div>

                {/* 騰訊表單按鈕 */}
                <div className={styles.tencentButtonWrapper}>
                  <button
                    className={styles.tencentButton}
                    onClick={redirectToWriteTencentForm}
                  >
                    <img
                      src={getImagePath('/image/market/forms.png')}
                      alt="騰訊表單"
                      className={styles.tencentIcon}
                    />
                    <span>徵文騰訊表單</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 活動時間 - 獨立放在兩個框下方，手機版自動折行 */}
        <div className={styles.activityPeriod}>
          <span className={styles.desktopTime}>
            114年08月10日～114年10月10日（得獎公布日期：114年10月15日）
          </span>
          <span className={styles.mobileTime}>
            114年08月10日～114年10月10日
            <br />
            （得獎公布日期：114年10月15日）
          </span>
        </div>
      </div>
    </div>
  )
}

export default Section3
