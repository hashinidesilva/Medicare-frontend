import api from '../components/api/api';
import {useNavigate} from 'react-router-dom';

const useApi = () => {
  const navigate = useNavigate();
  return async (config) => {
    try {
      return await api(config);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('city');
        sessionStorage.removeItem('auth');
        navigate('/login');
        throw new Error('Unauthorized');
      } else {
        throw error;
      }
    }
  };
};

export default useApi;