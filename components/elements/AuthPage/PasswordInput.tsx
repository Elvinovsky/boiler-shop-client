import { IAuthPageInputsSignUp } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthPageInputsSignUp) => (
  <label className={`${styles.form__label}`}>
    <input
      {...register('password', {
        required: 'Введите пароль!',
        minLength: 6,
        maxLength: 15,
        pattern: {
          value: /(?=.*[0-9])(?=.*[a-zA-Z])/,
          message: 'Должен содержать буквы и числа!',
        },
      })}
      className={styles.form__input}
      type="password"
      placeholder="Password"
    />
    {errors.password && (
      <span className={styles.error_alert}> {errors.password.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 6 символов</span>
    )}{' '}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>Максимум 15 символов</span>
    )}
  </label>
)

export default PasswordInput
