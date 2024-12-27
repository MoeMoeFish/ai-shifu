import styles from './MainMenuModal.module.scss';
import PopupModal from 'Components/PopupModal';
import { Button } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import askIcon from '@Assets/newchat/light/svg-ask-16.svg';
import { useUserStore } from 'stores/useUserStore.js';

const MainMenuModal = ({
  open,
  onClose = () => {},
  style = {},
  className = '',
}) => {
  return (
    <PopupModal
      open={open}
      onClose={onClose}
      wrapStyle={{ ...style }}
      className={className}
    >
      <div className={styles.mainMenuModal}>
        <div className={styles.mainMenuModalRow}>
          <img src="askIcon" alt="" className={styles.rowIcon} />
          <div className={styles.rowTitle} >个人信息</div>
        </div>
        <div className={styles.mainMenuModalRow}>
          <img src="askIcon" alt="" className={styles.rowIcon} />
          <div className={styles.rowTitle} >个性化设置</div>
        </div>
        <div className={styles.mainMenuModalRow}>
          <img src="askIcon" alt="" className={styles.rowIcon} />
          <div className={styles.rowTitle} >语言</div>
        </div>
        <div className={styles.mainMenuModalRow}>
          <img src="askIcon" alt="" className={styles.rowIcon} />
          <div className={styles.rowTitle} >登录</div>
        </div>
      </div>
    </PopupModal>
  );
};

export default memo(MainMenuModal);
