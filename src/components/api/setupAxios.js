import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

console.log('API BASE URL: ' + apiBaseUrl);

axios.defaults.baseURL = `${apiBaseUrl}/medicare/v1`;
axios.interceptors.request.use(config => {
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
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('city');
    sessionStorage.removeItem('auth');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return Promise.reject(error);
});