import Loading from '@kyo/core/Loading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import _ from '@lodash';
import SignInConfig from '../pages/sign-in/SignInConfig';
import SignUpConfig from '../pages/sign-up/SignUpConfig';
import SignOutConfig from '../pages/sign-out/SignOutConfig';
import Error404Page from '../pages/404/Error404Page';

const setRoutes = (config, defaultAuth) => {
  let routes = [...config.routes];

  routes = routes.map((route) => {
    let auth = config.auth || config.auth === null ? config.auth : defaultAuth || null;
    auth = route.auth || route.auth === null ? route.auth : auth;
    const settings = _.merge({}, config.settings, route.settings);

    return {
      ...route,
      settings,
      auth,
    };
  });

  return [...routes];
};

const generateRoutesFromConfigs = (configs, defaultAuth) => {
  let allRoutes = [];
  configs.forEach((config) => {
    const generatedRoutes = setRoutes(config, defaultAuth);
    allRoutes = [...allRoutes, ...generatedRoutes];
  });
  return allRoutes;
};

const routeConfigs = [SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <Loading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
