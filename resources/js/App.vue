<template>
    <!-- App.vue -->
    <v-app>

        <v-app-bar
            color="white"
            app
            height="120px"
            extension-height="30"
        >
            <template v-slot:extension >
                <div class="d-flex col-12 justify-lg-end">
                    <v-chip
                        class="mb-2 text-uppercase"
                        open
                        color=" green lighten-4"
                        text-color="grey darken-3"
                        label
                    >
                        members login
                    </v-chip>
                </div>
            </template>
            <navbar />
            <!-- -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <transition name="fade">

                <router-view></router-view>
                </transition>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
import navbar from './components/navbar.vue'
export default {
    name: "App",
    components:{ navbar },
    data(){
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
