import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import FiltersPopupTop from '@/components/modules/CatalogPage/FiltersPopupTop'
import FilterManufacturerAccordion from '@/components/modules/CatalogPage/FilterManufacturerAccordion'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  manufacturersList,
  applyFilters,
  title,
  openPopup,
}: IFiltersPopupProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.filters__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить"
          title={title as string}
          resetFilters={resetAllManufacturers}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={handleClosePopup}
        />
        <FilterManufacturerAccordion
          title={false}
          manufacturersList={manufacturersList}
          setManufacturer={setManufacturer}
          updateManufacturer={updateManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          style={{ marginBottom: 12 }}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          Показать
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
