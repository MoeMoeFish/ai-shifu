import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import styles from './TrialNodeBottomArea.module.scss';
import { Button, ConfigProvider } from 'antd';
import PayModal from 'Pages/NewChatPage/Components/Pay/PayModal.jsx';
import PayModalM from 'Pages/NewChatPage/Components/Pay/PayModalM.jsx';
import { shifu } from 'ShiNiang/config/config';
import { useDisclosture } from 'ShiNiang/common/hooks/useDisclosture.js';
import { usePayStore } from 'ShiNiang/stores/usePayStore.js';

const TrialNodeBottomArea = ({ payload }) => {
  const { hasPay, updateHasPay } = usePayStore(
    useShallow((state) => ({
      hasPay: state.hasPay,
      updateHasPay: state.updateHasPay,
    }))
  );
  const onClick = () => {
    onOpen();
  };

  const { open, onOpen, onClose } = useDisclosture();

  const onModalOk = () => {
    updateHasPay(true);
  };

  const onModalCancel = () => {
    onClose();
  };

  return hasPay ? (
    <></>
  ) : (
    <>
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
          className={styles.trialNodeBottomArea}
          onClick={onClick}
        >
          <div className={styles.buttonContent}>
            <div className={styles.row1}>{payload.banner_info}</div>
            <div className={styles.row2}>{payload.banner_title}</div>
          </div>
        </Button>
      </ConfigProvider>
      {open &&
        (shifu.getConfig().mobileStyle ? (
          <PayModalM open={open} onCancel={onModalCancel} onOk={onModalOk} />
        ) : (
          <PayModal open={open} onCancel={onModalCancel} onOk={onModalOk} />
        ))}
    </>
  );
};

export default memo(TrialNodeBottomArea);
