import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/part/index.module.scss'
import { $boilerPart } from '@/context/boiler-part'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shoppingCart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import {
  $boilerParts,
  setBoilerParts,
  setBoilerPartsByPopularity,
} from '@/context/boiler-parts'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'

const PartPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)

  const isMobile = useMediaQuery(850)
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id)

  const toggleToCart = () =>
    toggleCartItem(user.username, boilerPart.id, isInCart, setSpinnerToggleCart)

  const [spinnerSlider, setSpinnerSlider] = useState(false)

  useEffect(() => {
    loadBoilerParts()
  }, [])
  const loadBoilerParts = async () => {
    try {
      setSpinnerSlider(true)
      const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)

      setBoilerParts(data)
      setBoilerPartsByPopularity()
      return
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setTimeout(() => setSpinnerSlider(false), 700)
    }
  }

  return (
    <section>
      <div className={`container`}>
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {boilerPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                {boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={`${styles.part__info__code} ${darkModeClass}`}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                      {isInCart ? (
                        <span>Добавлено в корзину</span>
                      ) : (
                        <span>Положить в корзину</span>
                      )}
                    </span>
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                  >
                    {boilerPart.name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title="Совместимость">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                >
                  {boilerPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={`${styles.part__bottom} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            items={boilerParts.rows || []}
            spinner={spinnerSlider}
          />
        </div>
      </div>
    </section>
  )
}
export default PartPage
