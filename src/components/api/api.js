import axios from 'axios';

const apiBaseUrl = window.config.apiBaseUrl;

const api = axios.create({
  baseURL: `${apiBaseUrl}/medicare/v1`,
});

api.interceptors.request.use(config => {

  const auth = JSON.parse(sessionStorage.getItem('auth'));
  if (auth) {
    const {username, password} = auth;
    const token = btoa(`${username}:${password}`);
    config.headers = {
      ...config.headers,
      'Authorization': `Basic ${token}`,
    };
  }
  const cityId = localStorage.getItem('city');
  if (cityId) {
    config.params = {...config.params, cityId};
  }
  return config;
});

export default api;