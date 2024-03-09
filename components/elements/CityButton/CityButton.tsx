import LocationSvg from '@/components/elements/LocationSvg/LocationSvg'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { $userCity, setUserCity } from '@/context/user'
import { getGeolocationFx } from '@/app/api/geolocation'
import { toast } from 'react-toastify'
import { useState } from 'react'
import styles from '@/styles/CityButton/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CityButton = () => {
  const city = useStore($userCity)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''
  const [spinner, setSpinner] = useState(false)

  const getCity = () => {
    setSpinner(true)
    const options = {
      timeout: 5000,
      maximumAge: 0,
      enableHighAccuracy: true,
    }
    const success = async (pos: GeolocationPosition) => {
      setSpinner(true)
      try {
        const { latitude, longitude } = pos.coords
        const { data } = await getGeolocationFx({ latitude, longitude })
        if (data) {
          setUserCity({
            city: `${data?.features[0]?.properties?.city}`,
            street: `${data?.features[0]?.properties?.address_line1}`,
          })
          setSpinner(false)
          return
        }

        setUserCity({ city: '', street: '' })
        setSpinner(false)
      } catch (err) {
        toast.error((err as Error).message)
      }
    }
    const error = (error: GeolocationPositionError) =>
      toast.error(error.message)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <button className={styles.city} onClick={getCity}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{
              position: 'relative',
              display: 'flex',
              top: '10px',
              left: '70%',
              width: 20,
              height: 20,
            }}
          />
        ) : city.city.length ? (
          city.city
        ) : (
          'Город'
        )}
      </span>
    </button>
  )
}

export default CityButton
