import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Select, { GroupBase } from 'react-select'
import { MutableRefObject, useRef, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'
import {
  createSelectOption,
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import styles from '@/styles/header/index.module.scss'
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { getBoilerPartByNameFx, searchPartsFx } from '@/app/api/boilerParts'
import { IBoilerPart } from '@/types/boilerparts'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {
  NoOptionsSpinner,
  NoOptionsMessage,
} from '@/components/elements/SelectOptionsMessage/SelectOptionsMessage'

const SearchInput = () => {
  const mode = useStore($mode)
  const zIndex = useStore($searchInputZIndex)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
  const [options, setOptions] = useState([] as (IOption | GroupBase<IOption>)[])
  const [inputValue, setInputValue] = useState('')
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLSpanElement>
  const spinner = useStore(searchPartsFx.pending)
  const router = useRouter()
  const delayCallback = useDebounceCallback(1000)

  const searchParts = async (search: string) => {
    try {
      setInputValue(search)
      const data = await searchPartsFx({
        url: 'boiler-parts/search',
        str: search,
      })
      const names = data?.map((item: IBoilerPart) =>
        createSelectOption(item.name)
      )
      setOptions(names)
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const getPartAndRedirect = async (name: string) => {
    try {
      const data = await getBoilerPartByNameFx({
        url: 'boiler-parts/name',
        name: name,
      })

      if (!data.id) {
        toast.warning('Товар не найден')
        return
      }

      await router.push(`/catalog/${data.id}`)
    } catch (err) {
      toast.error((err as Error).message)
    }
  }
  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
    }

    const name = (selectedOption as IOption)?.value

    if (name) {
      getPartAndRedirect(name as string)
    }
    setSearchOption(selectedOption)
    removeClassNameForOverlayAndBody()
  }

  const handleSearchClick = () => {
    if (!inputValue) {
      return
    }
    getPartAndRedirect(inputValue)
  }

  const onFocusSearch = () => {
    toggleClassNameForOverlayAndBody('open-search')

    setSearchInputZIndex(100)
  }

  const onSearchInputChange = (text: string) => {
    document.querySelector('.overlay')?.classList.add('open-search')
    document.querySelector('.body')?.classList.add('overflow-hidden')
    delayCallback(() => searchParts(text))
  }
  const onSearchMenuOpen = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    })

    btnRef.current.style.border = '0'
    btnRef.current.style.borderBottomRightRadius = '0'
    borderRef.current.style.display = 'block'
  }

  const onSearchMenuClose = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    })

    btnRef.current.style.border = '1px solid #9e9e9e'
    btnRef.current.style.borderBottomRightRadius = '4px'
    borderRef.current.style.display = 'none'
  }

  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          components={{
            NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
          }}
          placeholder="Я ищу..."
          value={searchOption}
          onChange={handleSearchOptionChange}
          onInputChange={onSearchInputChange}
          onFocus={onFocusSearch}
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles,
            }),
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              zIndex,
              transition: 'none',
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              ...onMenuOpenControlStyles,
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: '0',
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          isClearable={true}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
          openMenuOnClick={false}
          options={options}
        />
        <span ref={borderRef} className={styles.header__search__border} />
      </div>
      <button
        className={`${styles.header__search__btn} ${darkModeClass}`}
        ref={btnRef}
        style={{ zIndex }}
        onClick={handleSearchClick}
      >
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  )
}

export default SearchInput
