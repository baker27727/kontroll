import { InputHTMLAttributes, forwardRef } from 'react'
import { IconType } from 'react-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType
  error?: string
  helperText?: string
  align?: 'left' | 'right'
  variant?: 'default' | 'flush'
  inputSize?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', variant = 'default', inputSize = 'md', icon: Icon, align = 'left', error, helperText, ...props }, ref) => {
    const baseClasses = "w-full rounded border bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out"
    const variantClasses = {
      default: "border-gray-300 shadow-sm",
      flush: "border-0 shadow-none px-0",
    }
    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-1.5",
      lg: "px-4 py-2 text-lg",
    }
    const iconClasses = Icon ? "pl-9" : ""
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : ""
    const alignClasses = align === 'right' ? "text-right" : "text-left"

    return (
      <div className="w-full mb-4">
        {helperText && !error && <p className={`mb-1 text-sm text-gray-500 ${align === 'right' ? 'text-right' : 'text-left'}`}>{helperText}</p>}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${iconClasses} ${errorClasses} ${alignClasses} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
