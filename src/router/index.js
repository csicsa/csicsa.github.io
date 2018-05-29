import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from "@/components/Main"
import firebase from 'firebase'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: HelloWorld
    },
    {
      path: '/betting',
      name: 'Betting',
      component: Main,
      meta: {requiresAuth: true}
    }
  ],

})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    console.log('login')
    next('login');
  }
  else if (!requiresAuth && currentUser) {
    console.log('betting')

    next('betting');
  }
  else{
    next();
  }
})

export default router;

