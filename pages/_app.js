import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    const loadBootstrap = async () => {
      try {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js')
      } catch (error) {
        console.error('Failed to load Bootstrap JS:', error)
      }
    }

    loadBootstrap()
  }, [])

  return <>{getLayout(<Component {...pageProps} />)}</>
}
