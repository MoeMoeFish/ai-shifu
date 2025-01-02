import { memo, useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { Modal } from 'antd';
import styles from './ShortcutModal.module.scss';
import { AppContext } from 'Components/AppContext.js';
import { calModalWidth } from 'Utils/common.js';
import { useUiLayoutStore } from 'stores/useUiLayoutStore.js';
import { useTranslation } from 'react-i18next';

const ShortcutModal = ({ open, onClose }) => {
  const { mobileStyle } = useContext(AppContext);
  const { inMacOs } = useUiLayoutStore(
    useShallow((state) => ({ inMacOs: state.inMacOs }))
  );
  const { t } = useTranslation();

  const shortcutKeysOptions = [
    {
      title: '继续（无需用户输入或选择时）',
      keys: [t('common.shortcut.space')],
      mackeys: [t('common.shortcut.space')],
    },
    {
      title: '追问',
      keys: ['Ctrl', 'Shift', 'A'],
      mackeys: ['⌘', 'Shift', 'A'],
    },
    {
      title: '显示快捷方式',
      keys: ['Ctrl', '/'],
      mackeys: ['⌘', '/'],
    },
  ];

  const getShortcutKey = (keyText) => {
    const isSingleText = keyText.length === 1;

    return (
      <div
        className={classNames(
          styles.shortcutKey,
          isSingleText ? styles.singleText : styles.multiText
        )}
      >
        {keyText}
      </div>
    );
  };

  return (
    <Modal
      className={styles.shortcutModal}
      width={calModalWidth({ mobileStyle, width: '400px' })}
      open={open}
      footer={null}
      maskClosable={true}
      onCancel={onClose}
    >
      <div>
        <div className={styles.shortcutTitle}>键盘快捷方式</div>
        <div className={styles.shortcutContent}>
          {shortcutKeysOptions.map((option, index) => {
            const keys = inMacOs ? option.mackeys : option.keys;
            return (
              <div className={styles.shortcutRow} key={index}>
                <div className={styles.rowTitle}>{option.title}</div>
                <div className={styles.rowKeys}>
                  {keys.map((v, i) => {
                    return getShortcutKey(v);
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default memo(ShortcutModal);
