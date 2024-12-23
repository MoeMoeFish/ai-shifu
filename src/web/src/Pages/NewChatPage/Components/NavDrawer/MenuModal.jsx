import { memo } from 'react';
import styles from './MenuModal.module.scss';
import PopupModal from 'Components/PopupModal.jsx';

const MenuModal = ({
  open,
  onClose,
  style,
  className,
}) => {
  return (
    <PopupModal
        open={open}
        onClose={onClose}
        wrapStyle={{ ...style }}
        className={className}
    >
      <div className={`${styles.menuModal} ${styles.popupModalContainer}`}>
        <div className={styles.popupModalRow}></div>
      </div>
    </PopupModal>
  );
};

export default memo(MenuModal);
