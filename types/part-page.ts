import React from 'react'

export interface IPartImagesItemProps {
  src: string
  callback: (arg0: string) => void
  alt: string
}

export interface IPartAccordionProps {
  children: React.ReactNode
  title: string
}
