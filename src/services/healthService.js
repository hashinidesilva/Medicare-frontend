import axios from 'axios';

export const checkHealth = async () => {
  try {
    const response = await axios.get('/health');
    await response.data;
  } catch (error) {
    console.error('Error fetching health check:', error);
  }
};