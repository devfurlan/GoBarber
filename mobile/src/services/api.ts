import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.11:3333',// Dispositivo
  baseURL: 'http://10.0.2.2:3333',// Android Studio
});

export default api;
