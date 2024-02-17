import styles from '@/styles/header/index.module.scss'
import HeaderTop from '@/components/modules/Header/HeaderTop'
import HeaderBottom from '@/components/modules/Header/HeaderBottom'

const Header = () => (
  <header className={styles.header}>
    <HeaderTop />
    <HeaderBottom />
  </header>
)

export default Header
