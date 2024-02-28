import { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/cartPopup/index.module.scss'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    // Используем хук useStore для получения состояния из вашего магазина

    const mode = useStore($mode) // предполагается, что $mode - это состояние темы (например, 'light' или 'dark')
    const shoppingCart = useStore($shoppingCart) // предполагается, что $shoppingCart - это состояние корзины покупок

    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '' // Определяем класс для стилизации темной темы

    const toggleCartDropDown = () => setOpen(!open) // Функция для переключения состояния открытия/закрытия корзины

    return (
      <div className={styles.cart} ref={ref}>
        <button className={styles.cart__btn} onClick={toggleCartDropDown}>
          {!!shoppingCart && (
            <span className={styles.cart__btn__count}>
              {shoppingCart.length}
            </span>
          )}
          <span className={styles.cart__svg}>
            <ShoppingCartSvg />
          </span>
          <span className={styles.cart__text}>Корзина</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => <li key={item.id} />)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text}  ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>0</span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={`${styles.cart__popup__footer__btn} ${darkModeClass}`}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
