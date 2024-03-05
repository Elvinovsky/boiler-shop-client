import { useStore } from 'effector-react'
import emailjs from '@emailjs/browser'
import { $mode } from '@/context/mode'
import styles from '@/styles/feedbackForm/index.module.scss'
import NameInput from '@/components/modules/FeedbackForm/NameInput'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/types/feedbackForm'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { MutableRefObject, useRef, useState } from 'react'
import EmailInput from '@/components/modules/FeedbackForm/EmailInput'
import PhoneInput from '@/components/modules/FeedbackForm/PhoneInput'
import MessageInput from '@/components/modules/FeedbackForm/MessageInput'
import { toast } from 'react-toastify'

const FeedbackForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FeedbackInputs>()

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_jeylcqi',
        'template_qli31g6',
        formRef.current,
        '9tu7cTk7YdUEu8RYA'
      )
      .then((result) => {
        toast.success(`Сообщение отправлено! ${result.text}`)
      })
      .catch((err) => {
        toast.error(`что-то пошло не так! ${err.text}`)
      })
      .finally(() => {
        setSpinner(false), reset()
      })
  }
  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Форма обратной связи
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit(submitForm)}
        className={styles.feedback_form__form}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />{' '}
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />{' '}
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />{' '}
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={`${styles.feedback_form__form__btn} ${darkModeClass}`}>
          <button>
            {spinner ? (
              <div className={spinnerStyles.spinner} />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
