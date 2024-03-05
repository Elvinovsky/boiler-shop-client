import { toast } from 'react-toastify'
import {
  addToCartFX,
  removeFromCartFX,
  updateCartItemFx,
} from '@/app/api/shoppingCart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean,
  setSpinner: (arg0: boolean) => void
) => {
  setSpinner(true)
  if (isInCart) {
    await removeFromCartFX(`/shopping-cart/one/${partId}`)
    removeShoppingCartItem(partId)
    setSpinner(false)
    return
  }
  const data = await addToCartFX({
    url: `/shopping-cart/add`,
    username,
    partId,
  })
  updateShoppingCart(data)
  try {
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    setSpinner(false)
  }
}

export const removeItemFromCart = async (
  partId: number,
  setSpinner: (arg0: boolean) => void
) => {
  try {
    setSpinner(true)
    await removeFromCartFX(`/shopping-cart/one/${partId}`)
    removeShoppingCartItem(partId)
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    setSpinner(false)
  }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${partId}`,
    payload: {
      total_price,
    },
  })
  updateCartItemTotalPrice({
    partId,
    total_price: data.total_price,
  })
}
