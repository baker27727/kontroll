import React, { useState } from 'react'

interface CheckboxProps {
  children?: React.ReactNode
  variant?: 'default' | 'card'
  onChange?: (checked: boolean) => void
  initialChecked?: boolean
  className?: string
}

const CheckboxContainer: React.FC<CheckboxProps> = ({ className, children, variant = 'default', onChange, initialChecked = false }) => {
  const [checked, setChecked] = useState(initialChecked)

  const toggleChecked = () => {
    const newChecked = !checked
    setChecked(newChecked)
    if (onChange) {
      onChange(newChecked)
    }
  }

  const baseClasses = "relative flex items-start  cursor-pointer rounded border border-gray-300 select-none transition-all duration-200 ease-in-out"
  const variantClasses = {
    default: checked ? "bg-blue-100 border border-blue-500 hover:bg-blue-200" : "bg-white hover:bg-gray-50",
    card: checked ? "bg-blue-500" : "bg-gray-100 hover:bg-gray-200",
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={toggleChecked}
    >
      <div className="p-2 text-sm">
        {children}
      </div>
    </div>
  )
}

export default CheckboxContainer
