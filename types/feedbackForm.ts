import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export interface FeedbackInputs {
  name: string
  email: string
  phone: string
  message: string
}

export interface IFeedbackInput {
  register: UseFormRegister<FeedbackInputs>
  errors: Partial<FieldErrorsImpl<FeedbackInputs>>
  darkModeClass?: string
}
