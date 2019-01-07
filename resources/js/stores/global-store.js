import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        token: "",
        user: null
    },
    mutations: {
        clearToken: (state) => {
            state.token = "";
            localStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        },
        setToken: (state, token) => {
            state.token= token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = "Bearer " + token;
        },
        clearUserAndToken: (state) => {
            state.user = null;
            state.token = "";
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, user) => {
            state.user =  user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setBlock: (state, isBlocked) => {
            state.user.blocked = isBlocked;
            sessionStorage.setItem('user', JSON.stringify(state.user));
        },
        loadTokenAndUserFromSession: (state) => {
            state.token = "";
            state.user = null;
            let token = localStorage.getItem('token');
            let user = localStorage.getItem('user');
            if (token) {
                state.token = token;
                axios.defaults.headers.common.Authorization = "Bearer " + token;
            }
            if (user) {
                state.user = JSON.parse(user);
            }
        },
        setDuration: (state, duration) => {
            console.log(user);
            state.duration =  duration;
            sessionStorage.setItem('duration', JSON.stringify(duration));
        },
        clearDuration: (state) => {
            state.duration = null;
            sessionStorage.removeItem('duration');
        },
    },
    plugins: [vuexLocal.plugin]
});
