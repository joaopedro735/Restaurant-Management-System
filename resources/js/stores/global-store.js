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
    },
    mutations: {
        clearToken: (state) => {
            state.token = "";
            sessionStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        },
        setToken: (state, token) => {
            state.token= token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = "Bearer " + token;
        },
        clearUser: (state) => {
            state.user = null;
            sessionStorage.removeItem('user');
        },
       setUser: (state, user) => {
            state.user =  user;
            sessionStorage.setItem('user', JSON.stringify(user));
        },
    },
    plugins: [vuexLocal.plugin]
});