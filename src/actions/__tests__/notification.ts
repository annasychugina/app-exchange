import {mockStore} from '../../utils/testUtils';

import {addNotification, NotificationActionType, resetNotifications} from '../notification';

describe('notification actions', () => {
  it('addNotification', () => {
    const store = mockStore({rates: {}, userBalance: {}, notifications: []});

    store.dispatch(addNotification([{text: 'TEST!', variant: 'success'}]));
    expect(store.getActions()).toEqual([
      {
        payload: [{text: 'TEST!', variant: 'success'}],
        type: NotificationActionType.ADD_NOTIFICATION,
      },
    ]);
  });

  it('resetNotifications', () => {
    const store = mockStore({rates: {}, userBalance: {}, notifications: []});

    store.dispatch(resetNotifications());
    expect(store.getActions()).toEqual([
      {
        payload: [],
        type: NotificationActionType.RESET_NOTIFICATIONS,
      },
    ]);
  });
});
