import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import settings from './settingsSlice';

const appReducers = combineReducers({
  settings,
  message,
  dialog,
});

export default appReducers;
