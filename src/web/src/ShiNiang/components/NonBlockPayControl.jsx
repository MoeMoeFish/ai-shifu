import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PayModal from 'Pages/NewChatPage/Components/Pay/PayModal.jsx';
import PayModalM from 'Pages/NewChatPage/Components/Pay/PayModalM.jsx';
import { customEvents, EVENT_TYPE } from 'ShiNiang/events/event.js';
import { useState } from 'react';
import { shifu } from 'ShiNiang/config/config';
import { usePayStore } from 'ShiNiang/stores/usePayStore.js';

const NonBlockPayControl = ({ onClose, payload, onComplete }) => {
  const [isShow, setIsShow] = useState(true);
  const { updateHasPay } = usePayStore(
    useShallow((state) => ({ updateHasPay: state.updateHasPay }))
  );

  const onPayModalOk = () => {
    updateHasPay(true);
    onComplete?.(payload.type, payload.val, payload.scriptId);
  };

  const onNonBlockPayModalClose = () => {
    console.log('onNonBlockPayModalClose');
    customEvents.dispatchEvent(
      new CustomEvent(EVENT_TYPE.NON_BLOCK_PAY_MODAL_CLOSED, { detail: {} })
    );
    onComplete?.(payload.type, payload.val, payload.scriptId);
    onClose();
  };

  return (
    <>
      {isShow &&
        (shifu.getConfig().mobileStyle ? (
          <PayModalM
            open={isShow}
            onCancel={onNonBlockPayModalClose}
            onOk={onPayModalOk}
          />
        ) : (
          <PayModal
            open={isShow}
            onCancel={onNonBlockPayModalClose}
            onOk={onPayModalOk}
          />
        ))}
    </>
  );
};

export default memo(NonBlockPayControl);