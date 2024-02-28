import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IOption, SelectOptionType } from '@/types/common'
import {
  selectStyles,
  controlStyles,
  menuStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { selectOptions } from '@/utils/selectOptions'
import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
} from '@/context/boiler-parts'
import { useRouter } from 'next/router'
import { createSelectOption } from '@/utils/common'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  const updateRoteParam = async (first: string) => {
    await router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  useEffect(() => {
    if (boilerParts?.rows) {
      if (router.query?.first === 'popular') {
        updateCategoryOption('По популярности')
        setBoilerPartsByPopularity()
        return
      } else if (router.query?.first === 'expensive') {
        updateCategoryOption('Сначала дорогие')
        setBoilerPartsExpensiveFirst()
        return
      } else {
        updateCategoryOption('Сначала дешевые')
        setBoilerPartsCheapFirst()
        return
      }
    }
  }, [boilerParts.rows, router.query?.first])

  const updateCategoryOption = (value: string) => {
    setCategoryOption({
      value,
      label: value,
    })
  }
  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)

    setCategoryOption(selectedOption)

    if ((selectedOption as IOption).value === 'По популярности') {
      setBoilerPartsByPopularity()
      updateRoteParam('popular')
    } else if ((selectedOption as IOption).value === 'Сначала дорогие') {
      setBoilerPartsExpensiveFirst()
      updateRoteParam('expensive')
    } else {
      setBoilerPartsCheapFirst()
      updateRoteParam('cheap')
    }
    setTimeout(() => setSpinner(false), 700)
  }

  return (
    <Select
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({ ...controlStyles(defaultStyles, mode) }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      options={selectOptions}
      isSearchable={false}
    />
  )
}

export default FilterSelect
