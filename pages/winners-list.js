import IndexLayout from '../components/layout'
import AnimatedBanner from '../components/layout/banner'
import Section1 from '../components/page-components/home/section-1'
import Section2 from '../components/page-components/home/section-2'
import Section8 from '../components/page-components/home/section-8'
import Section7 from '../components/page-components/home/section-7'
import styles from './styles.module.css'

export default function WinnersList() {
  return (
    <IndexLayout
      showBanner={false}
      title="台灣10大經典小吃-得獎名單"
      pageName="list"
    >
      <AnimatedBanner />
      <div className={styles.pageContainer}>
        {/* <main className={styles.mainContent}>
          <Section1 className={styles.section} />
        </main>
        <main className={styles.mainContent}>
          <Section2 className={styles.section} />
        </main> */}
        <main className={styles.mainContent}>
          <Section7 className={styles.section} />
        </main>
        {/* <main className={styles.mainContent}>
          <Section8 className={styles.section} />
        </main> */}
      </div>
    </IndexLayout>
  )
}
