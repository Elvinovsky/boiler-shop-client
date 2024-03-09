import { v4 as uuidv4 } from 'uuid'
import { getQueryParamOnFirstRender } from '@/utils/common'
import { NextRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { setFilteredBoilerParts } from '@/context/boiler-parts'
export const createManufacturersCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: uuidv4(),
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturersCheckboxObj)

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturersCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()
  const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
  setFilteredBoilerParts(data)
}

export async function updateParamsAndFilters<T>(
  updateParams: T,
  path: string,
  router: NextRouter
) {
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
