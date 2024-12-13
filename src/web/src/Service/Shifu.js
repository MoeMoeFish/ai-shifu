import { useUserStore } from "stores/useUserStore.js";
import { useUiLayoutStore } from "stores/useUiLayoutStore.js";
import { tokenTool } from "./storeUtil.js";
import { FRAME_LAYOUT_MOBILE } from 'constants/uiConstants.js';

const createShifu = () => {
  const chatInputActionControls = {}
  const controls = {}
  const eventHandlers = new EventTarget();

  const EventTypes = {
    OPEN_LOGIN_MODAL: 'open_login_modal',
  }

  const ControlTypes = {
    NAVIGATOR_TITLE_RIGHT_AREA: 'NAVIGATOR_TITLE_RIGHT_AREA',
    TRIAL_NODE_BOTTOM_AREA: 'TRIAL_NODE_BOTTOM_AREA',
  }

  const getConfig = () => {
    return {
      isLogin: useUserStore.getState().isLogin,
      userInfo: useUserStore.getState().userInfo,
      frameLayout: useUiLayoutStore.getState().frameLayout,
      inMobile: useUiLayoutStore.getState().inMobile,
      inWechat: useUiLayoutStore.getState().inWechat,
      token: tokenTool.get(),
      mobileStyle: useUiLayoutStore.getState().frameLayout === FRAME_LAYOUT_MOBILE,
    }
  }

  const registerControl = (type, control) => {
    console.log('shifu.registerControl', type, !!control)
    controls[type] = control;
  }

  const getControl = (type) => {
    return controls[type];
  }

  const hasControl = (type) => {
    return type in controls;
  }

  const registerChatInputActionControls = (type, control) => {
    chatInputActionControls[type] = control;
  }

  const getChatInputActionControls = (type) => {
    return chatInputActionControls[type];
  }

  const hasChatInputActionControls = (type) => {
    return type in chatInputActionControls;
  }

  const openLogin = () => {
    eventHandlers.dispatchEvent(new CustomEvent(EventTypes.OPEN_LOGIN_MODAL));
  }

  const stores = {
    useUserStore,
    useUiLayoutStore,
  }

  const installPlugin = (plugin) => {
    plugin.install({
      stores,
      getConfig,
      ControlTypes,
      EventTypes,
      events: eventHandlers,
      registerChatInputActionControls,
      registerControl,
      openLogin,
    })
  }

  return {
    stores,
    getConfig,
    ControlTypes,
    EventTypes,
    events: eventHandlers,
    registerChatInputActionControls,
    registerControl,
    installPlugin,
    getChatInputActionControls,
    hasChatInputActionControls,
    getControl,
    hasControl,
    openLogin,
  }
}

export const shifu = createShifu();
