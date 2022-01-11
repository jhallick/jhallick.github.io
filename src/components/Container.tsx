import React from 'react'

export interface ContainerProps {
  title?: string
  content?: any
  className: string
}

const Container: React.FC<ContainerProps> = ({ title, content, className }) => {
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      {content}
    </div>
  )
}

export default Container