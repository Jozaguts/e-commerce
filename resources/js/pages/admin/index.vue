<template>
    <v-container>
        <v-row>
            <v-col>
                <v-navigation-drawer
                    app>
                    <v-list dense >
                        <v-subheader>Users</v-subheader>
                        <v-list-item-group
                            v-model="selectedItem"
                        >
                            <v-list-item
                                v-for="item in userActions"
                                :key="item.text"
                                :to="item.to"
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-navigation-drawer>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" class="offset-3">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UserFrom from './users/Form'
export default {
    name: "Admin",
    components:{ UserFrom },
    data() {
        return {
            selectedItem: 1,
            userActions: [
                { text: 'Users', icon: ' mdi-account', to:'/admin/users'},
                { text: 'Create', icon: 'mdi-account-multiple-plus', to:'/admin/users/create' },
            ],
        }
    },
    computed:{
        alert(){
            return this.$store.getters['user']
        }
    }
}
</script>
