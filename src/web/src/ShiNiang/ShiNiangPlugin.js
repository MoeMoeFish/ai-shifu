import { initShifu } from "./config/config.js"
import NonBlockPayControl from "./components/NonBlockPayControl.jsx"
import NavigatorTitleRightArea from "./components/NavigatorTitleRightArea.jsx"
import TrialNodeBottomArea from "./components/TrialNodeBottomArea.jsx";

export const shiNiangPlugin = {
  install: (shifu) => {
    console.log('install shiniang plugin')
    initShifu(shifu);
    shifu.registerChatInputActionControls('nonblock_order', NonBlockPayControl);
    shifu.registerControl(shifu.ControlTypes.NAVIGATOR_TITLE_RIGHT_AREA, NavigatorTitleRightArea);
    shifu.registerControl(shifu.ControlTypes.TRIAL_NODE_BOTTOM_AREA, TrialNodeBottomArea);
  }
}
