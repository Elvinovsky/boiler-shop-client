import { createDomain } from 'effector-next'
import { IUser } from '@/types/auth'

const user = createDomain()

export const setUser = user.createEvent<IUser>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)
