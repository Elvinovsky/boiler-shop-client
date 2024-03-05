import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IMakePayFx } from '@/types/payment'

export const makePaymentFx = createEffect(
  async ({ url, amount }: IMakePayFx) => {
    const { data } = await api.post(url, { amount })
    return data
  }
)

export const checkPaymentFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  return data
})
