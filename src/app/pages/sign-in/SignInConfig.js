import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.quest,
  routes: [
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;