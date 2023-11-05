import jwtDecode from 'jwt-decode';
import instance from 'src/api';
import Cookies from 'js-cookie';
import EventEmitter from '@kyo/utils';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    instance.interceptors.request.use(
      async (config) => {
        const accessToken = this.getAccessToken();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            console.warn('JWT Refresh Token not found, logging out...');
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  registerUser = (data) => {
    return new Promise((resolve, reject) => {
      instance.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data) {
          this.setSession(response.data.tokens.access.token, response.data.tokens.refresh.token);
          this.emit('onLogin', { ...response.data.user, ...response.data.layout });
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (emailOrLogin, password) => {
    return new Promise((resolve, reject) => {
      instance
        .post(jwtServiceConfig.signIn, {
          emailOrLogin,
          password,
        })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.tokens.access.token, response.data.tokens.refresh.token);
            this.emit('onLogin', { ...response.data.user, ...response.data.layout });
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    const refreshToken = this.getRefreshToken();
    return new Promise((resolve, reject) => {
      instance
        .post(jwtServiceConfig.accessToken, { refreshToken })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.tokens.access.token, response.data.tokens.refresh.token);
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return instance.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (accessToken, refreshToken = 1) => {
    if (accessToken) {
      Cookies.set('accessToken', accessToken);
      instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      if (refreshToken !== 1) {
        Cookies.set('refreshToken', refreshToken);
      }
    } else {
      Cookies.remove('accessToken', accessToken);
      Cookies.remove('refreshToken', refreshToken);
      delete instance.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    const refreshToken = this.getRefreshToken();
    return new Promise((resolve, reject) => {
      instance
        .post(jwtServiceConfig.logout, { refreshToken })
        .then((response) => {
          this.setSession(null);
          this.emit('onLogout', 'Logged out');
          resolve(response);
        })
        .catch((error) => {
          this.setSession(null);
          this.emit('onLogout', 'Logged out');
          reject(error);
        });
    });
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return Cookies.get('accessToken');
  };

  getRefreshToken = () => {
    return Cookies.get('refreshToken');
  };
}

const instances = new JwtService();

export default instances;
