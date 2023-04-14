import {Platform} from 'react-native';
import {apiVersion, siteUrl} from '../constants';

import VersionInfo from 'react-native-version-info';
import {getModel} from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
  baseURL: siteUrl + '/api/',
});

instance.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    let buyerType = await AsyncStorage.getItem('buyerType');
    if (token) {
      config.headers!['Authorization'] = 'Bearer ' + token;
    }
    config.headers!.Version = VersionInfo.appVersion;
    config.headers!.Person = buyerType === 'c' ? 'true' : 'false';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: any) => {
    if (
      response.headers['token-expired'] == 'true' &&
      response.config.url !== 'users/auth'
    ) {
      const login = await AsyncStorage.getItem('login');
      const password = await AsyncStorage.getItem('password');
      let buyerType = await AsyncStorage.getItem('buyerType');

      return auth
        .login(login!, password!)
        .then((res: any) => {
          // New request with new token
          const config = response.config;
          AsyncStorage.setItem('token', res.data.token);
          config.headers!['Authorization'] = 'Bearer ' + res.data.token;
          config.headers!.Version = VersionInfo.appVersion;
          config.headers!.Person = buyerType === 'c' ? 'true' : 'false';

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(error => {
          AsyncStorage.removeItem('token');
          return Promise.reject(error);
        });
    }
    return response;
  },
  async (error: any) => {
    if (
      error.response.headers['token-expired'] == 'true' &&
      error.response.config.url !== 'users/auth'
    ) {
      console.log('token-expired');
      const login = await AsyncStorage.getItem('login');
      const password = await AsyncStorage.getItem('password');
      let buyerType = await AsyncStorage.getItem('buyerType');
      // Try request again with new token
      return auth
        .login(login!, password!)
        .then((res: any) => {
          // New request with new token
          const config = error.config;
          AsyncStorage.setItem('token', res.data.token);
          config.headers['Authorization'] = 'Bearer ' + res.data.token;
          config.headers!.Version = VersionInfo.appVersion;
          config.headers!.Person = buyerType === 'c' ? 'true' : 'false';

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(error => {
          AsyncStorage.removeItem('token');
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  },
);

export const auth = {
  login(login: string, psw: string) {
    return instance
      .post('users/auth', {
        login: login,
        psw: psw,
        type: Platform.OS,
        model: getModel(),
      })
      .then(async (res: any) => {
        await AsyncStorage.setItem('login', login);
        await AsyncStorage.setItem('password', psw);
        await AsyncStorage.setItem('token', res.data.token);
        return true;
      })
      .catch(err => {
        return false;
      });
  },

  unloguot() {},
};

export const getClientObjects = (tbl: string) => {
  return instance
    .get('client' + apiVersion + '/object/' + tbl)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getPhoneVerify = (phone: string, code: string, type: string) => {
  return instance
    .post('users/' + type + '/verify', {
      phone: phone,
      code: code,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const loginCheck = (login: string) => {
  return instance
    .post('users/valid', {
      login: login,
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

export const getSMS = (phone: string, type: string) => {
  return instance
    .get('users/' + type + '/' + phone)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const userRegister = (
  login: string,
  psw: string | undefined,
  name: string | undefined,
  email: string | null | undefined,
  oktmo: string,
) => {
  return instance
    .post('users/signup', {
      login: login,
      psw: psw,
      name: name,
      email: email,
      oktmo: oktmo,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const forgotPassword = (login: string, psw: string, code: string) => {
  return instance
    .post('users/forgot', {
      login: login,
      psw: psw,
      code: code,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getClient = (json: any) => {
  return instance
    .post('client' + apiVersion, json)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
};

export const getShopsContract = (cmd: string, supplier: string) => {
  return instance
    .post('clientv7/contract', {
      cmd: cmd,
      supplier: supplier,
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

export const getShopsInfo = (cmd: string, supplier: string) => {
  return instance
    .post('clientv7', {
      cmd: cmd,
      supplier: supplier,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
};

export const getCategoriesInfo = (
  cmd: string,
  shop: string,
  supplier: string,
) => {
  return instance
    .post('clientv7', {
      cmd: cmd,
      shop: shop,
      supplier: supplier,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
};

export const getProductsInfo = (
  cmd: string,
  category: string,
  shop: string,
  supplier: string,
) => {
  return instance
    .post('clientv7', {
      cmd: cmd,
      shop: shop,
      category: category,
      supplier: supplier,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
};
