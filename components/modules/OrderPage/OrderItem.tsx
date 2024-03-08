import { IShoppingCartItemProps } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const OrderItem = (item: IShoppingCartItemProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMedia1160 = useMediaQuery(1160)
  const { spinner, increasePrice, decreasePrice, deleteCartItem, price } =
    usePrice(item.count, item.price, item.partId)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>
                {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
                {item.boiler_manufacturer}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span
              className={`${styles.order__cart__list__item__empty} ${darkModeClass}`}
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
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span
              className={`${styles.order__cart__list__item__empty} ${darkModeClass}`}
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
          ))}
        <span
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)} P
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          <span>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '-12px', left: '-30px', width: 25, height: 25 }}
              />
            ) : (
              'удалить'
            )}
          </span>
        </button>
      </div>
    </li>
  )
}
export default OrderItem
