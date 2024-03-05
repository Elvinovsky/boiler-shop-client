import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/context/boiler-parts'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'
import CatalogFiltersMobile from '@/components/modules/CatalogPage/CatalogFiltersMobile'

const CatalogFilters = ({
  priceRange,
  setIsPriceRangeChanged,
  setPriceRange,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)
  const [spinner, setSpinner] = useState(false)

  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        boilerQueryValue,
        partsQueryValue,
        priceFromQueryValue,
        priceToQueryValue,
        isValidPriceQuery,
        isValidBoilerQuery,
        isValidPartsQuery,
      } = checkQueryParams(router)

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}${priceQuery}`)
        return
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)
      }

      if (isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}${priceQuery}`)
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}${priceQuery}`)
      }

      if (isValidBoilerQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)
      }

      if (isValidPartsQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }
    } catch (err) {
      const error = (err as Error).message
      if (error === 'URI malformed') {
        toast.warning('Неправильный Url для фильтров')
        return
      }
      toast.error(error)
    }
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])

      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const boiler = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedBoilersQuery = encodeURIComponent(JSON.stringify(boiler))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))

      const boilerQuery = `&boiler=${encodedBoilersQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (boiler?.length && parts?.length && isPriceRangeChanged) {
        await updateParamsAndFilters(
          {
            boiler: encodedBoilersQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}${priceQuery}`,
          router
        )
      }

      if (parts?.length && isPriceRangeChanged) {
        await updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}${priceQuery}`,
          router
        )
      }

      if (boiler?.length && isPriceRangeChanged) {
        await updateParamsAndFilters(
          {
            boiler: encodedBoilersQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${priceQuery}`,
          router
        )
      }

      if (isPriceRangeChanged) {
        await updateParamsAndFilters(
          { priceFrom, priceTo, offset: initialPage + 1 },
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (boiler?.length && parts?.length) {
        await updateParamsAndFilters(
          {
            boiler: encodedBoilersQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}`,
          router
        )
      }

      if (boiler?.length) {
        await updateParamsAndFilters(
          { boiler: encodedBoilersQuery, offset: initialPage + 1 },
          `${initialPage}${boilerQuery}`,
          router
        )
      }

      if (parts?.length) {
        await updateParamsAndFilters(
          { parts: encodedPartsQuery, offset: initialPage + 1 },
          `${initialPage}${partsQuery}`,
          router
        )
      }
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 700)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          spinner={spinner}
          applyFilters={applyFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          closePopup={closePopup}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          resetFilters={resetFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
