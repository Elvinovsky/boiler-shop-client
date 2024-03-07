import { createDomain } from 'effector-next'
import { IUser } from '@/types/auth'

const user = createDomain()

export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

export const $userCity = user
  .createStore<{ city: string; street: string }>({ city: '', street: '' })
  .on(setUserCity, (_, address) => address)
