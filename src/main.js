// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// Initialize Firebase
let app;
const config = {
  apiKey: "AIzaSyCrSAEPkZvzZ2COWNdFCeBnw2yKkr2nKmg",
  authDomain: "vb18-288ff.firebaseapp.com",
  databaseURL: "https://vb18-288ff.firebaseio.com",
  projectId: "vb18-288ff",
  storageBucket: "vb18-288ff.appspot.com",
  messagingSenderId: "958361084699"
};
let firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.database();

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user)
  /* eslint-disable no-new */
  if (!app) {
    console.log('asd')
    new Vue({
      el: '#app',
      router,
      components: {App},
      template: '<App/>'
    })
  }
})

class FirebaseController {

  getMatches() {
    return db.ref('matches').once("value", function (res) {
      return res.val();
    }, function (err) {
      console.log(err)
    })
  }

  saveBet(matchId, bet) {
    const currentUserId = firebase.auth().currentUser.uid;
    return db.ref('bets/' + currentUserId + "/" + matchId).set(bet);
  }

  getFirebaseApp() {
    return firebaseApp;
  }

  getCurrentUserId(){
    return firebase.auth().currentUser.uid;
  }

  saveUser(){
    const currentUser = firebase.auth().currentUser;
    return db.ref('users/' + currentUser.uid).set({username : currentUser.displayName})
  }
}

export default FirebaseController;
