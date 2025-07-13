import { Form, Input, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const EditProfile = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Here you would typically make an API call to update the user profile
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const initialValues = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'This is a short bio...',
  };

  return (
    <>
      <div style={{ padding: '16px' }}>
        <Form
          form={form}
          name="editProfile"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={t('name')}
                name="name"
                rules={[{ required: true, message: t('name_required') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t('email')}
                name="email"
                rules={[{ type: 'email', message: t('valid_email_required') }]}
              >
                <Input />
              </Form.Item>

            </Col>
            <Col span={12}>

              <Form.Item
                label={t('bio')}
                name="bio"
                rules={[{ required: true, message: t('bio_required'), min: 10 }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Button type="primary" htmlType="submit" size='small'>
              {t('confirm')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
