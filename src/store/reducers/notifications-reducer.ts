import {NotificationAction, NotificationActionType} from '../../actions/notification';
import {NotificationState} from '../../types/types';

export const notificationsReducer = (state: NotificationState = [], action: NotificationAction): NotificationState => {
  switch (action.type) {
    case NotificationActionType.ADD_NOTIFICATION: {
      return [...state, ...action.payload];
    }

    case NotificationActionType.RESET_NOTIFICATIONS: {
      return [];
    }

    default:
      return state;
  }
};
