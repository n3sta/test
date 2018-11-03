import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import App from './App'
import Auth from './Auth'

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'nav__link--active',
    routes: [
        {
            path: '/auth',
            name: 'Home',
            component: Auth,
            children: [
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('./views/Auth/Register')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('./views/Auth/Login')
                },
                {
                    path: '/profiler',
                    name: 'profiler',
                    component: () => import('./views/Auth/Profiler'),
                    beforeEnter: (to, from, next) => {
                        guard(to, from, next)
                    },
                },
            ]
        },
        {
            path: '/',
            name: 'App',
            component: App,
            children: [
                {
                    path: '/',
                    name: 'panel',
                    component: () => import('./views/Panel/Index'),
                },
                {
                    path: '/trainings',
                    name: 'admin',
                    component: () => import('./views/Trainings/Index'),
                },
                {
                    path: '/trainings/training',
                    name: 'addTraining',
                    component: () => import('./views/Trainings/Training'),
                },
                {
                    path: '/starts/start',
                    name: 'startForm',
                    component: () => import('./views/Panel/StartForm'),
                },
                {
                    path: '/trainingTypes',
                    name: 'trainingTypes',
                    component: () => import('./views/Trainings/trainingTypes'),
                },
                {
                    path: '/account',
                    name: 'account',
                    component: () => import('./views/Users/Account')
                },
                {
                    path: '/pupils',
                    name: 'pupils',
                    component: () => import('./views/Users/Pupils')
                },
                {
                    path: '/pupils/:userId',
                    name: 'pupil',
                    props: true,
                    component: () => import('./views/Users/Pupil')
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('./views/Users/Users')
                },
                {
                    path: '/questionnaire',
                    name: 'questions',
                    component: () => import('./views/Questions/Index')
                },
                {
                    path: '/questionnaire/form',
                    name: 'addQuestion',
                    props: true,
                    component: () => import('./views/Questions/addQuestion'),
                }
            ],
            beforeEnter: (to, from, next) => {
                guard(to, from, next)
            },
        },
        { path: "*", component: () => import('./views/Errors/E404') }
    ]
});

const guard = (to, from, next) => {
    if (store.getters.token) {
        next()
    } else {
        next('/login');
    }
};