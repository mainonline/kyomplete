const jwtServiceConfig = {
  signIn: 'auth/login',
  signUp: 'auth/register',
  refresh: 'auth/refresh-tokens',
  accessToken: 'auth/refresh-tokens',
  updateUser: 'users/:id',
  logout: 'auth/logout',
  verify: 'auth/verify-email',
};

export default jwtServiceConfig;
