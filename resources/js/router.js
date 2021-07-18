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
import UsersHome from './pages/admin/users/index.vue';
import UserCreateOrUpdate from './pages/admin/users/create-or-update.vue'
import ProductsCreateOrUpdate from './pages/admin/products/create-or-update.vue'
import ProductsHome from './pages/admin/products/index.vue'

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
                    component: UsersHome,
                },
                {
                    path: 'users/create',
                    component: UserCreateOrUpdate,
                    props: { isUpdate: false},
                },
                {
                    path: 'users/update/:id',
                    component: UserCreateOrUpdate,
                    props: { isUpdate: true},
                },
                {
                    path: 'products',
                    component: ProductsHome,
                },
                {
                    path: 'products/update/:slug',
                    component: ProductsCreateOrUpdate,
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
