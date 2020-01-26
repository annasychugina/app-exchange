import {useEffect} from 'react';
import {useSnackbar} from 'notistack';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {resetNotifications} from '../../actions/notification';
import {GlobalState} from '../../types/types';

export const Notistack = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const notifications = useSelector((state: GlobalState) => state.notifications, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length > 0) {
      for (const {text, variant} of notifications) {
        enqueueSnackbar(text, {variant});
      }

      dispatch(resetNotifications());
    }
  }, [notifications, dispatch, closeSnackbar, enqueueSnackbar]);

  return null;
};
