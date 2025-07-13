// NotFoundPage.jsx

import { Result, Button } from "antd";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ background:'#eee', height: '100vh' }}>
        <Result
          status="404"
          title="404"
          subTitle={t('website_doesnt_exist')}
          extra={
            <Link to="/">
              <Button type="primary">{t('back_home')}</Button>
            </Link>
          }
        />
      </div>
    </>
  );
};

export default NotFoundPage;
