import { memo, useRef } from 'react';
import { Dropdown } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import styles from './MainMenuModal.module.scss';
import PopupModal from 'Components/PopupModal';
import { useTranslation } from 'react-i18next';
import { languages } from 'Service/constants.js';
import { useUserStore } from 'stores/useUserStore.js';
import { DownOutlined } from '@ant-design/icons';

const MainMenuModal = ({
  open,
  onClose = () => {},
  style = {},
  className = '',
}) => {
  const htmlRef = useRef(null);
  const { hasLogin } = useUserStore(
    useShallow((state) => ({
      hasLogin: state.hasLogin,
    }))
  );

  const { i18n } = useTranslation();
  const languageDrowdownContainer = (triggerNode) => {
    if (htmlRef.current) {
      return htmlRef.current;
    }

    return triggerNode;
  };

  const languageDrowdownMeus = {
    items: languages.map((lang) => ({
      key: lang.value,
      label: lang.label,
    })),
    onClick: ({ key }) => {
      i18n.changeLanguage(key);
    },
  };

  const onUserInfoClick = () => {
    if (!hasLogin) {

    }
  };

  const onPersonalInfoClick = () => {};

  const onLoginClick = () => {};

  const onLogoutClick = () => {};

  return (
    <PopupModal
      open={open}
      onClose={onClose}
      wrapStyle={{ ...style }}
      className={className}
    >
      <div className={styles.mainMenuModal} ref={htmlRef}>
        <div className={styles.mainMenuModalRow} onClick={onUserInfoClick}>
          <img
            className={styles.rowIcon}
            src={require('@Assets/newchat/light/icon16-course-list.png')}
            alt=""
          />
          <div className={styles.rowTitle}>个人信息</div>
        </div>
        <div className={styles.mainMenuModalRow} onClick={onPersonalInfoClick}>
          <img
            className={styles.rowIcon}
            src={require('@Assets/newchat/light/icon16-course-list.png')}
            alt=""
          />
          <div className={styles.rowTitle}>个性化设置</div>
        </div>
        <div
          className={classNames(styles.mainMenuModalRow, styles.languageRow)}
        >
          <div className={styles.languageRowLeft}>
            <img
              className={styles.rowIcon}
              src={require('@Assets/newchat/light/icon16-course-list.png')}
              alt=""
            />
            <div className={styles.rowTitle}>语言</div>
          </div>
          <div className={styles.languageRowRight}>
            <Dropdown
              getPopupContainer={languageDrowdownContainer}
              menu={languageDrowdownMeus}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {languages.find((lang) => lang.value === i18n.language)
                  ?.label || '请选择'}{' '}
                {<DownOutlined className={style.langDownIcon} />}
              </div>
            </Dropdown>
          </div>
        </div>
        {!hasLogin ? (
          <div className={styles.mainMenuModalRow} onClick={onLoginClick}>
            <img
              className={styles.rowIcon}
              src={require('@Assets/newchat/light/icon16-course-list.png')}
              alt=""
            />
            <div className={styles.rowTitle}>登录</div>
          </div>
        ) : (
          <div className={styles.mainMenuModalRow} onClick={onLogoutClick}>
            <img
              className={styles.rowIcon}
              src={require('@Assets/newchat/light/icon16-course-list.png')}
              alt=""
            />
            <div className={styles.rowTitle}>退出登录</div>
          </div>
        )}
      </div>
    </PopupModal>
  );
};

export default memo(MainMenuModal);
