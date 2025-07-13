// NotFoundPage.jsx

import { Result, Button } from "antd";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ padding: '20px' }}>
        <Result
          status="404"
          title="404"
          subTitle={t('website_doesnt_exists')}
          extra={
            <Link to="/">
              <Button type="primary">{t('back_button')}</Button>
            </Link>
          }
        />
      </div>
    </>
  );
};

export default NotFoundPage;
