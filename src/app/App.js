import BrowserRouter from '@kyo/core/BrowserRouter';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUser } from 'app/store/userSlice';
import AppAuthorization from '@kyo/core/AppAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import { selectMainTheme } from 'app/store/kyo/settingsSlice';
import Layout from './app-layout/layout/Layout';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import KyoTheme from '@kyo/core/KyoTheme';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

const App = () => {
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <KyoTheme theme={mainTheme} direction={langDirection}>
        <AuthProvider>
          <BrowserRouter>
            <AppAuthorization
              userRole={user.role}
              loginRedirectUrl={settingsConfig.loginRedirectUrl}
            >
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                classes={{
                  containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                }}
              >
                <Layout />
              </SnackbarProvider>
            </AppAuthorization>
          </BrowserRouter>
        </AuthProvider>
      </KyoTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
