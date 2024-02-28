import { MultiValue, SingleValue } from 'react-select'
import React from 'react'

export interface IWrappedComponentProps {
  open: boolean
  setOpen: (arg: boolean) => void
}

export interface IOption {
  value: string | number
  label: string | number
}
export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null

export interface IAccordion {
  children: React.ReactNode
  title: string | false
  titleClass: string
  arrowOpenClass: string
  isMobileForFilters?: boolean
  hideArrowClass?: string
}

export interface ILayoutProps {
  children: React.ReactNode
}
