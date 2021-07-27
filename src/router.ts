import Vue from 'vue';
import Router from 'vue-router';
import Routes from 'Project/routes/sw.router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
    routes: [Routes],
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

export default router;

