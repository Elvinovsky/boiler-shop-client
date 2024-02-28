import { getWindowWidth } from '@/utils/common'
import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  const handleResize = () => setWindowWidth(getWindowWidth())

  useEffect(() => {
    window.addEventListener('resize', handleResize, true)

    return () => window.removeEventListener('resize', handleResize, true)
  }, [])

  return windowWidth.windowWidth // Возвращаем просто windowWidth, без объекта
}

export const useMediaQuery = (maxWidth: number) => {
  const windowWidth = useWindowWidth() // Используем windowWidth напрямую
  const [isMedia, setIsMedia] = useState(false)

  useEffect(() => {
    setIsMedia(windowWidth <= maxWidth)
  }, [maxWidth, windowWidth])

  return isMedia
}
