import {useEffect} from 'react';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {resetNotifications} from '../../actions/notification';
import {GlobalState} from '../../types/types';

const NotistackBase = ({enqueueSnackbar, closeSnackbar}: WithSnackbarProps) => {
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

export const Notistack = withSnackbar(NotistackBase);
