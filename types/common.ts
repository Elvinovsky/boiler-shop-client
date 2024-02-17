import { MultiValue, SingleValue } from 'react-select'

export interface IWrappedComponentProps {
  open: boolean
  setOpen: (arg: boolean) => void
}

export interface IOption {
  value: string | number
  label: string | number
}
export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null
