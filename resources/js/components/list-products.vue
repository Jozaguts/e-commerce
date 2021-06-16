<template>
    <v-container fluid>
        <v-row>
            <v-col
            cols="4"
            v-for="product in products" :key="product.id">

                <v-card
                    class="mx-auto my-12"
                    max-width="374"
                >
                    <v-img
                        height="250"
                        :src="getImage(product.media)"
                    ></v-img>

                <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-text>
                       {{product.description}}
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions>
                       <span>
                           <v-icon>
                               mdi-currency-usd
                           </v-icon>
                           {{product.price}}
                       </span>

                        <v-btn
                            text
                            class="ml-2"
                            :to="product.slug"
                        >
                            Details
                        </v-btn>
                        <v-spacer />
                        <v-btn
                            color="deep-green darken-2"
                            text
                        >
                          <v-icon color="green">
                              mdi-cart
                          </v-icon>
                        </v-btn>


                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="pagination.last_page"
                ></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "list-products",
    data () {
        return {
            page: 1,
        }
    },
    computed: {
        products() {
            return this.$store.getters['products/getProducts']
        },
        pagination(){
            return this.$store.getters['products/getPagination']
        }
    },
    methods: {
        getImage(media){

            return media[0]?.custom_properties.url
        },
        init() {
            return this.$store.dispatch('products/getProducts')
        },
        next(){
            console.log(this.pagination)
        }
    },
    watch:{
        page(value){
           this.next(value)
        }
    },
    beforeMount() {
        this.init()
    }
}
</script>

<style scoped>

</style>
