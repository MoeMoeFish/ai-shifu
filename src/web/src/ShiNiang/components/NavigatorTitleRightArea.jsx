import { memo, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button, Popover, ConfigProvider } from 'antd';
import { useDisclosture } from 'ShiNiang/common/hooks/useDisclosture.js';
import MainButton from 'ShiNiang/components/MainButton.jsx';
import styles from './NavigatorTitleRightArea.module.scss';
import { customEvents, EVENT_TYPE } from 'ShiNiang/events/event.js';
import { TrophyTwoTone } from '@ant-design/icons';
import PayModal from 'Pages/NewChatPage/Components/Pay/PayModal.jsx';
import PayModalM from 'Pages/NewChatPage/Components/Pay/PayModalM.jsx';
import { shifu } from 'ShiNiang/config/config';
import { usePayStore } from 'ShiNiang/stores/usePayStore.js';

export const ControlType = 'navigator_top_area';

const NavigatorTitleRightArea = ({ payload }) => {
  const { hasPay, updateHasPay } = usePayStore(
    useShallow((state) => ({
      hasPay: state.hasPay,
      updateHasPay: state.updateHasPay,
    }))
  );

  const { frameLayout } = shifu.stores.useUiLayoutStore(
    useShallow((state) => ({ frameLayout: state.frameLayout }))
  );

  const {
    open: popoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
  } = useDisclosture();

  const {
    open: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosture();

  const onModalOk = () => {
    updateHasPay(true);
  };

  const onModalCancel = () => {
    onModalClose();
  };

  const onUnlockAllClick = () => {
    onModalOpen();
    onPopoverClose();
  };

  const popoverLocation = shifu.utils.checkMobileStyle(frameLayout) ? 'bottom' : 'rightTop';

  const getPopoverContent = () => {
    return (
      <div className={styles.popoverContent}>
        <div className={styles.leftColumn}>
          <TrophyTwoTone style={{ fontSize: '1.5em' }} twoToneColor="#E99D42" />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.descRow1}>{payload.pop_up_title}</div>
          <div className={styles.descRow2}>{payload.pop_up_content}</div>
          <div className={styles.buttonRow}>
            <Button
              type="default"
              onClick={onPopoverClose}
              style={{ height: 26 }}
            >
              {payload.pop_up_cancel_text}
            </Button>
            <MainButton
              className={styles.payBtn}
              onClick={onUnlockAllClick}
              shape="default"
              height={26}
            >
              {payload.pop_up_confirm_text}
            </MainButton>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const onEventHandler = () => {
      onPopoverOpen();
    };
    customEvents.addEventListener(
      EVENT_TYPE.NON_BLOCK_PAY_MODAL_CLOSED,
      onEventHandler
    );

    return () => {
      customEvents.removeEventListener(
        EVENT_TYPE.NON_BLOCK_PAY_MODAL_CLOSED,
        onEventHandler
      );
    };
  }, [onPopoverOpen]);

  return (
    <>
      {!hasPay ? (
        <Popover
          rootClassName={styles.navigatorTitleRightAreaPopover}
          content={getPopoverContent()}
          open={popoverOpen}
          placement={popoverLocation}
        >
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
              onClick={onPopoverOpen}
            >
              {payload.title}
            </Button>
          </ConfigProvider>
        </Popover>
      ) : (
        <></>
      )}

      {!hasPay &&
        modalOpen &&
        (shifu.getConfig().mobileStyle ? (
          <PayModalM
            open={modalOpen}
            onCancel={onModalCancel}
            onOk={onModalOk}
          />
        ) : (
          <PayModal
            open={modalOpen}
            onCancel={onModalCancel}
            onOk={onModalOk}
          />
        ))}
    </>
  );
};

export default memo(NavigatorTitleRightArea);
