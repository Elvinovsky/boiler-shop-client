import Slider from 'react-slick'
import styles from '@/styles/dashboard/index.module.scss'
import 'slick-carousel/slick/slick.css'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
const BrandsSlider = () => {
  const brandsItems = [
    { id: 1, img: '/img/balt-gaz.svg', alt: 'balt-gaz' },
    { id: 2, img: '/img/arderia.png', alt: 'arderia' },
    { id: 3, img: '/img/bosch.png', alt: 'bosch' },
    { id: 4, img: '/img/buderus.png', alt: 'buderus' },
    { id: 5, img: '/img/balt-gaz.svg', alt: 'balt-gaz' },
    { id: 6, img: '/img/arderia.png', alt: 'arderia' },
    { id: 7, img: '/img/bosch.png', alt: 'bosch' },
    { id: 8, img: '/img/buderus.png', alt: 'buderus' },
  ]

  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector(`.slick-list`) as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider className={styles.dashboard__brands__slider} {...settings}>
      {brandsItems.map((el) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={el.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={el.img} alt={el.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
