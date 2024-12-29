import classNames from 'classnames';
import { memo, forwardRef, useImperativeHandle, useRef } from 'react';
import { Avatar } from 'antd';
import styles from './NavFooter.module.scss';
import userIcon from 'Assets/newchat/light/user.png';
import settingsIcon from 'Assets/newchat/light/settings-2x.png';
import themeIcon from 'Assets/newchat/light/icon16-theme.png';
import filingIcon from 'Assets/newchat/light/icon16-filing.png';
import { useUserStore } from 'stores/useUserStore.js';
import { useTranslation } from 'react-i18next';

export const NavFooter = forwardRef(({ onClick, isCollapse = false }, ref) => {
  const { t } = useTranslation();
  const { hasLogin, userInfo } = useUserStore((state) => state);
  const avatar = userInfo?.avatar || userIcon;
  const htmlRef = useRef(null);

  const containElement = (elem) => {
    return htmlRef.current && htmlRef.current.contains(elem);
  };
  useImperativeHandle(ref, () => ({
    containElement,
  }));

  return (
    <div
      className={classNames(
        styles.navFooter,
        isCollapse ? styles.collapse : ''
      )}
      onClick={onClick}
      ref={htmlRef}
    >
      <div className={styles.userSection}>
        <Avatar className={styles.avatar} src={avatar} size={32} />
        <div className={styles.userName}>
          {hasLogin
            ? userInfo?.name || t('user.defaultUserName')
            : t('user.notLogin')}
        </div>
      </div>
    </div>
  );
});

export const NavFooter2 = forwardRef(
  (
    {
      isCollapse = false,
      onFilingClick = () => {},
      onThemeClick = () => {},
      onSettingsClick = () => {},
    },
    ref
  ) => {
    const { t } = useTranslation();
    const fillBtnRef = useRef(null);
    const themeBtnRef = useRef(null);
    const settingBtnRef = useRef(null);

    const containElement = (elem) => {
      return (
        (fillBtnRef.current && fillBtnRef.current.contains(elem)) ||
        (themeBtnRef.current && themeBtnRef.current.contains(elem)) ||
        (settingBtnRef.current && settingBtnRef.current.contains(elem))
      );
    };

    useImperativeHandle(ref, () => ({
      containElement,
    }));

    return (
      <div
        className={classNames(
          styles.navFooter,
          isCollapse ? styles.collapse : ''
        )}
      >
        <div
          className={styles.settingBtn}
          onClick={onFilingClick}
          ref={fillBtnRef}
        >
          <img
            src={filingIcon}
            className={styles.icon}
            alt={t('navigation.filing')}
          />
          <div className={styles.btnText}>{t('navigation.filing')}</div>
        </div>
        <div
          className={styles.settingBtn}
          onClick={onThemeClick}
          ref={themeBtnRef}
        >
          <img
            src={themeIcon}
            className={styles.icon}
            alt={t('navigation.skin')}
          />
          <div className={styles.btnText}>{t('navigation.skin')}</div>
        </div>
        <div
          className={styles.settingBtn}
          onClick={onSettingsClick}
          ref={settingBtnRef}
        >
          <img
            src={settingsIcon}
            className={styles.icon}
            alt={t('navigation.settings')}
          />
          <div className={styles.btnText}>{t('navigation.settings')}</div>
        </div>
      </div>
    );
  }
);

export default memo(NavFooter);
