import { useState } from 'react'
import { useStore } from 'effector-react'
import { $boilerPart } from '@/context/boiler-part'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from '@/components/modules/PartPage/PartImagesItem'
import styles from '@/styles/part/index.module.scss'
import PartSlider from '@/components/modules/PartPage/PartSlider'

const PartImagesList = () => {
  const boilerPart = useStore($boilerPart)

  const isMobile = useMediaQuery(850)
  const images = boilerPart?.images
    ? (JSON.parse(boilerPart.images) as string[])
    : []

  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                src={item}
                callback={setCurrentImgSrc}
                alt={`image-${i + 1}`}
              />
            ))}
            ))
          </ul>
        </>
      )}
    </div>
  )
}
export default PartImagesList
