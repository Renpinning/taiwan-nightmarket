import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import 'animate.css'
import { useRouter } from 'next/router'

const Section3 = () => {
  const [leftSectionVisible, setLeftSectionVisible] = useState(false)
  const [rightSectionVisible, setRightSectionVisible] = useState(false)
  const leftSectionRef = useRef(null)
  const rightSectionRef = useRef(null)
  const router = useRouter()

  // 創建一個函數來處理圖片路徑
  const getImagePath = (path) => `${router.basePath}${path}`

  // 跳轉到票選活動騰訊表單
  const redirectToVoteTencentForm = () => {
    window.open('https://wj.qq.com/s2/19624850/3457/', '_blank')
  }

  // 跳轉到票選活動Google表單
  const redirectToVoteGoogleForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdZ_Qx-EwCRwFmOkYuRhMuuB5drvemfFOxMPCEzPwhjQ9ea0Q/viewform',
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
      'https://docs.google.com/forms/d/e/1FAIpQLSergjpvp2-78Z1iyDJwaGAF3phfq86NmvBlr9cDNwjUeanUFA/viewform',
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
        <img src={getImagePath('/image/food/bg-5.png')} alt="背景" />
      </div>

      <div className={styles.section3Container}>
        {/* 左側區域 - 票選活動 */}
        <div
          ref={leftSectionRef}
          className={`${styles.leftSection} ${
            leftSectionVisible
              ? 'animate__animated animate__fadeInLeft'
              : styles.invisible
          }`}
          style={{
            backgroundImage: `url('${getImagePath('/image/food/bg-7.png')}')`,
          }}
        >
          {/* 票選活動標題圖片 */}
          <div className={styles.titleImageContainer}>
            <img
              src={getImagePath('/image/food/vote.png')}
              alt="票選活動"
              className={styles.titleImage}
            />
          </div>

          {/* 活動描述 */}
          <p className={styles.activityDescription}>
            我們將在央廣官網和社群媒體平台介紹台灣10大經典小吃。
            <br />
            透過此Google表單／騰訊表單 投票，選出您心目中的最愛小吃。
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
                  src={getImagePath('/image/food/forms-1.png')}
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
                  src={getImagePath('/image/food/forms.png')}
                  alt="騰訊表單"
                  className={styles.tencentIcon}
                />
                <span>投票騰訊表單</span>
              </button>
            </div>
          </div>

          {/* 活動日期 */}
          <div className={styles.activityPeriod}>
            114年4月20日～114年6月30日 <br></br>（得獎公布日期：114年7月15日）
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
          style={{
            backgroundImage: `url('${getImagePath('/image/food/bg-7.png')}')`,
          }}
        >
          {/* 徵文活動內容 */}
          <div className={styles.rightContentContainer}>
            {/* 徵文活動標題圖片 */}
            <div className={styles.titleImageContainer}>
              <img
                src={getImagePath('/image/food/write.png')}
                alt="徵文活動"
                className={styles.titleImage}
              />
            </div>

            {/* 徵文活動描述 */}
            <p className={styles.activityDescription}>
              主題：「我與台灣小吃的故事」
              <br />
              字數：50-100字
              <br />
              內容：分享您與台灣小吃之間的 難忘故事或特別經歷。
              <br />
              <br />
              投稿方式： <br />
              a. 電子郵件：發送至 rtifans@rti.org.tw <br />
              b. 線上投稿：透過以下表單
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
                    src={getImagePath('/image/food/forms-1.png')}
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
                    src={getImagePath('/image/food/forms.png')}
                    alt="騰訊表單"
                    className={styles.tencentIcon}
                  />
                  <span>徵文騰訊表單</span>
                </button>
              </div>
            </div>

            {/* 徵文活動日期 */}
            <div className={styles.activityPeriod}>
              114年4月20日～114年6月30日 <br></br>（得獎公布日期：114年7月15日）
            </div>
          </div>
        </div>
      </div>

      {/* 自訂樣式 */}
      <style jsx global>{`
        /* 按鈕容器統一樣式 */
        .${styles.buttonsContainer} {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
          width: 100%;
        }

        /* 右側內容容器 */
        .${styles.rightContentContainer} {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        /* 修改左右區塊寬度為各一半 */
        .${styles.leftSection}, .${styles.rightSection} {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 1.5rem;
          padding: 2.5rem;
          position: relative;
          border: 0.375rem solid #ffda7e;
        }

        .${styles.section3Container} {
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* 移除左側容器左負邊距，使兩側標題對齊 */
        .${styles.leftSection}
          .${styles.titleImageContainer},
          .${styles.rightSection}
          .${styles.titleImageContainer} {
          left: 0;
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        /* 統一兩側的活動描述樣式 */
        .${styles.leftSection}
          .${styles.activityDescription},
          .${styles.rightSection}
          .${styles.activityDescription} {
          padding-right: 0;
          text-align: left;
          width: 100%;
        }

        /* 動畫延遲設定 */
        .${styles.rightSection}.animate__animated {
          animation-delay: 0.3s;
        }

        /* 統一活動日期樣式 */
        .${styles.leftSection}
          .${styles.activityPeriod},
          .${styles.rightSection}
          .${styles.activityPeriod} {
          width: auto;
          margin: 0 auto;
          margin-top: auto;
        }

        /* 響應式調整 */
        @media screen and (max-width: 768px) {
          .${styles.section3Container} {
            flex-direction: column;
          }

          .${styles.leftSection}, .${styles.rightSection} {
            width: 100% !important;
            margin-bottom: 2rem;
            padding: 2rem;
          }

          .${styles.buttonsContainer} {
            width: 100%;
            align-items: center;
          }
        }

        @media (max-width: 48rem) {
          .${styles.leftSection}, .${styles.rightSection} {
            padding: 1.5rem;
          }

          .${styles.buttonsContainer} {
            width: 100%;
          }

          .${styles.tencentButton} {
            width: 100%;
            max-width: 18.75rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Section3
