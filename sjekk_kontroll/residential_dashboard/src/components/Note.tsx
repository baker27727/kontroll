import React from 'react'

interface NoteProps {
    title: string
    description: string
}

const NoteComponent: React.FC<NoteProps> = ({ title, description }) => {
  return (
    <>
        <div className='text-center mb-4 border p-2 border-slate-400 rounded-sm bg-slate-100'>
            <span className="text-gray-700 text-lg font-bold mb-2">{title}</span> <br />
            <span className="text-gray-700 text-md">{description}</span>
        </div>
    </>
  )
}

export default NoteComponent