import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://192.168.1.254/';

// Axios를 전역에서 사용할 수 있도록 등록
createApp(App)
  .use(router)
  .mount('#app');
