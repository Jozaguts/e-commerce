require('./bootstrap');

import Vue from 'vue'

import vuetify from './plugins/vuetify'
import router from './router'
import App from "./App.vue";
import store from './store'
// creating a vue instance
const app = new Vue({
    el: '#app',
    vuetify,
    router,
    store,
    render:h =>h(App)
});
