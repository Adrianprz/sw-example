import { RouteConfig } from 'vue-router';
import SWRouter from 'Project/routes/sw.vue';

import {
    routerObject,
    routerParamsInterface,
} from './sw.vm';

const routes: routerObject = {
    Categories: {
        component: () => import('Project/views/categories/categories.vue'),
        path: '/categories',
    },
    List: {
        component: () => import('Project/views/list/list.vue'),
        path: '/list',
    },
    Info: {
        component: () => import('Project/views/info/info.vue'),
        path: '/info',
    },
};

export default {
    path: '/',
    component: SWRouter,
    children: [
        {
            path: '',
            component: () => import('Project/views/categories/categories.vue'),
        } as RouteConfig,
        {
            path: '*',
            component: () => import('Project/views/categories/categories.vue'),
        } as RouteConfig,
        ...Object.keys(routes).map((routeKey: string) => {
            let route: routerParamsInterface = routes[routeKey];
            return {
                path: route.path,
                name: routeKey,
                component: route.component,
            } as RouteConfig;
        }),
    ] as RouteConfig[],
};
