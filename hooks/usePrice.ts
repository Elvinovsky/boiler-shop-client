import { useEffect, useState } from 'react'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shoppingCart'

export const usePrice = (
  count: number,
  initialPrice: number,
  partId: number
) => {
  const [spinner, setSpinner] = useState(false)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  useEffect(() => {
    updateTotalPrice(price, partId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(partId, setSpinner)

  return { spinner, increasePrice, decreasePrice, deleteCartItem, price }
}
