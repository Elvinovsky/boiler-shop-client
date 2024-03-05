import { ICartAlertProps } from '@/types/dashboard'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'

const CartAlert = ({ closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const totalPrice = useStore($totalPrice)
  const shoppingCarts = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const count = shoppingCarts.reduce(
    (defaultCount, item) => defaultCount + item.count,
    0
  )

  const showCartMessage = (countStr: string) => {
    if (countStr.endsWith('1')) {
      return 'товар'
    }
    if (
      countStr.endsWith('2') ||
      countStr.endsWith('3') ||
      countStr.endsWith('4')
    ) {
      return 'товара'
    }

    return 'товаров'
  }

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          В корзине {count} {showCartMessage(count.toString())}
        </span>
        <span>На сумму {formatPrice(totalPrice)} P</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_order}> Оформить заказ</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default CartAlert
