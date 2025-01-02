import classNames from 'classnames';
import { memo } from 'react';
import { Popover, Menu } from 'antd';
import styles from './GlobalInfoButton.module.scss';
import FeedbackModal from 'Pages/NewChatPage/Components/FeedbackModal/FeedbackModal.jsx';
import ShortcutModal from '../ShortcutModal/ShortcutModal.jsx';
import MessageIcon from 'Assets/newchat/light/message.png';
import FeedbackIcon from 'Assets/newchat/light/feedback-line.png';
import OpenLinkIcon from 'Assets/newchat/light/open-link.png';
import shotcutIcon from 'Assets/newchat/light/shotcut.png';
import { useTranslation } from 'react-i18next';
import { useDisclosture } from 'common/hooks/useDisclosture.js';

const GlobalInfoButton = ({ className }) => {
  const { t } = useTranslation();
  const {
    open: feedbackModalOpen,
    onOpen: onFeedbackModalOpen,
    onClose: onFeedbackModalClose,
  } = useDisclosture();

  const {
    open: shortcutModalOpen,
    onOpen: onShortcutModalOpen,
    onClose: onShortcutModalClose,
  } = useDisclosture();

  const menuItems = [
    {
      key: '1',
      label: t('navigation.contactUs'),
      icon: <img className={styles.rowIcon} src={MessageIcon} alt="icon" />,
      onClick: () => {},
    },
    {
      key: '2',
      label: t('navigation.feedbackTitle'),
      icon: <img className={styles.rowIcon} src={FeedbackIcon} alt="icon" />,
      onClick: () => {
        onFeedbackModalOpen();
      },
    },
    {
      key: '3',
      label: t('navigation.userAggrement'),
      icon: <img className={styles.rowIcon} src={OpenLinkIcon} alt="icon" />,
      onClick: () => {
        window.open('/useraggrement');
      },
    },
    {
      key: '4',
      label: t('navigation.privacyPolicy'),
      icon: <img className={styles.rowIcon} src={OpenLinkIcon} alt="icon" />,
      onClick: () => {
        window.open('/privacypolicy');
      },
    },
    {
      key: '5',
      label: t('navigation.shortcut'),
      icon: <img className={styles.rowIcon} src={shotcutIcon} alt="icon" />,
      onClick: () => {
        onShortcutModalOpen();
      }
    },
  ];
  return (
    <>
      <Popover
        content={
          <div class={styles.popoverContent}>
            <Menu items={menuItems} selectable={false} />
            <div className={styles.policyInfo}>
              <div className={styles.policyInfoRow}>
                {t('common.companyName')}
              </div>
              <div className={styles.policyInfoRow}>
                {t('common.companyAddress')}
              </div>
              <div className={styles.policyInfoRow}>
                <a
                  className={styles.miitLink}
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('navigation.icp')}
                </a>
              </div>
              <div
                className={classNames(styles.gonganRow, styles.policyInfoRow)}
              >
                <img
                  className={styles.beianIcon}
                  src={require('@Assets/newchat/light/beian.png')}
                  alt={t('navigation.filing')}
                />
                <div>{t('navigation.gongan')}</div>
              </div>
            </div>
          </div>
        }
        arrow={false}
        placement="topRight"
      >
        <button
          type="button"
          className={classNames(styles.globalInfoButton, className)}
        >
          ?
        </button>
      </Popover>
      <FeedbackModal
        open={feedbackModalOpen}
        onClose={() => {
          onFeedbackModalClose();
        }}
      />
      <ShortcutModal
        open={shortcutModalOpen}
        onClose={() => {
          onShortcutModalClose();
        }}
      />
    </>
  );
};

export default memo(GlobalInfoButton);
