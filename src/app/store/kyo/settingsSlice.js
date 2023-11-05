import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
  defaultSettings,
  defaultThemeOptions,
  extendThemeWithMixins,
  getParsedQuerySettings,
  mustHaveThemeOptions,
} from '@kyo/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import { setUser, updateUserSettings } from 'app/store/userSlice';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import instance from 'src/api';
import { showMessage } from './messageSlice';

function getInitialSettings() {
  const layout = {
    style: 'layout',
    config: {},
  };
  return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

export function generateSettings(_defaultSettings, _newSettings) {
  return _.merge({}, _defaultSettings, { layout: { config: {} } }, _newSettings);
}

const initialSettings = getInitialSettings();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
};

export const updateLayoutSettings = createAsyncThunk(
  'kyo/settings/updateLayoutSettings',
  async ({ id, settings }, { dispatch }) => {
    console.log('updateLayoutSettings', id, settings);
    dispatch(showMessage({ message: 'Saving Layout Settings' }));
    try {
      const response = await instance.patch(`layouts/${id}`, { settings });
      dispatch(showMessage({ message: 'Layout Settings Saved' }));
      return response.data.settings;
    } catch (error) {
      dispatch(showMessage({ message: 'Error Saving Layout Settings' }));
      return error;
    }
  }
);

export const setDefaultSettings = createAsyncThunk(
  'kyo/settings/setDefaultSettings',
  async (val, { getState }) => {
    const { kyo } = getState();
    const { settings } = kyo;

    const defaults = generateSettings(settings.defaults, val);

    return {
      ...settings,
      defaults: _.merge({}, defaults),
      current: _.merge({}, defaults),
    };
  }
);

export const setUserLayoutSettings = createAsyncThunk(
  'kyo/settings/setUserLayoutSettings',
  async (val, { dispatch, getState }) => {
    const { kyo } = getState();
    const { settings } = kyo;

    const userSettings = generateSettings(settings.defaults, val);

    const newSettings = {
      ...settings,
      defaults: _.merge({}, userSettings),
      current: _.merge({}, userSettings),
    };

    dispatch(updateUserSettings(newSettings));

    return newSettings;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      const current = generateSettings(state.defaults, action.payload);

      return {
        ...state,
        current,
      };
    },

    setInitialSettings: (state, action) => {
      return _.merge({}, initialState);
    },
    resetSettings: (state, action) => {
      return {
        ...state,
        defaults: _.merge({}, state.defaults),
        current: _.merge({}, state.defaults),
      };
    },
  },
  extraReducers: {
    [setUserLayoutSettings.fulfilled]: (state, action) => action.payload,
    [setDefaultSettings.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => {
      const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
      return {
        ...state,
        defaults: _.merge({}, defaults),
        current: _.merge({}, defaults),
      };
    },
  },
});

const getDirection = (state) => state.kyo.settings.current.direction;
const getMainTheme = (state) => state.kyo.settings.current.theme.main;

function generateMuiTheme(theme, direction) {
  const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions);
  const response = createTheme(
    _.merge({}, data, {
      mixins: extendThemeWithMixins(data),
      direction,
    })
  );
  return response;
}

export const selectContrastMainTheme = (bgColor) => {
  function isDark(color) {
    return getContrastRatio(color, '#ffffff') >= 3;
  }
  return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

function changeThemeMode(theme, mode) {
  const modes = {
    dark: {
      palette: {
        mode: 'dark',
        divider: 'rgba(241,245,249,.12)',
        background: {
          paper: '#1E2125',
          default: '#121212',
        },
        text: darkPaletteText,
      },
    },
    light: {
      palette: {
        mode: 'light',
        divider: '#e2e8f0',
        background: {
          paper: '#FFFFFF',
          default: '#F7F7F7',
        },
        text: lightPaletteText,
      },
    },
  };

  return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector(
  [getMainTheme, getDirection],
  (theme, direction, id) => generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector(
  [getMainTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector(
  [getMainTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const { setInitialSettings } = settingsSlice.actions;


export default settingsSlice.reducer;
