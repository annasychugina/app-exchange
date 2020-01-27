import {NotificationPayload} from '../types/types';

export enum NotificationActionType {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS',
}

export interface NotificationAction {
  payload: Array<NotificationPayload> | [];
  type: NotificationActionType;
}

export const addNotification = (payload: Array<NotificationPayload>): NotificationAction => {
  return {
    type: NotificationActionType.ADD_NOTIFICATION,
    payload,
  };
};

export const resetNotifications = (): NotificationAction => {
  return {
    type: NotificationActionType.RESET_NOTIFICATIONS,
    payload: [],
  };
};
