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

Vue.use(VueRouter);
Vue.use(store);
Vue.use(Vuetify);

const users = Vue.component('users-component', require('./components/users2.vue'));
// @ Unused
//const userList = Vue.component('list-users', require('./components/userList.vue'));
const managerList = Vue.component('list-managers', require('./components/managerList.vue'));
const cookList = Vue.component('list-cooks', require('./components/cookList.vue'));
const waiterList = Vue.component('list-waiters', require('./components/waiterList.vue'));
const cashierList = Vue.component('list-cashiers', require('./components/cashierList.vue'));

const menu = Vue.component('items-component', require('./components/menu.vue'));
// @ Unused
//const menuList = Vue.component('list-menu', require('./components/menuList.vue'));
const dishList = Vue.component('list-dishes', require('./components/dishList.vue'));
const rinksList = Vue.component('list-drinks', require('./components/drinkList.vue'));

const login = Vue.component('login-component', require('./components/login.vue'));
const logout = Vue.component('logout-component', require('./components/logout.vue'));
const footer = Vue.component('footer-component', require('./components/footer'));

import Home from './components/home';

const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/users', component: users },
    { path: '/menu', component: menu },
    // { path: '/login', component: login },
    { path: '/logout', component: logout }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

const app = new Vue({
    // Elemento que o vue vai poder "gerir"
    el: '#app',
    router,
    data: {
    },
    store
});
