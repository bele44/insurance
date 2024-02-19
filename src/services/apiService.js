
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://///', 
   
});

export const get = (url, config = {}) => apiService.get(url, config);

export const post = (url, data = {}, config = {}) => apiService.post(url, data, config);



export default apiService;
