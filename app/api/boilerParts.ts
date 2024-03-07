import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getBoilerPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getBoilerPartFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getBoilerPartByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.get(url, {
        params: {
          name: name,
        },
      })
      return data
    } catch (err) {
      const axiosError = err as AxiosError
      toast.error(axiosError.message)
    }
  }
)

export const searchPartsFx = createEffect(
  async ({ url, str }: { url: string; str: string }) => {
    try {
      const { data } = await api.get(url, {
        params: {
          str: str,
        },
      })

      return data?.rows
    } catch (err) {
      const axiosError = err as AxiosError
      toast.error(axiosError.message)
    }
  }
)
