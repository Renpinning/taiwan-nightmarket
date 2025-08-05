import IndexLayout from '../components/layout'
import AnimatedBanner from '../components/layout/banner'
import Section7 from '../components/page-components/home/section-7'
import styles from './styles.module.css'

export default function WinnersList() {
  return (
    <IndexLayout
      showBanner={false}
      title="台灣10大夜市-得獎名單"
      pageName="list"
    >
      <AnimatedBanner />
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <Section7 className={styles.section} />
        </main>
      </div>
    </IndexLayout>
  )
}
