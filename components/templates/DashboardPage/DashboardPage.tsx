import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { useEffect, useState } from 'react'
import { IBoilerParts } from '@/types/boilerparts'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $shoppingCart } from '@/context/shopping-cart'
import { motion, AnimatePresence } from 'framer-motion'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  const [newsParts, setNewsParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const loadBoilerParts = async () => {
      try {
        setSpinner(true)
        const bestsellers = await getBestsellersOrNewPartsFx(
          '/boiler-parts/bestsellers'
        )
        const newsParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

        setBestsellers(bestsellers)
        setNewsParts(newsParts)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setSpinner(false)
      }
    }
    loadBoilerParts()
  }, [])
  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container} `}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert count={shoppingCart?.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers?.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newsParts?.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить
            неисправность и правильно выбрать запчасть для ремонта Вашего
            газового оборудования. Купить запчасть, деталь для ремонта газового
            котла возможно в любом населенном пункте Российской Федерации:
            Осуществляем доставку запчасти к газовым котлам в следующие города:
            Москва, Сан
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
