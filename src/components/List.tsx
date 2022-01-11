import React from 'react'

export interface ListProps {
  idField: string
  labelField: string
  items: any[]
}

const List: React.FC<ListProps> = ({ idField, labelField,  items }) => {
  return (
    <ul className="list">
      {
        items.map((item: any) => (
          <li key={item[idField]}>{item[labelField]}</li>
        ))
      }
    </ul>
  )
}

export default List