import { combineReducers } from '@reduxjs/toolkit';
import kyo from './kyo';
import i18n from './i18nSlice';
import user from './userSlice';
import order from './orderSlice';
import orders from './ordersSlice';
import history from './historySlice';
import complex from './complexSlice';
import manager from './managerSlice';
import apartments from './apartmentsSlice';
import notification from './notificationSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    kyo,
    i18n,
    user,
    order,
    orders,
    history,
    complex,
    manager,
    apartments,
    notification,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
