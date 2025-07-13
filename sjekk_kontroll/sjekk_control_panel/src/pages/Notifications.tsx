// NotificationsPage.jsx

import {  List, Avatar, Typography} from "antd";
import { useTranslation } from 'react-i18next';
import { NotificationOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const NotificationsPage = () => {
  const { t } = useTranslation();
  // const [readNotifications, setReadNotifications] = useState<{
  //   id:number,
  //   type: string,
  //   title:string,
  //   description: string,
  //   timestamp:string
  // }[]>([]);

  // Dummy data for notifications
  const notifications = [
    {
      id: 1,
      type: "info",
      title: t('notification_received'),
      description: t('A new complaint has been submitted. Please review and take necessary action.'),
      timestamp: '2024-03-15 10:30 AM',
    },
    {
      id: 2,
      type: "success",
      title: t('complaint_update'),
      description: t('The status of complaint #123 has been updated to "In Progress."'),
      timestamp: '2024-03-14 03:45 PM',
    },
    // Add more dummy notifications as needed
  ];


  return (
    <>
      <div style={{ padding: '16px' }}>
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<NotificationOutlined />} style={{ backgroundColor: getTypeColor(item.type) }} />}
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Title level={4}>{item.title}</Title>
                    </div>
                  }
                  description={
                    <>
                      <Paragraph>{item.description}</Paragraph>
                      <Paragraph type="secondary">{item.timestamp}</Paragraph>
                    </>
                  }
                />
              </List.Item>
            )}
          />
      </div>
    </>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "info":
      return "#1890ff"; // Ant Design primary color for info
    case "success":
      return "#52c41a"; // Ant Design primary color for success
    default:
      return "#595959"; // Ant Design gray color for other types
  }
};

export default NotificationsPage;
