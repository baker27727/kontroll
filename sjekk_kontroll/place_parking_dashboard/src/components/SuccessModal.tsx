import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      width={400}
      onCancel={onClose}
      className="success-modal"
    >
      <div className="modal-content">
        <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
        <h2>{t('registration_successful')}</h2>
        <p>{t('car_registered_successfully')}</p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
