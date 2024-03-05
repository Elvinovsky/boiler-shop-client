import { createDomain } from 'effector-next'
import { IShoppingCartItemProps } from '@/types/shopping-cart'

const shoppingCart = createDomain()

export const setShoppingCart =
  shoppingCart.createEvent<IShoppingCartItemProps[]>()

export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateShoppingCart =
  shoppingCart.createEvent<IShoppingCartItemProps>()

export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  partId: number
  total_price: number
}>()

export const updateCartItemCount = shoppingCart.createEvent<{
  partId: number
  count: number
}>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()

const remove = (cartItems: IShoppingCartItemProps[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId)

function updateCartItem<T>(
  cartItems: IShoppingCartItemProps[],
  partId: number,
  payload: T
) {
  return cartItems.map((item) => {
    if (item.partId === partId) {
      return { ...item, ...payload }
    }

    return item
  })
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItemProps[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (shoppingCarts, { partId, total_price }) => [
    ...updateCartItem(shoppingCarts, partId, { total_price }),
  ])
  .on(updateCartItemCount, (shoppingCarts, { partId, count }) => [
    ...updateCartItem(shoppingCarts, partId, { count }),
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)

export const $disableCart = shoppingCart
  .createStore<boolean>(false)
  .on(setDisableCart, (_, value) => value)
