<template>
    <!-- App.vue -->
    <v-app>
       <navigation-drawer />
        <v-app-bar
            color="white"
            app
            height="120px"
            extension-height="30"
            v-if="['home','checkout','details'].includes($route.name)"
        >
            <template v-slot:extension >
                <div class="d-flex col-12 justify-lg-end">
                    <v-chip
                        class="mb-2 text-uppercase"
                        open
                        color=" green lighten-4"
                        text-color="grey darken-3"
                        label
                        to="/login"
                    >
                        members login {{$router.name}}
                    </v-chip>
                </div>
            </template>
            <NavBar />
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <transition name="fade">
                <router-view></router-view>
                </transition>
                <v-snackbar
                    v-model="$store.state.cart.snackbar"
                    timeout="1000"
                    bottom
                    class="text-center"
                >
                    {{$store.state.cart.message}}
                </v-snackbar>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
import NavBar from './components/navbar.vue'
import NavigationDrawer from './components/navigation-drawer.vue'
export default {
    name: "App",
    components:{ NavBar, NavigationDrawer },
    data() {
        return{}
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
