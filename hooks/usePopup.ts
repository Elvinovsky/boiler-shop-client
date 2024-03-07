import { useEffect, useState } from 'react'
import {
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { setSearchInputZIndex } from '@/context/header'

// Создание кастомного хука для управления всплывающим окном
export const usePopup = () => {
  // Создание состояния для отслеживания открытия и закрытия всплывающего окна
  const [open, setOpen] = useState(false)

  // Функция для переключения состояния открытия/закрытия всплывающего окна
  const toggleOpen = () => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0)

    // Добавление/удаление классов для затемнения фона и блокировки прокрутки
    toggleClassNameForOverlayAndBody()

    // Инвертирование состояния открытия всплывающего окна
    setOpen(!open)
  }

  // Функция для явного закрытия всплывающего окна
  const closePopup = () => {
    // Удаление классов для затемнения фона и блокировки прокрутки
    removeClassNameForOverlayAndBody()

    // Установка состояния открытия всплывающего окна в false
    setOpen(false)
    setSearchInputZIndex(1)
  }

  // Эффект для добавления и удаления слушателя событий при изменении состояния открытия
  useEffect(() => {
    // Получение ссылки на элемент .overlay
    const overlay = document.querySelector('.overlay')

    // Добавление слушателя событий для закрытия всплывающего окна при клике вне его
    overlay?.addEventListener('click', closePopup)

    // Удаление слушателя событий при размонтировании компонента или изменении состояния открытия
    return () => overlay?.removeEventListener('click', closePopup)
  }, [open])

  // Возврат функций и состояния для использования в компонентах
  return { toggleOpen, open, closePopup }
}
