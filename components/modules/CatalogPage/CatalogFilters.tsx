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
  setFilteredBoilerParts,
  setPartsManufacturersFromQuery,
} from '@/context/boiler-parts'
import { useRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { getQueryParamOnFirstRender } from '@/utils/common'

const CatalogFilters = ({
  priceRange,
  setIsPriceRangeChanged,
  setPriceRange,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
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
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      )
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const boilerQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('boiler', router) as string
        )
      )
      const partsQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('parts', router) as string
        )
      )

      const isValidBoilerQuery =
        Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length

      const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (
        isValidBoilerQuery &&
        isValidPartsQuery &&
        priceFromQueryValue &&
        priceToQueryValue
      ) {
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

      if (priceFromQueryValue && priceToQueryValue) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBoilerQuery && priceFromQueryValue && priceToQueryValue) {
        await updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}${priceQuery}`)
      }

      if (isValidPartsQuery && priceFromQueryValue && priceToQueryValue) {
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
      toast.error((err as Error).message)
    }
  }

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback()
    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
    setFilteredBoilerParts(data)
  }

  async function updateParamsAndFilters<T>(updateParams: T, path: string) {
    const params = router.query

    delete params.boiler
    delete params.parts
    delete params.priceFrom
    delete params.priceTo

    await router.push(
      {
        query: {
          ...params,
          ...updateParams,
        },
      },
      undefined,
      {
        shallow: true,
      }
    )
    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
    setFilteredBoilerParts(data)
    return
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
          `${initialPage}${boilerQuery}${partsQuery}${priceQuery}`
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
          `${initialPage}${partsQuery}${priceQuery}`
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
          `${initialPage}${boilerQuery}${priceQuery}`
        )
      }

      if (isPriceRangeChanged) {
        await updateParamsAndFilters(
          { priceFrom, priceTo, offset: initialPage + 1 },
          `${initialPage}${priceQuery}`
        )
      }

      if (boiler?.length && parts?.length) {
        await updateParamsAndFilters(
          {
            boiler: encodedBoilersQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}`
        )
      }

      if (boiler?.length) {
        await updateParamsAndFilters(
          { boiler: encodedBoilersQuery, offset: initialPage + 1 },
          `${initialPage}${boilerQuery}`
        )
      }

      if (parts?.length) {
        await updateParamsAndFilters(
          { parts: encodedPartsQuery, offset: initialPage + 1 },
          `${initialPage}${partsQuery}`
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
        <div>mobile</div>
      ) : (
        <CatalogFiltersDesktop
          resetFilters={resetFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          currentPage={currentPage}
          isPriceRangeChanged={isPriceRangeChanged}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
