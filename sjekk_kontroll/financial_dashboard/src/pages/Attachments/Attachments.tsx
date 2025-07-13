import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import axiosClient from '../../utils/axios_client';
import { useAppDispatch } from '../../hooks/hooks';
import { showNotification } from '../../redux/stores/notification_store';
import { useTranslation } from 'react-i18next';
import { FaUpload } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { FileList } from './FileList';

const Attachments: React.FC = () => {
  const [controlNumber, setControlNumber] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('control_number', controlNumber);
    files.forEach((file) => {
      formData.append('attachments[]', file);
    });

    try {
      await axiosClient.post('sanctions/control/files', formData);
      dispatch(
        showNotification({
          message: t('attachments_block.file_upload'),
          description: t('attachments_block.upload_files_success'),
          type: 'success',
        })
      );
      setFiles([]);
      setControlNumber('');
    } catch (error) {
      dispatch(
        showNotification({
          message: t('attachments_block.file_upload'),
          description: t('attachments_block.upload_files_failure'),
          type: 'error',
        })
      );
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('attachments_block.attachments')}</h1>
            <p className="text-lg text-gray-600 mt-2">{t('attachments_block.upload_attachments')}</p>
          </header>

          <div className="mb-6">
            <Input
              label={t('attachments_block.control_number')}
              id="control-number"
              placeholder={t('attachments_block.enter_control_number')}
              value={controlNumber}
              onChange={(e) => setControlNumber(e.target.value)}
            />
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">
              {isDragActive
                ? t('attachments_block.drop_files_here')
                : t('attachments_block.drag_drop_or_click')}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={files.length === 0 || !controlNumber}
              className="ml-2"
            >
              {t('attachments_block.save_button')}
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('attachments_block.uploaded_files')}</h2>
          <FileList files={files} onRemove={handleRemoveFile} />
        </motion.section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('attachments_block.save_new_attachments_question_title')}
        content={t('attachments_block.save_new_attachments_question_content')}
        onConfirm={handleSave}
        confirmText={t('attachments_block.ok_button')}
        cancelText={t('attachments_block.cancel_button')}
      />
    </motion.main>
  );
};

export default Attachments;
