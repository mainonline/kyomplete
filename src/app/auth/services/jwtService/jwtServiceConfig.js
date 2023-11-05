const jwtServiceConfig = {
  signIn: 'auth/login',
  signUp: 'auth/register',
  refresh: 'auth/refresh-tokens',
  accessToken: 'auth/refresh-tokens',
  updateUser: 'users/:id',
  logout: 'auth/logout',
};

export default jwtServiceConfig;
