import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Select from 'react-select'
import { useState } from 'react'
import { SelectOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'

const SearchInput = () => {
  const mode = useStore($mode)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }
  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={Array(50)
        .fill(1)
        .map((item) => ({
          value: Math.random() + item,
          label: Math.random() + item,
        }))}
    />
  )
}

export default SearchInput
