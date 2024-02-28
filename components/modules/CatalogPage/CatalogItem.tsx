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
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)

  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((itemCart) => itemCart.id === item.id)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const skeletonDarkMode = mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''

  const [spinner, setSpinner] = useState(false)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
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
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
