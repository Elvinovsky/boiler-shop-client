import { useEffect, useState } from 'react'

// Создание кастомного хука для управления всплывающим окном
export const usePopup = () => {
  // Создание состояния для отслеживания открытия и закрытия всплывающего окна
  const [open, setOpen] = useState(false)

  // Функция для переключения состояния открытия/закрытия всплывающего окна
  const toggleOpen = () => {
    // Прокрутка страницы вверх
    window.scrollTo(0, 0)

    // Добавление/удаление классов для затемнения фона и блокировки прокрутки
    // Добавление/удаление класса 'open' для элемента с классом '.overlay'
    document.querySelector('.overlay')?.classList.toggle('open')

    // Добавление класса 'open' для элемента с классом '.body'
    document.querySelector('.body')?.classList.add('open')

    // Инвертирование состояния открытия всплывающего окна
    setOpen(!open)
  }

  // Функция для явного закрытия всплывающего окна
  const closePopup = () => {
    // Удаление классов для затемнения фона и блокировки прокрутки
    document.querySelector('.overlay')?.classList.remove('open')
    document.querySelector('.body')?.classList.remove('open')

    // Установка состояния открытия всплывающего окна в false
    setOpen(false)
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
