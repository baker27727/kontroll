import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFile, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} bytes`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  const [t] = useTranslation();

  if (files.length === 0) {
    return <p className="text-gray-600">{t('attachments_block.no_files_uploaded')}.</p>;
  }

  return (
    <AnimatePresence>
      {files.map((file, index) => (
        <motion.div
          key={`${file.name}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm mb-3"
        >
          <div className="flex items-center">
            <FaFile className="text-blue-500 text-2xl mr-3" />
            <div>
              <span className="text-gray-800 font-medium">{file.name}</span>
              <div className="text-gray-600 text-sm mt-1">{formatFileSize(file.size)}</div>
            </div>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label={t('attachments_block.remove')}
          >
            <FaTrash />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
