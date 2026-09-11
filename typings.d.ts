import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  interface Window {
    $message: MessageInstance;
    $notification: NotificationInstance;
    $modal: Omit<ModalStaticFunctions, 'warn'>;
  }
}
