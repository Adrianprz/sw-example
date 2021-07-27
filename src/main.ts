import Vue from 'vue';
import App from 'Project/App.vue';
import router from './router';
import store from './store';

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#App', true);
