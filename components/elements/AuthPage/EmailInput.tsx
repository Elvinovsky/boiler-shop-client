import { IAuthPageInputsSignUp } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const EmailInput = ({ register, errors }: IAuthPageInputsSignUp) => (
  <label className={`${styles.form__label}`}>
    <input
      {...register('email', {
        required: 'Укажите электронную почту!',
        pattern: {
          value:
            /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
          message: 'Неправильный email!',
        },
      })}
      className={styles.form__input}
      type="email"
      placeholder="Email"
    />
    {errors.email && (
      <span className={styles.error_alert}> {errors.email?.message}</span>
    )}
  </label>
)

export default EmailInput
