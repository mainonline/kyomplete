import i18n from '../../i18n';

const settingsConfig = {
  customScrollbars: true,
  direction: i18n.dir(i18n.options.lng) || 'ltr', // rtl, ltr

  defaultAuth: ['admin', 'user', 'quest'],

  loginRedirectUrl: '/',
};

export default settingsConfig;
