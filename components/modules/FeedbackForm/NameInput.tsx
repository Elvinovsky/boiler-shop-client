import styles from '@/styles/feedbackForm/index.module.scss'
import { IFeedbackInput } from '@/types/feedbackForm'

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Имя *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Name"
      {...register('name', {
        required: 'Введите Имя!',
        minLength: 2,
        maxLength: 15,
        pattern: {
          value: /(?:\b[A-ZА-Я]|[a-zа-я])([A-ZА-Яa-zа-я]+)/g,
          message: 'Недопустимое значение!',
        },
      })}
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
