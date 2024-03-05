import { ICartItemCounterProps } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/cartPopup/index.module.scss'
import PlusSvg from '@/components/elements/PlusSvg/PlusSvg'
import MinusSvg from '@/components/elements/MinusSvg/MinusSvg'
import { useEffect, useState } from 'react'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'
import { updateCartItemFx } from '@/app/api/shoppingCart'
import { updateCartItemCount } from '@/context/shopping-cart'
const CartItemCounter = ({
  totalCount,
  increasePrice,
  partId,
  decreasePrice,
  initialCount,
}: ICartItemCounterProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const [spinner, setSpinner] = useState(false)
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (count === totalCount) {
      setDisableIncrease(true)
    }
    if (count === 1) {
      setDisableDecrease(true)
    }
  }, [count, totalCount])

  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)

  const inCrease = async () => {
    try {
      setSpinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const data = await updateCartItemFx({
        url: `shopping-cart/count/${partId}`,
        payload: { count: count + 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }
  const deCrease = async () => {
    try {
      setSpinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const data = await updateCartItemFx({
        url: `shopping-cart/count/${partId}`,
        payload: { count: count - 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      <button onClick={deCrease} disabled={disableDecrease}>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button onClick={inCrease} disabled={disableIncrease}>
        <PlusSvg />
      </button>
    </div>
  )
}
export default CartItemCounter
