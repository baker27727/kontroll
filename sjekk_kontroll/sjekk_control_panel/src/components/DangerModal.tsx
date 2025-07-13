import React from 'react'
import Modal from './Modal'
import CustomButton from './Button'
import { BiError } from 'react-icons/bi'

interface DangerModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  onAccept: () => void
  onCancel: () => void
}

export const DangerModal: React.FC<DangerModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  onAccept,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel()
    onClose()
  }

  const handleAccept = () => {
    onAccept()
    onClose()
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{content}</p>
        <div className='flex items-center mt-2 p-2 bg-red-100 rounded'>
            <BiError className="w-6 h-6 text-red-600 mr-2" />
            <p className="text-sm text-red-600">This action cannot be undone.</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <CustomButton size="sm" color="gray" variant="outline" onClick={handleCancel}>
          Cancel
        </CustomButton>
        <CustomButton size="sm" color="red" onClick={handleAccept}>
          Delete
        </CustomButton>
      </div>
    </Modal>
  )
}