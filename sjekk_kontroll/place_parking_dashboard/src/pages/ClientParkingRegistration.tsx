import { Button, Form, Input, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { registerNewCar } from '../redux/features/DashboardSlice';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import './ClientParkingRegistration.css'; // Assuming you store your styles here
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { primaryColor } from '../configs/colors';
import axios from 'axios';
import { apiUrl } from '../configs/constants';
import PlateInfo from '../interfaces/PlateInfo';
import moment from 'moment';

interface AddCarRegistrationFormProps {
  plate_number: string;
}

export const ClientParkingRegistration = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const { place_dashboard } = useAppSelector(state => state.auth_reducer);

  const handleRegisterCar = async (plate_number: string) => {
    await dispatch(registerNewCar({
      data: {
        plate_number
      },
      id: id as string
    }))
    .then(unwrapResult)
    .then(() => {
      Modal.success({
        title: t('registration_success', { plate: plate_number.toUpperCase() }),
        content: (
          <div className="modal-content">
            <h4>Car registered successfully</h4>
            <p>You have free parking time from {moment().format('DD.MM.YYYY HH:mm')} to {moment().add(place_dashboard.free_parking_hours, 'hours').format('DD.MM.YYYY HH:mm')}</p>

            <div
              style={{ textAlign: 'right' }}
            >
              <Button type="primary" onClick={() => {
                location.reload();
              }} style={{ marginRight: '8px' }}>
                Register More Cars
              </Button>
            </div>
          </div>
        ),
        onOk: () => {
          form.resetFields();
        }
      })
    })
    .catch((error: Error) => {
      Modal.error({
        title: t('registration_failed'),
        okType: 'danger',
        content: (
          <div className="modal-content">
            <h4>{error.message}</h4>
          </div>
        )
      })
    });


  }


  const handleFormSubmit = async (values: AddCarRegistrationFormProps) => {
    try{
      const response = await axios.get(`${apiUrl}/autosys/${values.plate_number}`);
      const plate_info: PlateInfo = response.data;

      Modal.confirm({
        title: t('confirm_registration'),
        content: (
          <div className="modal-content">
              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Plate number: {values.plate_number}
              </Typography.Text>
              </div>

              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Car color: {plate_info.car_color}
              </Typography.Text>
              </div>

              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Car type: {plate_info.car_type}
              </Typography.Text>
              </div>

              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Car description: {plate_info.car_description}
              </Typography.Text>
              </div>

              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Car model: {plate_info.car_model}
              </Typography.Text>
              </div>

              <div>
              <Typography.Text style={{ marginTop: '16px' }}>
                Manufacture year: {plate_info.manufacture_year}
              </Typography.Text>
              </div>
        </div>
        ),
        okButtonProps: {
          danger: true,
        },
        onOk() {
          handleRegisterCar(values.plate_number);
        },
      })
      
    }catch(error){
      console.log(error);
    }
  };


  return (
    <div className="registration-form-container">
      <div className="logo-container">
        <img src="/assets/full_kontroll.png" alt="Company Logo" className="logo" />
      </div>
      <Form form={form} onFinish={handleFormSubmit} layout='vertical' className="registration-form">
        <Form.Item name="plate_number" label={t('plate_number')} rules={[{ required: true }]}>
          <Input placeholder={t('enter_plate_number')} size='large'/>
        </Form.Item>
        {/* Add more form items as needed */}
        <Form.Item className="form-action">
          <Button type="primary" htmlType="submit" className="submit-button" style={{ background: primaryColor }}>
            {t('confirm')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
