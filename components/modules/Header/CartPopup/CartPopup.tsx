import { forwardRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { IWrappedComponentProps } from '@/types/common'
import { $mode } from '@/context/mode'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import {
  $disableCart,
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'
import styles from '@/styles/cartPopup/index.module.scss'
import CartPopupItem from '@/components/modules/Header/CartPopup/CartPopupItem'
import { getCartItemFX } from '@/app/api/shoppingCart'
import { $user } from '@/context/user'
import { toast } from 'react-toastify'
import { formatPrice } from '@/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const disableCart = useStore($disableCart)
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const shoppingCart = useStore($shoppingCart)
    const totalPrice = useStore($totalPrice)
    const user = useStore($user)
    const count = shoppingCart.reduce(
      (defaultCount, item) => defaultCount + item.count,
      0
    )
    const toggleCartDropDown = () => setOpen(!open)

    useEffect(() => {
      loadCartItems()
    }, [])

    useEffect(() => {
      setTotalPrice(
        shoppingCart.reduce(
          (defaultCount, item) => defaultCount + item.total_price,
          0
        )
      )
    }, [shoppingCart])
    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItemFX(`/shopping-cart/${user.userId}`)
        setShoppingCart(cartItems)
      } catch (err) {
        toast.error((err as Error).message)
      }
    }

    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            style={{ cursor: 'auto' }}
            disabled={true}
          >
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        ) : (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            onClick={toggleCartDropDown}
          >
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>{count}</span>
            )}
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        )}
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
                  shoppingCart.map((item) => (
                    <CartPopupItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      in_stock={item.in_stock}
                      parts_manufacturer={item.parts_manufacturer}
                      boiler_manufacturer={item.boiler_manufacturer}
                      count={item.count}
                      total_price={item.total_price}
                      userId={+user.userId}
                      partId={item.partId}
                    />
                  ))
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
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(totalPrice)} P
                  </span>
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
