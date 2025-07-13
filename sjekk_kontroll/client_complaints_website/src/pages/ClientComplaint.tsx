import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { logoutClient } from '../redux/features/client_auth';
import { ArrowLeft, Upload, Send, X, FileText, ChevronDown, Check, User, MapPin, Mail, Phone, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from '/public/parksync.png';
import { euCountries } from '../configs/constants';
import axios from 'axios';

interface Attachment {
  file: File;
  preview: string;
}

const CustomDropdown: React.FC<{
  options: { code: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? options.find(option => option.code === value)?.name : t('select_your_country')}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <li
                key={option.code}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer flex items-center"
                onClick={() => {
                  onChange(option.code);
                  setIsOpen(false);
                }}
              >
                {option.name}
                {value === option.code && <Check className="w-4 h-4 ml-2 text-blue-500" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon: Icon, label, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          {...props}
          className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4">{t('Confirm Submission')}</h3>
            <p className="mb-6">{t('Are you sure you want to submit this complaint?')}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                {t('Cancel')}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                {t('Confirm')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeedbackModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
}> = ({ isOpen, onClose, success }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`bg-white rounded-lg p-6 w-full max-w-md ${success ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
          >
            <div className="flex items-center mb-4">
              {success ? (
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
              ) : (
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <X className="w-6 h-6 text-red-500" />
                </div>
              )}
              <h3 className="text-xl font-bold">{success ? t('Complaint Submitted') : t('Submission Failed')}</h3>
            </div>
            <p className="mb-6">
              {success
                ? t('Your complaint has been successfully submitted. We will review it shortly.')
                : t('There was an error submitting your complaint. Please try again later.')}
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-md text-white transition duration-200 ${
                  success ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {t('Close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ClientComplaintForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ticket } = useAppSelector(state => state.client_auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    postal_code: '',
    city: '',
    country: '',
    phone_number: '',
    email: '',
    complaint_text: '',
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true);
  };

  const confirmSubmission = async () => {
    setIsConfirmationModalOpen(false);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('ticket_number', ticket.ticket_info.ticket_number);
      formDataToSend.append('attachments', JSON.stringify(attachments));

      const attachments_list = attachments.map(attachment => ({
        filepath: '',
        file: attachment.file,
      }));

      for (let i = 0; i < attachments_list.length; i++) {
        formDataToSend.append(`attachments[${i}]`, attachments_list[i].file);
      }

      const response = await axios.post(`https://complaints.gensolv.no/api/complaints`, formDataToSend);
      setIsSubmissionSuccessful(true);

      alert('Complaint submitted successfully!');
      return response.data;
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting the complaint. Please try again later.');
      setIsSubmissionSuccessful(false);
    }
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
    if (isSubmissionSuccessful) {
      dispatch(logoutClient());
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 flex flex-col">
      <header className="w-full max-w-4xl mx-auto mb-4">
        <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('return_back')}
          </button>
          <img src={LogoImage} alt="Logo" className="w-32 h-auto" />
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto flex-grow">
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('Submit a Complaint')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={User}
              label={t('first_name')}
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <InputWithIcon
              icon={User}
              label={t('last_name')}
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <InputWithIcon
              icon={MapPin}
              label={t('address')}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <InputWithIcon
              icon={MapPin}
              label={t('postal_code')}
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              required
            />
            <InputWithIcon
              icon={MapPin}
              label={t('city_or_town')}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">{t('country')}</label>
              <CustomDropdown
                options={euCountries}
                value={formData.country}
                onChange={handleCountryChange}
              />
            </div>
            <InputWithIcon
              icon={Phone}
              label={t('phone_number')}
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <InputWithIcon
              icon={Mail}
              label={t('email')}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="complaint_text" className="block text-sm font-medium text-gray-700 mb-1">{t('complaint_text')}</label>
            <textarea
              id="complaint_text"
              name="complaint_text"
              value={formData.complaint_text}
              placeholder={t("write_your_complaint")}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('attachments')}</label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">{t('Click or drag files to upload')}</p>
                </div>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} multiple accept=".png,.jpg,.jpeg,.pdf" />
              </label>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative bg-gray-100 p-2 rounded-lg">
                  {attachment.file.type.startsWith('image/') ? (
                    <img src={attachment.preview} alt={attachment.file.name} className="w-full h-24 object-cover rounded" />
                  ) : (
                    <div className="w-full h-24 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <p className="text-xs mt-1 truncate">{attachment.file.name}</p>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
            >
              <Send className="w-5 h-5 mr-2" />
              {t('Submit')}
            </button>
          </div>
        </form>
      </main>

      <footer className="w-full max-w-4xl mx-auto mt-12 text-center text-gray-600 text-sm">
        <p>&copy; 2023 ParkSync. {t('All rights reserved.')}</p>
      </footer>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmSubmission}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
        success={isSubmissionSuccessful}
      />
    </div>
  );
};

export default ClientComplaintForm;

