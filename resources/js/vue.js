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
Vue.use(VueRouter);

import store from './stores/global-store';

/* Components para users */
const users = Vue.component('users-component', require('./components/users.vue'));
// @ Unused
//const userList = Vue.component('list-users', require('./components/userList.vue'));
const managerList = Vue.component('list-managers', require('./components/user/managerList.vue'));
const cookList = Vue.component('list-cooks', require('./components/user/cookList.vue'));
const waiterList = Vue.component('list-waiters', require('./components/user/waiterList.vue'));
const cashierList = Vue.component('list-cashiers', require('./components/user/cashierList.vue'));

/* Components para menu */
const menu = Vue.component('items-component', require('./components/menu.vue'));
// @ Unused
//const menuList = Vue.component('list-menu', require('./components/menuList.vue'));
const dishList = Vue.component('list-dishes', require('./components/menu/dishList.vue'));
const drinksList = Vue.component('list-drinks', require('./components/menu/drinkList.vue'));


const login = Vue.component('login-component', require('./components/login.vue'));
const logout = Vue.component('logout-component', require('./components/logout.vue'));

/* Components para conta de utilizador */
const accountPage = Vue.component('account-page', require('./components/account/accountPage.vue'));
const setPassword = Vue.component('set-password', require('./components/account/setAccountPassword.vue'));
/* User profile options */
const changePassword = Vue.component('change-password', require('./components/account/changePassword.vue'));
const changeUserNameAndFullName = Vue.component('edit-user', require('./components/account/changeUserNameAndFullName.vue'));
const changeUserPicture = Vue.component('change-profile-picture', require('./components/account/changeUserPicture.vue'));

const routes = [
    { path: '/', redirect: '/menu' },
    { path: '/menu', component: menu },
    { path: '/users', component: users },
    { path: '/login', component: login },
    { path: '/logout', component: logout },
    { path: '/account', component: accountPage }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    // Elemento que o vue vai poder "gerir"
    el: '#app',
    router,
    store,
    data: {
        userToken: undefined,
        isUserAuthenticated: false
    },
    methods: {
        // ----------------------------------------------------------------------------------------
        // GAME LOGIC - START
        // ----------------------------------------------------------------------------------------
        checkUserToken: function () {
            if (this.$store.state.token != undefined) {
                this.userToken = this.$store.state.token;
                this.isUserAuthenticated = true;
            }
        }
    },
});
