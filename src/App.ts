import { Component, Vue } from 'vue-property-decorator';
  
import BaseLayout from 'Project/components/common/baselayout/base.vue';
import Header from 'Project/components/common/header/header.vue';
import Star from 'Project/components/common/star/star.vue';
import Loader from 'Project/components/common/loader/loader.vue';

Vue.component('Header', Header);
Vue.component('BaseLayout', BaseLayout);
Vue.component('Star', Star);
Vue.component('Loader', Loader);

@Component
export default class App extends Vue { }
