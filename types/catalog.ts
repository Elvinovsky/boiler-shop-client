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
  partId: string
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

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}
export interface ICatalogFiltersProps extends ICatalogBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface ICatalogFiltersDesktopProps extends ICatalogBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFiltersMobileProps extends ICatalogBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
  resetBtnText: string
  title: string
  resetFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean
  resetAllManufacturers: VoidFunction
  handleClosePopup: VoidFunction
  applyFilters: VoidFunction
  openPopup: boolean
}
export type IPriceRangeProps = ICatalogBaseTypes
