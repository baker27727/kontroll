import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface WarningModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  plateNumber: string;
}

const WarningModal: React.FC<WarningModalProps> = ({ visible, onConfirm, onCancel, plateNumber }) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      className="warning-modal"
    >
      <div className="modal-content">
        <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
        <Typography.Title level={3} style={{ marginTop: '12px' }}>
          {t('confirm_registration')}
        </Typography.Title>
        <Typography.Text style={{ marginTop: '16px' }}>
          {t('confirm_registration_message', { plateNumber })}
        </Typography.Text>
        <div className="modal-actions" style={{ marginTop: '32px', textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: '8px' }}>
            {t('no')}
          </Button>
          <Button type="primary" danger onClick={onConfirm}>
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;

