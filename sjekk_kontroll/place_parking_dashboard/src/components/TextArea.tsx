import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  helperText?: string
  variant?: 'default' | 'flush'
  inputSize?: 'sm' | 'md' | 'lg'
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', variant = 'default', inputSize = 'md', error, helperText, ...props }, ref) => {
    const baseClasses = "w-full rounded border bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out resize-none"
    const variantClasses = {
      default: "border-gray-300 shadow-sm",
      flush: "border-0 shadow-none px-0",
    }
    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2",
      lg: "px-4 py-3 text-lg",
    }
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : ""

    return (
      <div className="w-full mb-4">
        {helperText && !error && <p className="mb-1 text-sm text-gray-500">{helperText}</p>}
        <textarea
          ref={ref}
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${errorClasses} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export { TextArea }