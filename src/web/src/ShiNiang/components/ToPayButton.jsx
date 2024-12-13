import { memo } from 'react';
import { Button, ConfigProvider } from 'antd';

const ToPayButton = ({
  children,
  onClick,
}) => {
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#f8e3c3',
          colorPrimaryHover: '#f8e3c3',
          colorPrimaryActive: '#f8e3c3',
          colorBorder: '#d8b582',
          colorPrimaryBorderHover: '#d8b582',
          defaultBg: '#f8e3c3',
          primaryShadow: 'none',
          defaultBorderColor: '#d8b582',
        },
      },
    }}
  >
    <Button
      type="primary"
      style={{ color: '#854c2b', border: '1px solid #d8b582' }}
      onClick={onClick}
    >
      {children}
    </Button>
  </ConfigProvider>;
};

export default memo(ToPayButton);
