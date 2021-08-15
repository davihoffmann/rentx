import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.3.8.47:3333' // UNIDAVI
  baseURL: 'http://192.168.0.109:3333' // BIANCA
  // baseURL: 'http://192.168.2.4:3333'
});

export default api;