import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { primaryColor } from '../configs/colors';
import { createPlaceRequest } from '../redux/features/place_request_reducer';
import { showErrorNotification, showSuccessNotification} from '../utils/notifications';

const CreatePlacePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { partner } = useAppSelector(state => state.auth_reducer);
  

  const onFinish = async (values) => {
    try{
      await dispatch(
        createPlaceRequest({
          location: values.location,
          policy: values.policy,
          code: values.code,
          place_id: undefined,
          requested_by_id: partner.id,
          request_type: 'creation'
        })
      )

      showSuccessNotification(t('place_request_created_successfully'));
      navigate('/');
    }catch(error){
      showErrorNotification(error.message);
    }
  };

  return (
    <>
    <div style={{ padding: '16px' }}>
      <Card
          bordered={false}
          style={{ maxWidth: '100%', margin: '0 auto', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
<div style={{ padding: '16px' }}>
      <Form
        name="createPlaceForm"
        initialValues={{ remember: true }}
        layout='vertical'
        onFinish={onFinish}
        size='middle'
        style={{
          marginTop: '12px'
        }}
      >
        <Form.Item
          label={t('location')}
          name="location"
          rules={[{ required: true, message: t('please_enter_the_location') }]}
        >
          <Input placeholder={t('location')} />
        </Form.Item>

        <Form.Item
          label={t('policy')}
          name="policy"
          rules={[{ required: true, message: t('please_enter_the_policy') }]}
        >
          <Input placeholder={t('policy')} />
        </Form.Item>

        <Form.Item
          label={t('code')}
          name="code"
          rules={[{ required: true, message: t('please_enter_the_code') }]}
        >
          <Input placeholder={t('code')} />
        </Form.Item>

        <Form.Item style={{
          display: 'flex',
          justifyContent: 'end'
        }}>
          <Button type="primary" htmlType="submit" style={{
            background: primaryColor
          }}>
            {t('create')}
          </Button>
        </Form.Item>
      </Form>
    </div>
      </Card>
    </div>
     
      
    </>
  );
};

export default CreatePlacePage;
