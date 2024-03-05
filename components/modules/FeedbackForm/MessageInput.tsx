import styles from '@/styles/feedbackForm/index.module.scss'
import { IFeedbackInput } from '@/types/feedbackForm'

const MessageInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Message *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Введите ваше сообщение (от 20 до 300 символов)"
      {...register('message', {
        required: 'Введите Сообщение!',
        minLength: 15,
        maxLength: 300,
      })}
    />
    {errors.message && (
      <span className={styles.error_alert}> {errors.message?.message}</span>
    )}
    {errors.message && errors.message.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 15 слов</span>
    )}{' '}
    {errors.message && errors.message.type === 'maxLength' && (
      <span className={styles.error_alert}>Максимум 200 слов</span>
    )}
  </label>
)

export default MessageInput
