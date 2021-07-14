<template>
    <nav class="d-flex justify-lg-space-around align-center">
        <router-link  to="/">
            <v-img
                max-height="100px"
                max-width="100px"
                src="../assets/logo.jpg"
                class="logo"
            />
        </router-link>
        <ul class="d-flex">
            <li>
                <v-btn
                    x-large
                    text
                    color="primary"
                    class="align-center">
                    By category
                </v-btn>
                <v-btn
                    x-large
                    text
                    color="primary"
                    class="align-center">
                    All Products
                </v-btn>
                <v-btn
                    x-large
                    text
                    color="primary"
                    class="align-center">
                    Contact
                </v-btn>
                <v-btn
                    x-large
                    text
                    color="primary"
                    class="align-center">
                    Blog
                </v-btn>
                <v-btn
                    x-large
                    text
                    color="primary"
                    @click="showCart"
                    class="align-center"
                >
                    <v-badge
                        color="green"
                        overlap
                        :value="cartSize"
                        :content="cartSize"

                    >
                    <v-icon
                        large
                    >
                        mdi-cart
                    </v-icon>
                    </v-badge>
                </v-btn>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    computed:{
        cartSize() {
            return this.$store.getters['cart/getCartSize']
        }
    },
    methods:{
        showCart(){
            try{
                this.$store.commit('cart/TOGGLE_SHOW_CART')
            }catch (e) {
                console.error(e.message)
            }
        }
    }
}
</script>

<style scoped>
nav{
    width: 100%;
}
ul{
    list-style: none;
}
</style>
