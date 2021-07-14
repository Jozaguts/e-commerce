import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

import Home from './pages/Home.vue'
import ProductDetails from './pages/Details.vue'
import Checkout from './pages/Checkout.vue'
import Admin from './pages/admin/index.vue'
// import Products from './views/Products.vue'
// import CheckOut from "./views/CheckOut.vue"
// import Error404 from './views/Errors/404.vue'
// import ProductDetails from './components/Products/Details'
import Login from './components/Auth/Login.vue'
import UsersTable from './pages/admin/users/Table.vue';
import UserForm from './pages/admin/users/Form.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home

        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/login',
            name: "login",
            component: Login,
            beforeEnter: (to, from, next) => {
                if (! store.state.auth.isAuthenticated) {
                    next();
                } else {
                    router.replace('/admin')
                }
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: 'users',
                    component: UsersTable,
                },
                {
                    path: 'users/create',
                    component: UserForm,
                    props: { isUpdate: false},
                },
                {
                    path: 'users/update/:id',
                    component: UserForm,
                    props: { isUpdate: true},
                },

            ],
            beforeEnter: (to, from, next) => {
                if (!store.state.auth.isAuthenticated) next({ name: 'login' })
                else next()
            }

        },
        {
            path: '/:slug',
            name: 'details',
            component: ProductDetails
        },


        // {
        //     path: '*',
        //     name: '404',
        //     component: Error404
        // }
    ]
})

export default router
