/* jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

import VueRouter from "vue-router";
import store from "./stores/global-store";
import Vuetify from "vuetify";
import Toasted from "vue-toasted";
import Vuelidate from "vuelidate";
import VueSocketIO from "vue-socket.io";
import moment from "moment";


Vue.config.productionTip = false;

Vue.prototype.$moment = moment;
Vue.use(VueRouter);
Vue.use(store);
Vue.use(Vuetify);
Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://127.0.0.1:8080'
}));
Vue.use(Vuelidate);

/* Components para users */
const users = Vue.component('users-component', () =>
    import('./components/users2')
);

/* Components para menu */
const menu = Vue.component('items-component', () =>
    import('./components/menu/menu.vue')
);

const login = Vue.component('login-component', () =>
    import('./components/login.vue')
);
const loginModal = Vue.component('login-modal', () =>
    import('./components/loginModal')
);
const logout = Vue.component('logout-component', () =>
    import('./components/logout.vue')
);
const footer = Vue.component('footer-component', () =>
    import('./components/footer.vue')
);

const home = () => import('./components/home');

/* Components para conta de utilizador */
const accountPage = Vue.component('account-page', () =>
    import('./components/account/accountPage.vue')
);
const setPassword = Vue.component(
    'set-password',
    require('./components/account/setAccountPassword.vue')
);
/* User profile options */
const editUser = Vue.component('edit-user', () =>
    import('./components/account/editUser.vue')
);
const changeUserPicture = Vue.component(
    'change-profile-picture',
    require('./components/account/changeUserPicture.vue')
);
const activateAccount = Vue.component('activate-account', () =>
    import('./components/activateAccount.vue')
);
const changePassword = Vue.component('change-password', () =>
    import('./components/account/changePassword1.vue')
);

/* Worker options */
const shiftOptions = Vue.component('shift-options', () =>
    import('./components/worker/shiftOptions.vue')
);
const tables = Vue.component('manage', () =>
    import('./components/manage/tables.vue')
);

// Orders
const orders = Vue.component('orders', () =>
    import('./components/orders/orders.vue')
);

//Nav
const userNav = Vue.component('user-nav', () =>
    import('./components/nav/user.vue')
);

const mainNav = Vue.component('main-nav', () =>
    import('./components/nav/mainNav.vue')
);

//Cashier Options
const invoices = Vue.component('invoices', () =>
    import('./components/invoices/invoices')
);

//Meals
const meals = Vue.component('meals', () => import("./components/meals/meal"));


//List of notifications
const notificationsList = Vue.component('notifications', () => import("./components/user/notificationList"))

const routes = [
    { path: '/', component: home, name: 'home' },
    { path: '/users', component: users, name: 'users' },
    { path: '/menu', component: menu, name: 'menu' },
    { path: '/login', component: login, name: 'login' },
    { path: '/logout', component: logout, name: 'logout' },
    { path: '/users/me', component: accountPage },
    { path: '/orders', component: orders, name: 'orders' },
    { path: '/account/activate', component: activateAccount, name: 'activate' },
    { path: '/account/changePassword', component: changePassword },
    { path: '/management/tables', component: tables, name: 'tables' },
    { path: '/invoices', component: invoices, name: 'invoices'},
    { path: "/meals", component: meals }
];

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active'
});

const toastedOptions = {
    duration: 3000,
    position: "top-center",
    className: "toasted-css",
    theme: "bubble",
    onClick: (e, toastObject) => {
        toastObject.goAway(0);
    },
    router
};

Vue.use(Toasted, toastedOptions);

router.beforeEach((to, from, next) => {
    if (
        to.name === "profile" ||
        to.name === "logout" ||
        to.name === "orders" ||
        to.name === "tables" ||
        to.name === "logout" ||
        to.name === "invoices"
    ) {
        if (!store.state.user) {
            next("/login");
            return;
        }
    }
    next();
});

Vue.filter("capitalize", function (value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});


const app = new Vue({
    el: '#app',
    router,
    store,
    data: {
        workingText: "",
        user: undefined,
        notifications: [],
    },
    methods: {
        getInformationFromLoggedUser() {
            //todo
            this.user = this.$store.state.user; //
            if (this.user === null) {
                axios.get("api/users");
            }
        }
    },
    created() {
        store.commit('loadTokenAndUserFromSession');
    },
    sockets: {
        connect() {
            console.log('Socket connected with ID: ' + this.$socket.id);

            // Join the global channel and the user.type channel
            /**
             * TODO: should only connect to websocket server if user is working
             * When user starts working join emit 'user_enter'
             *      This will add the user to the 'global' and 'user.type' channels
             * When user stops working, emit to user_exit
             *      This will remove the user from the 'global' and 'user.type' channel
             */


            /* if (store.state.user) {
                this.$socket.emit('user_enter', this.$store.state.user);
            }  */        
        },
        shift_started(dataFromServer) {
            console.log("start");
            this.$toasted.success("You started working", {
                icon: "info"
            });
            this.notifications.push(dataFromServer);
        },
        shift_ended(dataFromServer) {
            console.log("end");
            this.$toasted.error("You stopped working", {
                icon: "info"
            });
            this.notifications.push(dataFromServer);
        },
        user_blocked(message) {
            this.$toasted.error(message, {
                icon: "error"
            });

            store.commit('setBlock', true);

            this.$router.push('/menu');
        },
        user_unblocked(message) {
            this.$toasted.info(message, {
                icon: "info"
            });

            store.commit('setBlock', false);

            this.$router.push('/menu');
        },
        new_order(message) {
            /**
             * Show toast only to cooks (all)
             * Show link to orders (possibly highlighting order)
             */
            this.$toasted.info(message, {
                icon: "info",
                action: [
                    {
                        text: "OK",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                    {
                        text: "View orders",
                        push: {
                            name: "orders",
                            dontClose: true
                        }
                    }
                ]
            });
        },
        order_prepared(data) {
            /**
             * Show toast only to responsible waiter
             * Show link to orders (possibly highlighting order)
             */
            let message = data.message + ': ' + data.order.item + ' for table ' + data.order.table_number;
            this.$toasted.info(message , {
                    icon: 'info'
                }
            );
        },
        responsible_waiter_unavailable(message) {
            this.$toasted.show(message,
                {
                    icon: 'info'
                }
            );
        },
        finished_meal(message) {
            /**
             * Show toast only to cashiers (all)
             * Show link to meal invoice (possibly highlighting order)
             */
            this.$toasted.info(message, {
                icon: "info"
            });
        },
        message_to_managers(message, from) {
            /**
             * Show toast only to cashiers (all)
             * Show link to meal invoice (possibly highlighting order)
             */
            this.$toasted.info("Message from: " + from.name + " - " + message, {
                icon: "info"
            });
        },
        problems(dataFromServer) {
            this.$toasted.error(dataFromServer.name + ": " + dataFromServer.msg, {
                action: [
                    {
                        text: 'Go to',
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                            router.push(dataFromServer.where);
                        }
                    }
                ]
            });
            console.log("emitted");
            this.notifications.push(dataFromServer);
        },
        new_invoice() {
            this.$toasted.info("Meal finished. A new invoice was generated", {
                icon: "info"
            });
        }
    },
    mounted() {
        if (this.$store.state.user.shift_active == 1) {
            this.$socket.emit('user_enter', this.$store.state.user);
        }
    }
});

axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            if (!store.state.user) {
                // Clear token and redirect
                store.commit('clearUserAndToken');
                router.push({ name: 'home' });
                // window.location.replace(`${window.location.origin}/login`);
            }
        }
        return Promise.reject(error);
    },
);
