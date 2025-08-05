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
    <IndexLayout
      showBanner={false}
      title="台灣10大夜市"
      pageName="home"
      description="探索台灣最具特色的10大夜市，品嚐道地台灣小吃，體驗濃厚的夜市文化。從士林夜市到逢甲夜市，帶您深入了解台灣夜市的魅力與美食。"
      keywords="台灣10大夜市,士林夜市,逢甲夜市,寧夏夜市,饒河夜市,花園夜市,六合夜市,夜市美食,台灣小吃,夜市文化,台灣旅遊,在地美食,Taiwan night market,street food,RTI,中央廣播電臺"
    >
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
