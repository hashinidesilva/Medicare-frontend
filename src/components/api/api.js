import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/medicare/v1',
});

api.interceptors.request.use(config => {
  const cityId = localStorage.getItem('city');
  if (cityId) {
    config.params = {...config.params, cityId};
  }
  return config;
});

export default api;