import { NextRouter } from 'next/router'

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const createSelectOption = (value: string | number) => ({
  value,
  label: value,
})

export const getQueryParamOnFirstRender = (
  queryName: string,
  router: NextRouter
) =>
  router.query[queryName] ||
  router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))

export const toggleClassNameForOverlayAndBody = (overlayClassName = 'open') => {
  // Добавление/удаление класса 'open' для элемента с классом '.overlay'
  document.querySelector('.overlay')?.classList.toggle(overlayClassName)

  // Добавление/удаление классов для затемнения фона и блокировки прокрутки
  document.querySelector('.body')?.classList.toggle('overflow-hidden')
}

export const removeClassNameForOverlayAndBody = () => {
  // Добавление/удаление класса 'open' для элемента с классом '.overlay'
  document.querySelector('.overlay')?.classList.remove('open')
  document.querySelector('.overlay')?.classList.remove('open-search')

  // Добавление/удаление классов для затемнения фона и блокировки прокрутки
  document.querySelector('.body')?.classList.remove('overflow-hidden')
}
