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
}) {
  const [pageLoading, setPageLoading] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const router = useRouter()
  const getImagePath = (path) => `${router.basePath}${path}`

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
          <link rel="icon" href="/favicon.ico" />
          {/* 支援更多設備和瀏覽器 */}
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
        </Head>
        {pageLoading && loadingVisible && <LoadingSpinner />}
        <main className="main">{children}</main>
        {/* <TopBtn /> */}
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
