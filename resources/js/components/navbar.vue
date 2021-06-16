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
                    class="align-center">
                  <v-icon>
                      mdi-cart
                  </v-icon>
                </v-btn>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "navbar"
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
