/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Importar o vue-router
 * É necessário instalar o vue-router primeiro (npm install vue-router --save)
 */
import VueRouter from 'vue-router';
import store from './stores/global-store';
import Vuetify from 'vuetify';
import Toasted from 'vue-toasted';

Vue.use(VueRouter);
Vue.use(store);
Vue.use(Vuetify);
Vue.use(Toasted);

/* Components para users */
//const users = Vue.component('users-component', require('./components/users.vue'));
const users = Vue.component('users-component',() => import(/* webpackChunkName: "users" */'./components/users2'));
// @ Unused
//const userList = Vue.component('list-users', require('./components/userList.vue'));
const managerList = () => Vue.component('list-managers', () => import(/* webpackChunkName: "list-managers" */'./components/user/managerList.vue'));
const cookList = Vue.component('list-cooks', () => import('./components/user/cookList.vue'));
const waiterList = Vue.component('list-waiters', () => import('./components/user/waiterList.vue'));
const cashierList = Vue.component('list-cashiers', () => import('./components/user/cashierList.vue'));

/* Components para menu */
const menu = Vue.component('items-component', require('./components/menu.vue'));
// @ Unused
//const menuList = Vue.component('list-menu', require('./components/menuList.vue'));
const dishList = Vue.component('list-dishes', () => import('./components/menu/dishList.vue'));
const drinksList = Vue.component('list-drinks', () => import('./components/menu/drinkList.vue'));


const login = Vue.component('login-component', () => import(/* webpackChunkName: "login-component"*/'./components/login.vue'));
const logout = Vue.component('logout-component', () => import(/* webpackChunkName: "logout"*/'./components/logout.vue'));
const footer = Vue.component('footer-component', () => import(/* webpackChunkName: "footer"*/'./components/footer.vue'));

const home = () =>import('./components/home');

/* Components para conta de utilizador */
const accountPage = Vue.component('account-page', require('./components/account/accountPage.vue'));
const setPassword = Vue.component('set-password', require('./components/account/setAccountPassword.vue'));
/* User profile options */
const changePassword = Vue.component('change-password', require('./components/account/changePassword.vue'));
const changeUserNameAndFullName = Vue.component('edit-user', require('./components/account/changeUserNameAndFullName.vue'));
const changeUserPicture = Vue.component('change-profile-picture', require('./components/account/changeUserPicture.vue'));
const activateAccount = Vue.component('activate-account', () => import('./components/activateAccount.vue'));


/* Worker options */
const shiftOptions = Vue.component('shift-options', () => import('./components/worker/shiftOptions.vue'));

// Orders
const orders = Vue.component('orders', () => import('./components/orders.vue'));

const routes = [
    { path: '/', component: home, name: 'home'},
    // { path: '/', redirect: '/menu' },
    { path: '/users', component: users },
    { path: '/menu', component: menu },
    // { path: '/login', component: login },
    { path: '/logout', component: logout },
    { path: '/account', component: accountPage },
    // Orders
    { path: '/orders', component: orders },
    //{ path: '/account', component: accountPage },
    { path: '/account/activate', component: activateAccount, name: 'activate'}
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if ((to.name == 'profile') || (to.name == 'logout')) {
        if (!store.state.user) {
            next("/login");
            return;
        }
    }
    next();
});

const app = new Vue({
    // Elemento que o vue vai poder "gerir"
    el: '#app',
    router,
    store,
    data: {
    },
});
