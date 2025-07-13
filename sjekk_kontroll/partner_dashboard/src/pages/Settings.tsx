import { useState } from "react";
import { Card, Switch, Button, Select, Form, message, Slider, Tabs, Input } from "antd";
import { useTranslation } from 'react-i18next';
import { setLanguage } from "../utils/language";
import { GlobalOutlined } from "@ant-design/icons";
import { VscAccount } from "react-icons/vsc";

const { Option } = Select;

const AccountSettingsForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Implement logic to handle the submission of account settings
    // You can use the values of 'username' and 'password' to update the account settings
    // Example: updateAccountSettings(username, password);
    message.success(t('account_settings_saved'));
  };

  return (
    <Form layout="vertical">
      <Form.Item label={t('username')}>
        <Input
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Item>

      <Form.Item label={t('current_password')}>
        <Input.Password
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />
      </Form.Item>
      <Form.Item label={t('password')}>
        <Input.Password
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Item>

      {/* Add more account settings fields here as needed */}

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          {t('save_account_settings')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);

  const handleLanguageChange = (value: 'en' | 'no') => {
    setLanguage(i18n, value);
    message.success(t('language_changed'));
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationEnabled(checked);
    message.success(checked ? t('notifications_enabled') : t('notifications_disabled'));
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    // Implement logic to change the theme (you can use CSS-in-JS libraries for this)
    message.success(t('theme_changed'));
  };

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    // Implement logic to change font size (you can use CSS-in-JS libraries for this)
    message.success(t('font_changed'));
  };

  const handleResetSettings = () => {
    // Implement logic to reset settings to default
    setNotificationEnabled(true);
    setSelectedTheme("light");
    setFontSize(16);
    message.success(t('set_defaults'));
  };

  const [activeTab, setActiveTab] = useState<string>('general'); // State for tracking active tab
  // Handler for changing tabs
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const { TabPane } = Tabs;  // Import Tabs component


  return (
    <>
      <div style={{ padding: '24px' }} className="padding-container">
      <Tabs activeKey={activeTab} onChange={handleTabChange} >
        <TabPane tab={
          <span>
            <GlobalOutlined /> {t('general')}
          </span>
        } key='general' >
          <Card title={t('settings')} style={{ width: '100%', margin: 'auto', border:'3px solid #eee' }}>
          <Form layout="vertical">
            <Form.Item label={t('change_language')}>
              <Select defaultValue={i18n.language as 'en' | 'no'} onChange={handleLanguageChange}>
                <Option value="en">English</Option>
                <Option value="no">Norsk</Option>
                {/* Add more language options as needed */}
              </Select>
            </Form.Item>

            <Form.Item label={t('toggle_notifications')}>
              <Switch
                checked={notificationEnabled}
                onChange={handleNotificationToggle}
              />
            </Form.Item>

            <Form.Item label={t('select_theme')}>
              <Select defaultValue={selectedTheme} onChange={handleThemeChange}>
                <Option value="light">{t('light')}</Option>
                <Option value="dark">{t('dark')}</Option>
                {/* Add more theme options as needed */}
              </Select>
            </Form.Item>

            <Form.Item label={t('adjust_font_size')}>
              <Slider
                min={12}
                max={36}
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </Form.Item>

            {/* Add more settings here as needed */}

            <Form.Item>
              <Button type="primary" onClick={handleResetSettings}>
                {t('reset_to_defaults')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
        </TabPane>
        <TabPane tab={
          <span>
            <VscAccount /> {t('account')}
          </span>
        } key='account'>
        <Card title={t('account_settings')} style={{ width: '100%', margin: 'auto', border:'3px solid #eee' }}>
            <AccountSettingsForm />
          </Card>
        </TabPane>
      </Tabs>
      </div>
    </>
  );
};

export default SettingsPage;
