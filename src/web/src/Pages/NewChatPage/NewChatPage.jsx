import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NewChatPage.module.scss';
import { Skeleton } from 'antd';
import {
  calcFrameLayout,
  FRAME_LAYOUT_MOBILE,
  inWechat,
} from 'constants/uiConstants.js';
import { useUiLayoutStore } from 'stores/useUiLayoutStore.js';
import { useUserStore } from 'stores/useUserStore.js';
import { AppContext } from 'Components/AppContext.js';
import NavDrawer from './Components/NavDrawer/NavDrawer.jsx';
import ChatUi from './Components/ChatUi/ChatUi.jsx';
import LoginModal from './Components/Login/LoginModal.jsx';
import { useLessonTree } from './hooks/useLessonTree.js';
import { useCourseStore } from 'stores/useCourseStore';
import TrackingVisit from 'Components/TrackingVisit.jsx';
import ChatMobileHeader from './Components/ChatMobileHeader.jsx';
import { useDisclosture } from 'common/hooks/useDisclosture.js';
import { updateWxcode } from 'Api/user.js';

import FeedbackModal from './Components/FeedbackModal/FeedbackModal.jsx';
import PayModalM from 'Pages/NewChatPage/Components/Pay/PayModalM.jsx';
import PayModal from 'Pages/NewChatPage/Components/Pay/PayModal.jsx';
import { useTranslation } from 'react-i18next';
import { useEnvStore } from 'stores/envStore.js';
import { shifu } from 'Service/Shifu.js';
import { EVENT_NAMES, events } from './events.js';

