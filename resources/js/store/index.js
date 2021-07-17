import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './auth'
import products from './products'
import cart from './cart'
import users from './users'
import global from './global'
Vue.use(Vuex)
const cartState = createPersistedState()
const authState = createPersistedState({
    paths: ['auth','cart']
})
export default new Vuex.Store({
    modules: {
        auth,
        products,
        cart,
        users,
        global
    },
    plugins: [cartState,authState]
})
