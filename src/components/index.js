import { createRouter, createWebHistory } from 'vue-router';
import BooksView from '../views/BooksView.vue';
import AuthorsView from '../views/AuthorsView.vue';
import PublishersView from '../views/PublishersView.vue';
const routes = [
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView,
  },
  {
    path: '/publishers',
    name: 'publishers',
    component: PublishersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
