
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://157.175.203.69:8193/api/medicalinsurance', 
   
});

export const get = (url, config = {}) => apiService.get(url, config);

export const post = (url, data = {}, config = {}) => apiService.post(url, data, config);



export default apiService;
