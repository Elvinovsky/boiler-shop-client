import { Event } from 'effector-next'
export interface IManufacturersBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
  offset: string
  first: string
  boiler: string
  part: string
  priceFrom: string
  priceTo: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
  title: string | false
  manufacturersList: IFilterCheckboxItem[]
  setManufacturer: Event<IFilterCheckboxItem[]>
  updateManufacturer: Event<IFilterCheckboxItem>
}

export interface ICatalogFiltersProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
}

export interface ICatalogFiltersDesktopProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  isPriceRangeChanged: boolean
  currentPage: number
  spinner: boolean
  applyFilters: VoidFunction
}

export interface IPriceRangeProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}
