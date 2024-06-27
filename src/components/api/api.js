import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/medicare/v1',
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