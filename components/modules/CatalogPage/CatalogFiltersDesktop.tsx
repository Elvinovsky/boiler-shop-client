import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boiler-parts'
import FilterManufacturerAccordion from '@/components/modules/CatalogPage/FilterManufacturerAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from '@/components/modules/CatalogPage/PriceRange'
import { ICatalogFiltersDesktopProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
const CatalogFiltersDesktop = ({
  priceRange,
  setIsPriceRangeChanged,
  setPriceRange,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
}: ICatalogFiltersDesktopProps) => {
  const mode = useStore($mode)
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фильтры
      </h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          title="Производитель котлов"
          manufacturersList={boilerManufacturers}
          setManufacturer={setBoilerManufacturers}
          updateManufacturer={updateBoilerManufacturer}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
          </div>
          <div style={{ height: 24 }} />
        </Accordion>
      </div>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          title="Производитель запчастей"
          manufacturersList={partsManufacturers}
          setManufacturer={setPartsManufacturers}
          updateManufacturer={updatePartsManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
