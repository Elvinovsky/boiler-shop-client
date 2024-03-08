import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import styles from '@/styles/order/index.module.scss'
import { formatPrice } from '@/utils/common'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { checkPaymentFx, makePaymentFx } from '@/app/api/ payment'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { removeFromCartFX } from '@/app/api/shoppingCart'
import { $user, $userCity } from '@/context/user'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderPage = () => {
  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const handleAgreementChange = () => setAgreement(!agreement)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const user = useStore($user)
  const city = useStore($userCity)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: `Заказ №1 ${
          city.city.length ? `Город: ${city.city}, улица: ${city.street}` : ''
        }`,
      })

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    const resetCart = async () => {
      sessionStorage.removeItem('paymentId')
      await removeFromCartFX(`/shopping-cart/all/${user.userId}`)
      setShoppingCart([])
    }

    const checkPayment = async (paymentId: string) => {
      try {
        const data = await checkPaymentFx(`/payment/${paymentId}`)

        if (data.status === 'succeeded') {
          resetCart()
          return
        }

        sessionStorage.removeItem('paymentId')
      } catch (error) {
        console.log((error as Error).message)
        resetCart()
      }
    }

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [user.userId])

  return (
    <section className={styles.order}>
      <div className={`container`}>
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Итого
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>
                  Товары (
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                  )
                </span>
                <span>{formatPrice(totalPrice)} P</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>На сумму</span>
                <span className={darkModeClass}>
                  {formatPrice(totalPrice)} P
                </span>
              </div>
              <button
                className={styles.order__pay__btn}
                disabled={!(orderIsReady && agreement)}
                onClick={makePay}
              >
                {spinner ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ right: '50%', width: 25, height: 25 }}
                  />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
