import React from 'react'

interface RadioBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  isSelected: boolean
  variant?: 'default' | 'card'
}

export const RadioBox = React.forwardRef<HTMLInputElement, RadioBoxProps>(
  ({ className = '', variant = 'default', isSelected, label, description, ...props }, ref) => {
    const baseClasses = "relative flex items-center justify-between w-full p-4 cursor-pointer rounded-lg border-2 transition-all duration-200 ease-in-out"
    const variantClasses = {
      default: "bg-white hover:bg-gray-50",
      card: "bg-gray-100 hover:bg-gray-200",
    }
    const selectedClasses = isSelected
      ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
      : "border-gray-300"

    return (
      <label className={`${baseClasses} ${variantClasses[variant]} ${selectedClasses} ${className}`}>
        <div className="flex items-center">
          <input type="radio" className="sr-only" ref={ref} {...props} />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{label}</p>
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        </div>
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200 ease-in-out ${
            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
          }`}
        >
          {isSelected && (
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </label>
    )
  }
)

RadioBox.displayName = 'RadioBox'