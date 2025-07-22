import IndexLayout from '../components/layout'
import AnimatedBanner from '../components/layout/banner'
import Section1 from '../components/page-components/home/section-1'
import Section2 from '../components/page-components/home/section-2'
import Section3 from '../components/page-components/home/section-3'
import Section5 from '../components/page-components/home/section-5'
import Section6 from '../components/page-components/home/section-6'
import styles from './styles.module.css'

export default function Home() {
  return (
    <IndexLayout showBanner={false} title="台灣10大經典小吃" pageName="home">
      <AnimatedBanner />
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <Section1 className={styles.section} />
        </main>
        <main className={styles.mainContent}>
          <Section2 className={styles.section} />
        </main>
        <main className={styles.mainContent}>
          <Section3 className={styles.section} />
        </main>
        <main className={styles.mainContent}>
          <Section5 className={styles.section} />
        </main>
        <main className={styles.mainContent}>
          <Section6 className={styles.section} />
        </main>
      </div>
    </IndexLayout>
  )
}
