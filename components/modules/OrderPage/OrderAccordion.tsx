import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/order/index.module.scss'
import { IOrderAccordionProps } from '@/types/order'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import DoneSvg from '@/components/elements/DoneSvg/DoneSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import EditSvg from '@/components/elements/EditSvg/EditSvg'
import { useState } from 'react'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import CartPopupItem from '@/components/modules/Header/CartPopup/CartPopupItem'
import OrderItem from '@/components/modules/OrderPage/OrderItem'
import { formatPrice } from '@/utils/common'

const OrderAccordion = ({
  setOrderIsReady,
  showDoneIcon,
}: IOrderAccordionProps) => {
  const shoppingCarts = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMedia550 = useMediaQuery(550)
  const [expanded, setExpanded] = useState(true)

  const openAccordion = () => {
    setOrderIsReady(false)
    setExpanded(true)
  }
  const closeAccordion = () => {
    setOrderIsReady(true)
    setExpanded(false)
  }

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Корзина
        </h3>
        <button
          className={styles.order__cart__title__btn}
          onClick={openAccordion}
        >
          <span>
            <EditSvg />
          </span>
          {isMedia550 ? '' : 'Редактировать'}
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{
              overflow: 'hidden',
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.order__cart__content} ${darkModeClass}`}>
              <ul className={styles.order__cart__list}>
                {shoppingCarts?.length ? (
                  shoppingCarts.map((item) =>
                    isMedia550 ? (
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
                        userId={item.userId}
                        partId={item.partId}
                      />
                    ) : (
                      <OrderItem
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
                        userId={item.userId}
                        partId={item.partId}
                      />
                    )
                  )
                ) : (
                  <li className={styles.order__cart__empty}>
                    <span
                      className={`${styles.order__cart__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.order__cart__footer}>
                <div className={styles.order__cart__footer__total}>
                  <span
                    className={`${styles.order__cart__footer__text} ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.order__cart__footer__price}>
                    {formatPrice(totalPrice)} P
                  </span>
                </div>
                <button
                  className={styles.order__cart__footer__btn}
                  onClick={closeAccordion}
                  disabled={!shoppingCarts.length}
                >
                  Продолжить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default OrderAccordion
