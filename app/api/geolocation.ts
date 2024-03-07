import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IGetGeolocationFx } from '@/types/common'

export const getGeolocationFx = createEffect(
  async ({ latitude, longitude }: IGetGeolocationFx) => {
    const data = await api.get(
      // eslint-disable-next-line max-len
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
      { withCredentials: false }
    )

    return data
  }
)
