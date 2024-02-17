import { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/cartPopup/index.module.scss'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import { AnimatePresence, motion } from 'framer-motion'
import { $shoppingCart } from '@/context/shopping-cart'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const shoppingCart = useStore($shoppingCart)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const toggleProfileDown = () => setOpen(!open)

    return (
      <div className={styles.cart} ref={ref}>
        <button className={styles.cart__btn}>
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
                  shoppingCart.map((item) => <li key={item.name} />)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span className={styles.cart__popup__empty__text}>
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
