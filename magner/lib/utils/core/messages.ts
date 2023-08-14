import {
  ElMessage, ElMessageBox, ElNotification, ElMessageBoxOptions,
} from 'element-plus';

import globalValues from '../../global';
import { customT } from './translate';
import type { MsgBox, Message, Notification } from '../../types/utils/messages';

export const magnerConfirm = (config: MsgBox) => ElMessageBox.confirm(
  customT(config.message, globalValues.t),
  customT(config.title, globalValues.t),
    config as ElMessageBoxOptions,
);

export const magnerAlert = (config: MsgBox) => ElMessageBox.alert(
  customT(config.message, globalValues.t),
  customT(config.title, globalValues.t),
    config as ElMessageBoxOptions,
);

export const magnerPrompt = (config: MsgBox) => ElMessageBox.prompt(
  customT(config.message, globalValues.t),
  customT(config.title, globalValues.t),
    config as ElMessageBoxOptions,
);

export const magnerMessage = (config: Message) => ElMessage({
  message: customT(config.message, globalValues.t),
  type: config.type,
  duration: config.duration,
  onClose: config.onClose,
  showClose: config.showClose,
  center: config.textAlignCenter,
  customClass: config.class,
  dangerouslyUseHTMLString: config.stringIsHtml,
});

export const magnerNotify = (config: Notification) => ElNotification({
  message: customT(config.message, globalValues.t),
  title: customT(config.title, globalValues.t),
  type: config.type,
  duration: config.duration,
  onClose: config.onClose,
  onClick: config.onClick,
  showClose: config.showClose,
  customClass: config.class,
  iconClass: config.iconClass,
  dangerouslyUseHTMLString: config.stringIsHtml,
});
