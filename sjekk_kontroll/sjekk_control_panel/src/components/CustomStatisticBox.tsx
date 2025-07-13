import React from 'react'

interface CustomStatisticProps{
    title: string
    value: number
    icon: React.ReactNode
    boxColor: 'bg-primary' | 'bg-secondary' | 'bg-danger' | 'bg-info' | 'bg-warning'
}

export const CustomStatisticBox: React.FC<CustomStatisticProps> = ({title,value,icon, boxColor}) => {
  return (
    <div className="info-box" id="users-box">
    <span className={`info-box-icon ${boxColor}`}>
        {icon}
    </span>

    <div className="info-box-content">
      <span className="info-box-text">{title}</span>
      <span className="info-box-number" id="users-holder">
        {value}
      </span>
    </div>
  </div>
  )
}
