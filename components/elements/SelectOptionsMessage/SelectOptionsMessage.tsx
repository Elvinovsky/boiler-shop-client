import { GroupBase, components, NoticeProps } from 'react-select'
import { IOption } from '@/types/common'
import styles from '@/styles/spinner/index.module.scss'
export const NoOptionsMessage = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span>Ничего не найдено.</span>
  </components.NoOptionsMessage>
)
export const NoOptionsSpinner = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span className={styles.spinner} style={{ width: 30, height: 30 }} />
  </components.NoOptionsMessage>
)
