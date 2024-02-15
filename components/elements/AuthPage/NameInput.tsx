import { IAuthPageInputsSignUp } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const NameInput = ({ register, errors }: IAuthPageInputsSignUp) => (
  <label className={`${styles.form__label}`}>
    <input
      {...register('name', {
        required: 'Введите Имя!',
        minLength: 2,
        maxLength: 15,
        pattern: {
          value: /(?:\b[A-ZА-Я]|[a-zа-я])([A-ZА-Яa-zа-я]+)/g,
          message: 'Недопустимое значение!',
        },
      })}
      className={styles.form__input}
      type="text"
      placeholder="Name"
    />
    {errors.name && (
      <span className={styles.error_alert}> {errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 2 слова</span>
    )}{' '}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Максимум 15 слов</span>
    )}
  </label>
)

export default NameInput
