import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence } from 'framer-motion'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { useEffect, useState } from 'react'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boiler-parts'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const partsManufacturers = useStore($partsManufacturers)

  const boilerManufacturers = useStore($boilerManufacturers)

  const boilerParts = useStore($boilerParts)

  const filteredBoilerParts = useStore($filteredBoilerParts)

  const router = useRouter()

  const pagesCount = Math.ceil(+boilerParts.count / 20)

  const { toggleOpen, open, closePopup } = usePopup()

  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0

  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const [spinner, setSpinner] = useState(false)

  const [isFilterInQuery, setIsFilterInQuery] = useState(false)

  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyPartManufacturerChecked ||
    isAnyBoilerManufacturerChecked
  )
  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  useEffect(() => {
    const loadBoilerParts = async () => {
      try {
        setSpinner(true)
        const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)

        if (!isValidOffset) {
          await router.replace({ query: { offset: 1 } })
          resetPagination(data)
          return
        }

        if (isValidOffset) {
          if (+query.offset > Math.ceil(data.count / 20)) {
            await router.push({ query: { ...query, offset: 1 } }, undefined, {
              shallow: true,
            })
            resetPagination(isFilterInQuery ? filteredBoilerParts : data)
            return
          }
          const offset = +query.offset - 1
          const result = await getBoilerPartsFx(
            `/boiler-parts?limit=20&offset=${offset}`
          )

          setCurrentPage(offset)
          setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
          return
        }
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setTimeout(() => setSpinner(false), 700)
      }
    }

    loadBoilerParts()
  }, [filteredBoilerParts, isFilterInQuery, isValidOffset, query, router])

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)

      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }
      const { isValidPriceQuery, isValidBoilerQuery, isValidPartsQuery } =
        checkQueryParams(router)

      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery
            ? `&boiler=${router.query.boiler}`
            : ''
        }${
          isFilterInQuery && isValidPartsQuery
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      await router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setBoilerParts(result)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      console.error('Ошибка:', error)
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 700)
    }
  }

  const resetFilters = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
      const params = router.query

      delete params.boiler
      delete params.parts
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      await router.push({ query: { ...params } }, undefined, { shallow: true })

      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setBoilerParts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 500)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель котлов:"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            {isAnyBoilerManufacturerChecked || isAnyPartManufacturerChecked ? (
              <button
                className={`${styles.catalog__top__reset} ${darkModeClass}`}
                disabled={resetFilterBtnDisabled}
                onClick={resetFilters}
              >
                Сбросить фильтр
              </button>
            ) : (
              <div />
            )}
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            activeClassName={styles.catalog__bottom__list__active}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
