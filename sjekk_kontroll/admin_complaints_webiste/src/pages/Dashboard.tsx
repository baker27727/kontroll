// Dashboard.tsx
import { Layout, Row, Col, Card, Statistic, Divider, Typography } from "antd";
import Navbar from "../components/Navbar";
import {
  UserOutlined,
  AlertOutlined,
  CheckOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getComplaintsCount } from "../redux/features/get_complaints_count";
import { useTranslation } from "react-i18next";
ChartJS.register(ArcElement, Tooltip, Legend);


const { Content } = Layout;

const Dashboard = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getComplaintsCount())
  },[dispatch])

  const [t] = useTranslation()

  const complaints_count_state = useAppSelector(state => state.complaints_count)


  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "20px" }}>
        <Typography.Title level={2}>Dashboard</Typography.Title>

        <Row gutter={[16, 16]}>
          {/* Statistics Boxes */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => {
                window.location.href = "/complaints";
              }}
            >
              <Statistic
              style={{ cursor: 'pointer' }}
                title={t('total_complaints')}
                value={complaints_count_state.complaints_count}
                prefix={<AlertOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
              style={{ cursor: 'pointer' }}
                title={t('pending_complaints')}
                value={'-'}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
              style={{ cursor: 'pointer' }}
                title={t('resolved_complaints')}
                value={'-'}
                prefix={<CheckOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Statistic
              style={{ cursor: 'pointer' }}
                title={t('total_users')}
                value={'-'}
                prefix={<TeamOutlined />}
                
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Typography.Title level={3}>{t('Others')}</Typography.Title>
        <Row gutter={[16, 16]}>
        <Col xs={24} md={8} lg={12}>
            <Card title={t('admin_information')}>
              <p>
                {t('admin_welcome')}
              </p>
              <p>
                {t('second_admin_welcome')}
              </p>
            </Card>
          </Col>

          <Col xs={24} md={8} lg={12}>
            <Card title={t('admin_information')}>
              <p>
                {t('admin_welcome')}
              </p>
              <p>
                {t('second_admin_welcome')}
              </p>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
