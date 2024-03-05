import { ICatalogFiltersMobileProps } from '@/types/catalog'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopupTop from '@/components/modules/CatalogPage/FiltersPopupTop'
import FiltersPopup from '@/components/modules/CatalogPage/FiltersPopup'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boiler-parts'
import { useState } from 'react'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from '@/components/modules/CatalogPage/PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
  closePopup,
  filtersMobileOpen,
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: ICatalogFiltersMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)
  const [openBoilers, setOpenBoilers] = useState(false)
  const [openParts, setOpenParts] = useState(false)

  const isMobile = useMediaQuery(820)

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(
      boilerManufacturers.map((item) => ({
        ...item,
        checked: false,
      }))
    )

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(
      partsManufacturers.map((item) => ({
        ...item,
        checked: false,
      }))
    )

  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)

  const applyFiltersAndClosePopup = () => {
    closePopup()
    applyFilters()
  }

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText={'Сбросить все'}
          title={'Фильтры'}
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenBoilers}
          >
            Производитель котлов
          </button>
          <FiltersPopup
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            title="Производитель котлов"
            manufacturersList={boilerManufacturers}
            setManufacturer={setBoilerManufacturers}
            updateManufacturer={updateBoilerManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}
          >
            Производитель запчастей
          </button>
          <FiltersPopup
            resetFilterBtnDisabled={!isAnyPartManufacturerChecked}
            title="Производитель запчастей"
            manufacturersList={partsManufacturers}
            setManufacturer={setPartsManufacturers}
            updateManufacturer={updatePartsManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
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
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            `Показать`
          )}
        </button>
      </div>
    </div>
  )
}
export default CatalogFiltersMobile
