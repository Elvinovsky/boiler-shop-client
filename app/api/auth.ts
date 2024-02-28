import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { ISignInFx, ISignUpFx } from '@/types/auth'
import api from '@/app/axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const signUpFx = createEffect(
  async ({ url, username, email, password }: ISignUpFx) => {
    const { data } = await api.post(url, { username, email, password })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    toast.success('Регистрация прошла успешно!')
    return data
  }
)

export const signInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    toast.success('Вход выполнен!')
    return data
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    return data
  } catch (err) {
    const axiosError = err as AxiosError
    if (axiosError.response) {
      if (axiosError.response.status == HTTPStatus.FORBIDDEN) {
        return false
      }
    }
    toast.error((err as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (err) {
    toast.error((err as Error).message)
  }
})
