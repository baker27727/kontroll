import React, { useRef } from 'react';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
}

const SimpleFileUpload: React.FC<FileUploadProps> = ({ label, onChange, accept }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
    onChange(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex w-full">
        <button
          onClick={handleChooseFile}
          className="bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded-l transition duration-300 ease-in-out"
        >
          Choose File
        </button>
        <div className="flex-grow bg-gray-100 border border-gray-300 rounded-r py-1 px-2 text-sm text-gray-700 truncate">
          {file ? file.name : 'No file chosen'}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
        />
      </div>
    </div>
  );
};

export default SimpleFileUpload;
