require('./bootstrap');
import Vue from 'vue'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = JSON.parse( localStorage.getItem('vuex'))
if (token?.auth?.token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token?.auth?.token
}
import vuetify from './plugins/vuetify'
import router from './router'
import App from "./App.vue";
import store from './store'

const app = new Vue({
    el: '#app',
    vuetify,
    router,
    store,
    render:h =>h(App)
});
