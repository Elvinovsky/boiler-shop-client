import styles from '@/styles/feedbackForm/index.module.scss'
import { IFeedbackInput } from '@/types/feedbackForm'

const EmailInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Email *</span>
    <input
      className={styles.feedback_form__form__input}
      type="email"
      placeholder="Email"
      {...register('email', {
        required: 'Укажите электронную почту!',
        pattern: {
          value:
            /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
          message: 'Неправильный email!',
        },
      })}
    />
    {errors.email && (
      <span className={styles.error_alert}> {errors.email?.message}</span>
    )}
  </label>
)

export default EmailInput
