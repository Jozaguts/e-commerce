<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-parallax
                    height="300"
                    class="text-center green lighten-5 "
                >
                    <h1 class="text-uppercase grey--text text--darken-2">My healthy store</h1>
                </v-parallax>
            </v-col>
            <v-col cols="12">
                <productList />
            </v-col>
        </v-row>
    </v-container>


</template>

<script>
import productList from '../components/list-products'
export default {
    name: "Home",
    components:{productList}
}
</script>

<style scoped>

</style>
