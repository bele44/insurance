import { createRouter, createWebHistory } from 'vue-router';
import MyLogin from '../src/views/MyLogin.vue'
import PerPerson from '../src/views/PerPerson.vue';
import PerFamily from '../src/views/PerFamily.vue';
import CheckOutIndividual from '../src/views/CheckOutIndividual.vue';
import CheckOutFamily from '../src/views/CheckOutFamily.vue';
import MyHome from '../src/views/MyHome.vue';
const routes = [
 
  {path: '/login', name: 'MyLogin', component: MyLogin },
  { path: '/person', name: 'PerPerson', component: PerPerson },
  { path: '/family', name: 'PerFamily', component: PerFamily },
  { path: '/checkoutindividual', name: 'CheckOutIndividual', component: CheckOutIndividual },
  { path: '/checkoutfamily', name: 'CheckOutFamily', component: CheckOutFamily },
  { path: '/', name: 'MyHome', component: MyHome },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;