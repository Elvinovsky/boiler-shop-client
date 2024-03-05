import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { $mode } from '@/context/mode'
import styles from '@/styles/shippingPayment/index.module.scss'
import { useState } from 'react'
import { tabsData } from '@/utils/shippingPayment'

const ShippingPaymentPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }

  return (
    <section className={styles.shipping_payment}>
      <div className="container">
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>
          Доставка и оплата
        </h2>
        <div className={`${styles.shipping_payment__tabs} ${darkModeClass}`}>
          <ul className={styles.shipping_payment__tabs__controls}>
            {tabsData.map((tab, index) => (
              <li
                key={index}
                className={`${styles.shipping_payment__tabs__controls__item} ${
                  activeTab === index ? styles.active : ''
                } ${darkModeClass}`}
              >
                <button
                  className={darkModeClass}
                  onClick={() => handleTabChange(index)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`${styles.shipping_payment__tabs__content} ${darkModeClass}`}
          >
            <h3 className={styles.shipping_payment__tabs__content__text}>
              {tabsData[activeTab].title}
            </h3>
            <div style={{ height: '10%' }}>{'  '}</div>
            <ul>
              {tabsData[activeTab].content.map((item, index) => (
                <motion.li
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  key={index}
                  className={styles.shipping_payment__tabs__content__text}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShippingPaymentPage
