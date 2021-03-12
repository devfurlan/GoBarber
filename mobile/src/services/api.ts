import axios from 'axios';

const api = axios.create({
  // https://react-native.rocketseat.dev/erros/android-ios#error-network-error
  // baseURL: 'http://192.168.0.11:3333',// Dispositivo
  baseURL: 'http://10.0.2.2:3333',// Android Studio
});

export default api;
