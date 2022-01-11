import type { ElMessageBoxOptions } from 'element-plus';
import type { TranslateData } from 'lib/utils/core/translate';

/**
 * Element-plus ElMessageBox. Check docs for props:
 * [https://element-plus.org/#/en-US/component/message-box](https://element-plus.org/#/en-US/component/message-box)
 */
export interface MsgBox extends Omit<ElMessageBoxOptions, 'message'|'title'> {
  message: TranslateData,
  title: TranslateData,
}

/**
 * Element-plus ElMessage component invocation options:
 * [https://element-plus.org/#/en-US/component/message](https://element-plus.org/#/en-US/component/message)
 */
export interface Message {
  message: TranslateData,
  type: 'success' | 'warning' | 'info' | 'error',

  /** How long (in milliseconds) should the notification persist */
  duration?: number,

  /** Action to perform when notification is closed */
  onClose?: () => void,

  /** Treat message string as html or not */
  stringIsHtml?: boolean,

  /** Custom class of notification */
  class?: string,

  /** Show the close icon or not */
  showClose?: boolean,

  /** Whether to center align text content inside the notification */
  textAlignCenter?: boolean,
}

/**
 * Element-plus ElNotification component invocation options:
 * [https://element-plus.org/#/en-US/component/notification](https://element-plus.org/#/en-US/component/notification)
 */
export interface Notification {
  title: TranslateData,
  message: TranslateData,

  type: 'success' | 'warning' | 'info' | 'error',

  /** Notification position. Default is 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',

  /** How long (in milliseconds) should the notification persist. Default is 450 */
  duration?: number,

  /** Action to perform when notification is closed */
  onClose?: () => void,

  /** Callback that fires when notification is clicked */
  onClick?: () => void,

  /** Treat message string as html or not */
  stringIsHtml?: boolean,

  /** Custom class of notification */
  class?: string,

  /** Custom class of notification's icon */
  iconClass?: string,

  /** Show the close icon or not */
  showClose?: boolean,
}
