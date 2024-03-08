import { IShoppingCartItemProps } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { formatPrice } from '@/utils/common'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'

const CartPopupItem = (item: IShoppingCartItemProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const { spinner, increasePrice, decreasePrice, deleteCartItem, price } =
    usePrice(item.count, item.price, item.partId)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
              {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button
          className={styles.cart__popup__list__item__top__button}
          onClick={deleteCartItem}
        >
          <span>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: 5, right: '50%', width: 15, height: 15 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span
            className={`${styles.cart__popup__list__item__empty} ${darkModeClass}`}
          >
            Нет на складе
          </span>
        ) : (
          <CartItemCounter
            decreasePrice={decreasePrice}
            increasePrice={increasePrice}
            partId={item.partId}
            initialCount={item.count}
            totalCount={item.in_stock}
          />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} P
        </span>
      </div>
    </li>
  )
}
export default CartPopupItem
