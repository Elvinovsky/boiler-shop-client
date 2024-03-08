import { IBoilerPart } from '@/types/boilerparts'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shoppingCart'
import { $user } from '@/context/user'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((itemCart) => itemCart.partId === item.id)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [spinner, setSpinner] = useState(false)
  const toggleToCart = () =>
    toggleCartItem(user.username, item.id, isInCart, setSpinner)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={JSON.parse(item.images)[0]} alt={item.name} />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} legacyBehavior passHref>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ''
        }`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
