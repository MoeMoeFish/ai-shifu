import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { customEvents, EVENT_TYPE } from 'ShiNiang/events/event.js';
import { usePayStore } from 'ShiNiang/stores/usePayStore.js';
import { shifu } from 'ShiNiang/config/config';
import { useDisclosture } from 'ShiNiang/common/hooks/useDisclosture.js';
import PayModal from 'Pages/NewChatPage/Components/Pay/PayModal.jsx';
import PayModalM from 'Pages/NewChatPage/Components/Pay/PayModalM.jsx';
import OrderPromotePopoverContent from './OrderPromotePopoverContent.jsx';
import { useEffect } from 'react';

const MobileHeaderIconPopoverContent = ({ payload, onClose, onOpen }) => {
  const { hasPay, updateHasPay } = usePayStore(
    useShallow((state) => ({
      hasPay: state.hasPay,
      updateHasPay: state.updateHasPay,
    }))
  );

  const {
    open: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosture();

  const onModalOk = () => {
    updateHasPay(true);
    onModalClose();
  };

  const onModalCancel = () => {};

  useEffect(() => {
    const onEventHandler = () => {
      onOpen?.();
      console.log('MobileHeaderIconPopoverContent.onEventHandler')
    };

    customEvents.addEventListener(
      EVENT_TYPE.NON_BLOCK_PAY_MODAL_CLOSED,
      onEventHandler
    );

    console.log('MobileHeaderIconPopoverContent.useEffect.addEventListener')
    return () => {
      customEvents.removeEventListener(
        EVENT_TYPE.NON_BLOCK_PAY_MODAL_CLOSED,
        onEventHandler
      );
    };
  }, [onOpen]);

  return (
    <>
      <OrderPromotePopoverContent
        payload={payload}
        onCancelButtonClick={onClose}
        onOkButtonClick={() => {
          onModalOpen();
          onClose?.();
        }}
      />

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

export default memo(MobileHeaderIconPopoverContent);
