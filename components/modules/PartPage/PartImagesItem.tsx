import { IPartImagesItemProps } from '@/types/part-page'
import styles from '@/styles/part/index.module.scss'

const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImg = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImg}>
      <img src={src} alt={alt} />
    </li>
  )
}
export default PartImagesItem
