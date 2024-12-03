import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import PostForm from '../components/PostForm.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/posts/:id', component: PostDetail },
  { path: '/create', component: PostForm },
  { path: '/edit/:id', component: PostForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
