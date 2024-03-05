import styles from '@/styles/feedbackForm/index.module.scss'
import { IFeedbackInput } from '@/types/feedbackForm'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Phone *</span>
    <input
      type="tel"
      placeholder="+7 999 999 99 99"
      className={styles.feedback_form__form__input}
      {...register('phone', {
        required: 'Введите номер телефона!',
        minLength: 11,
        maxLength: 15,
        pattern: {
          value:
            /^\+?[0-9]{1,3}\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{2,4}$/g,
          message: 'Некорректный номер телефона!',
        },
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}> {errors.phone.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Не менее 11 цифр!</span>
    )}{' '}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 11 цифр!</span>
    )}
  </label>
)

export default PhoneInput