// the main page of course learning
const NewChatPage = (props) => {
  const { frameLayout, updateFrameLayout } = useUiLayoutStore((state) => state);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { hasLogin, userInfo, checkLogin, hasCheckLogin } = useUserStore(
    (state) => state
  );
  const [language, setLanguage] = useState(userInfo?.language || 'en-US');

  const {
    tree,
    loadTree,
    reloadTree,
    updateSelectedLesson,
    toggleCollapse,
    getCurrElementStatic,
    updateLesson,
    updateChapterStatus,
    getChapterByLesson,
    onTryLessonSelect,
  } = useLessonTree();
  const [cid, setCid] = useState(null);
  const { lessonId, changeCurrLesson, chapterId, updateChapterId } =
    useCourseStore((state) => state);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const {
    open: feedbackModalOpen,
    onOpen: onFeedbackModalOpen,
    onClose: onFeedbackModalClose,
  } = useDisclosture();
  const { i18n } = useTranslation();

  const mobileStyle = frameLayout === FRAME_LAYOUT_MOBILE;

  const {
    open: navOpen,
    onClose: onNavClose,
    onToggle: onNavToggle,
  } = useDisclosture({
    initOpen: mobileStyle ? false : true,
  });

  const { courseId } = useParams();
  const { updateCourseId } = useEnvStore.getState();

  const fetchData = useCallback(async () => {
    if (tree) {
      const data = await getCurrElementStatic(tree);
      if (data && data.lesson) {
        changeCurrLesson(data.lesson.id);
        if (data.catalog && (!cid || cid !== data.catalog.id)) {
          setCid(data.catalog.id);
        }
      }
    }
  }, [changeCurrLesson, cid, getCurrElementStatic, tree]);

  const loadData = useCallback(async () => {
    await loadTree();
  }, [loadTree]);

  const initAndCheckLogin = useCallback(async () => {
    checkLogin();
    if (inWechat()) {
      await updateWxcode();
    }
    setInitialized(true);
  }, [checkLogin]);

  const onLoginModalClose = useCallback(async () => {
    setLoginModalOpen(false);
    await loadData();
    shifu.loginTools.loginModalCancel();
  }, [loadData]);

  const onLoginModalOk = useCallback(async () => {
    shifu.loginTools.loginModalOk();
  }, []);

  const onLessonUpdate = useCallback(
    (val) => {
      updateLesson(val.id, val);
    },
    [updateLesson]
  );

  const onChapterUpdate = useCallback(
    ({ id, status, status_value }) => {
      updateChapterStatus(id, { status, status_value });
    },
    [updateChapterStatus]
  );

  const onGoChapter = async (id) => {
    await reloadTree();
    setCid(id);
  };

  const onPurchased = useCallback(() => {
    reloadTree();
  }, [reloadTree]);

  const onGoToSetting = useCallback(() => {
    setShowUserSettings(true);
  }, []);

  const onLessonSelect = ({ id }) => {
    const chapter = getChapterByLesson(id);
    if (!chapter) {
      return;
    }
    changeCurrLesson(id);
    if (chapter.id !== chapterId) {
      setCid(chapter.id);
    }

    if (lessonId === id) {
      return;
    }

    events.dispatchEvent(
      new CustomEvent(EVENT_NAMES.GO_TO_NAVIGATION_NODE, {
        detail: {
          chapterId: chapter.id,
          lessonId: id,
        },
      })
    );

    if (mobileStyle) {
      onNavClose();
    }
  };

  const onFeedbackClick = useCallback(() => {
    onFeedbackModalOpen();
  }, [onFeedbackModalOpen]);

  const _onPayModalCancel = useCallback(() => {
    setPayModalOpen(false);
    shifu.payTools.payModalCancel();
  }, []);
  const _onPayModalOk = useCallback(() => {
    setPayModalOpen(false);
    shifu.payTools.payModalOk();
  }, []);

  // check the frame layout
  useEffect(() => {
    const onResize = () => {
      const frameLayout = calcFrameLayout('#root');
      updateFrameLayout(frameLayout);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [updateFrameLayout]);

  useEffect(() => {
    const updateCourse = async () => {
      if (courseId) {
        await updateCourseId(courseId);
      }
    };
    updateCourse();
  }, [courseId, updateCourseId]);

  useEffect(() => {
    if (hasCheckLogin) {
      fetchData();
    }
  }, [fetchData, hasCheckLogin]);

  useEffect(() => {
    if (cid === chapterId) {
      return;
    } else if (cid) {
      updateChapterId(cid);
    }
  }, [cid, chapterId, updateChapterId]);

  useEffect(() => {
    (async () => {
      if (!hasCheckLogin) {
        await initAndCheckLogin();
      }
    })();
  }, [hasCheckLogin, initAndCheckLogin]);

  // listen global event
  useEffect(() => {
    const eventHandler = () => {
      setLoginModalOpen(true);
    };
    shifu.events.addEventListener(
      shifu.EventTypes.OPEN_LOGIN_MODAL,
      eventHandler
    );

    return () => {
      shifu.events.removeEventListener(
        shifu.EventTypes.OPEN_LOGIN_MODAL,
        eventHandler
      );
    };
  });

  useEffect(() => {
    updateSelectedLesson(lessonId);
  }, [lessonId, updateSelectedLesson]);

  useEffect(() => {
    return useCourseStore.subscribe(
      (state) => state.resetedChapterId,
      (curr) => {
        if (!curr || curr === chapterId) {
          return;
        }
        onGoChapter(curr);
      }
    );
  });

  useEffect(() => {
    console.log('loadData hasCheckLogin', hasCheckLogin);
    if (hasCheckLogin) {
      loadData();
    }
  }, [hasCheckLogin, loadData]);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div className={classNames(styles.newChatPage)}>
      <AppContext.Provider
        value={{ frameLayout, mobileStyle, hasLogin, userInfo, theme: '' }}
      >
        <Skeleton
          style={{ width: '100%', height: '100%' }}
          loading={!initialized}
          paragraph={true}
          rows={10}
        >
          {navOpen && (
            <NavDrawer
              onLoginClick={() => setLoginModalOpen(true)}
              lessonTree={tree}
              onChapterCollapse={toggleCollapse}
              onLessonSelect={onLessonSelect}
              onGoToSetting={onGoToSetting}
              onTryLessonSelect={onTryLessonSelect}
              onClose={onNavClose}
            />
          )}
          {
            <ChatUi
              chapterId={chapterId}
              lessonUpdate={onLessonUpdate}
              onGoChapter={onGoChapter}
              onPurchased={onPurchased}
              showUserSettings={showUserSettings}
              onUserSettingsClose={() => setShowUserSettings(false)}
              chapterUpdate={onChapterUpdate}
            />
          }
        </Skeleton>
        {loginModalOpen && (
          <LoginModal
            onLogin={onLoginModalOk}
            open={loginModalOpen}
            onClose={onLoginModalClose}
            destroyOnClose={true}
            onFeedbackClick={onFeedbackClick}
          />
        )}
        {payModalOpen &&
          (mobileStyle ? (
            <PayModalM
              open={payModalOpen}
              onCancel={_onPayModalCancel}
              onOk={_onPayModalOk}
            />
          ) : (
            <PayModal
              open={payModalOpen}
              onCancel={_onPayModalCancel}
              onOk={_onPayModalOk}
            />
          ))}
        {initialized && <TrackingVisit />}

        {mobileStyle && (
          <ChatMobileHeader
            navOpen={navOpen}
            className={styles.chatMobileHeader}
            iconPopoverPayload={tree?.bannerInfo}
            onSettingClick={onNavToggle}
          />
        )}

        <FeedbackModal
          open={feedbackModalOpen}
          onClose={onFeedbackModalClose}
        />
      </AppContext.Provider>
    </div>
  );
};

export default NewChatPage;
