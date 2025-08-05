import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from './footer'
import Router from 'next/router'
import LoadingSpinner from '../ui/loading-spinner'

export default function IndexLayout({
  children = '',
  title = '',
  pageName = '',
  background = '',
  siteTitle = 'Rti',
  description = '台灣10大夜市 - 探索台灣最具特色的夜市文化，品嚐道地美食，體驗在地生活',
  keywords = '台灣夜市,夜市美食,台灣小吃,夜市文化,台灣旅遊,在地美食,傳統市場,Taiwan night market,Taiwan street food,Taiwan cuisine,RTI,中央廣播電臺,Radio Taiwan International',
  image = '/image/Rti_logo.png',
}) {
  const [pageLoading, setPageLoading] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const router = useRouter()
  const getImagePath = (path) => `${router.basePath}${path}`

  // 根據環境設定正確的 URL
  const isProduction = process.env.NODE_ENV === 'production'
  const baseUrl = isProduction
    ? 'https://foreign-ap.rti.org.tw'
    : `http://localhost:${process.env.PORT || 3000}`

  // 考慮 basePath 的完整 URL
  const fullPath = router.basePath + router.asPath
  const currentUrl = `${baseUrl}${fullPath}`
  const fullImageUrl = `${baseUrl}${getImagePath(image)}`

  useEffect(() => {
    let timer

    const handleStart = () => {
      timer = setTimeout(() => setLoadingVisible(true), 1200)
      setPageLoading(true)
    }

    const handleComplete = () => {
      clearTimeout(timer)
      setLoadingVisible(false)
      setPageLoading(false)
    }

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleComplete)
    Router.events.on('routeChangeError', handleComplete)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleComplete)
      Router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <>
      <div className={`layout ${background}`}>
        <Head>
          <title>{`${title ? `${title} | ` : ''}${siteTitle}`}</title>

          {/* 基本 meta 標籤 */}
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content="Radio Taiwan International (RTI)" />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="Content-Language" content="zh-TW" />

          {/* 只在生產環境添加語言設定 */}
          {isProduction && (
            <>
              <link rel="alternate" hrefLang="zh-TW" href={currentUrl} />
              <link rel="alternate" hrefLang="x-default" href={currentUrl} />
            </>
          )}

          {/* Open Graph 標籤 (Facebook, LINE 等社群媒體) */}
          <meta
            property="og:title"
            content={`${title ? `${title} | ` : ''}${siteTitle}`}
          />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={fullImageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="台灣10大夜市" />
          <meta property="og:locale" content="zh_TW" />

          {/* Twitter Card 標籤 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${title ? `${title} | ` : ''}${siteTitle}`}
          />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={fullImageUrl} />

          {/* 只在生產環境添加結構化資料 */}
          {isProduction && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: '台灣10大夜市',
                  url: currentUrl,
                  description: description,
                  inLanguage: 'zh-TW',
                  publisher: {
                    '@type': 'Organization',
                    name: 'Radio Taiwan International',
                    alternateName: 'RTI',
                    url: 'https://www.rti.org.tw',
                    logo: {
                      '@type': 'ImageObject',
                      url: fullImageUrl,
                    },
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: currentUrl + '?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                  // 夜市相關的結構化資料
                  mainEntity: {
                    '@type': 'ItemList',
                    name: '台灣10大夜市',
                    description: '台灣最具特色的十大夜市介紹',
                    numberOfItems: 10,
                  },
                }),
              }}
            />
          )}

          {/* Favicon 設定 */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={getImagePath('/image/Rti_logo.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={getImagePath('/image/Rti_logo.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={getImagePath('/image/Rti_logo.png')}
          />

          {/* 預載入重要資源 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
        </Head>
        {pageLoading && loadingVisible && <LoadingSpinner />}
        <main className="main">{children}</main>
        <Footer />
      </div>
      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #fffcf8;
          position: relative;
          z-index: 1;
        }
        .light {
          background: #fffcf8;
          background-attachment: fixed;
          background-size: cover;
        }
        .main {
          flex: 1;
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  )
}
