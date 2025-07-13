import { Check, Info } from 'lucide-react';
import { ReactNode } from 'react';
import { BiError } from 'react-icons/bi';
import { VscWarning } from 'react-icons/vsc';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function Alert({ type = 'info', title, children, onClose, className }: AlertProps) {
  const typeStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-300',
    success: 'bg-green-50 text-green-800 border-green-300',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    error: 'bg-red-50 text-red-800 border-red-300',
  };

  const iconPath = {
    info: <Info className="w-5 h-5" />,
    success: <Check className="w-5 h-5" />,
    warning: <VscWarning className="w-5 h-5" />,
    error: <BiError className="w-5 h-5" />,
  };

  return (
    <div className={`rounded-md border p-3 ${typeStyles[type]} ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {
            iconPath[type]
          }
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          {children && <div className="mt-2 text-sm text-gray-700">{children}</div>}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none`}
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}