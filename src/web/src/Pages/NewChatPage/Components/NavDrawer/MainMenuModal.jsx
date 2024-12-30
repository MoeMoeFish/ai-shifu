import { memo, useRef } from 'react';
import { Dropdown, Modal } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import styles from './MainMenuModal.module.scss';
import PopupModal from 'Components/PopupModal';
import { useTranslation } from 'react-i18next';
import { languages } from 'Service/constants.js';
import { useUserStore } from 'stores/useUserStore.js';
import { DownOutlined } from '@ant-design/icons';
import { shifu } from 'Service/Shifu.js';

const MainMenuModal = ({
  open,
  onClose = () => {},
  style = {},
  className = '',
}) => {
  const htmlRef = useRef(null);
  const { hasLogin, logout } = useUserStore(
    useShallow((state) => ({
      logout: state.logout,
      hasLogin: state.hasLogin,
    }))
  );

  const { i18n, t } = useTranslation();
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
      shifu.loginTools.openLogin();
    }
  };

  const onPersonalInfoClick = () => {
    if (!hasLogin) {
      shifu.loginTools.openLogin();
    }
  };

  const onLoginClick = () => {
    shifu.loginTools.openLogin();
  };

  const onLogoutClick = async () => {
    await Modal.confirm({
      title: t('user.confirmLogoutTitle'),
      content: t('user.confirmLogoutContent'),
      onOk: async () => {
        await logout();
        window.location.reload();
      },
    });
  };

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
          <div className={styles.rowTitle}>{t('menus.navigationMenus.basicInfo')}</div>
        </div>
        <div className={styles.mainMenuModalRow} onClick={onPersonalInfoClick}>
          <img
            className={styles.rowIcon}
            src={require('@Assets/newchat/light/icon16-course-list.png')}
            alt=""
          />
          <div className={styles.rowTitle}>{t('menus.navigationMenus.personalInfo')}</div>
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
            <div className={styles.rowTitle}>{t('menus.navigationMenus.language')}</div>
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
            <div className={styles.rowTitle}>{t('user.login')}</div>
          </div>
        ) : (
          <div className={styles.mainMenuModalRow} onClick={onLogoutClick}>
            <img
              className={styles.rowIcon}
              src={require('@Assets/newchat/light/icon16-course-list.png')}
              alt=""
            />
            <div className={styles.rowTitle}>{t('user.logout')}</div>
          </div>
        )}
      </div>
    </PopupModal>
  );
};

export default memo(MainMenuModal);
