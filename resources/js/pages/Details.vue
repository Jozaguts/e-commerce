<template>
   <v-container>
       <v-row>
           <v-col cols="12">
                   <v-skeleton-loader
                       v-if="loading"
                       class="mx-auto"
                       tile
                       type=" card-heading,list-item-three-line, image, actions"
                   ></v-skeleton-loader>
                   <v-card
                   v-else
                   >
                       <v-card-title>
                           {{currentProduct.product_data.name}}
                       </v-card-title>
                       <v-card-text>
                           {{currentProduct.product_data.description}}
                       </v-card-text>
                       <v-img
                       :src="currentProduct.url"
                       max-height="300"
                       >
                       </v-img>
                       <v-card-actions>
                           <p><v-icon>
                               mdi-currency-usd
                           </v-icon>
                           {{currentProduct.product_data.price}}
                           </p>
                           <v-spacer />
                           <cart-btn :product="currentProduct.product_data" />
                       </v-card-actions>
                   </v-card>
           </v-col>
           <v-col cols="12" class="mt-5">
               <h2>Products list</h2>
           </v-col>
           <v-col  v-if="!loading" cols="12">
               <productsList/>
           </v-col>
       </v-row>
   </v-container>
</template>
<script>
import productsList from '../components/list-products'
import CartBtn from '../components/cart-btn'
export default {
    name: "ProductDetails",
    components:{productsList,CartBtn},
    data(){
        return {
            loading: true
        }
    },
    beforeMount() {
      this.init()
    },
    computed:{
       currentProduct(){
           return this.$store.getters['products/getCurrentProduct']
       }
    },
    methods: {
        init() {
            this.$store.dispatch('products/getProduct', this.$route.params.slug).then(()=>{
                this.loading = !this.loading
            })

        }
    }
}
</script>
<style>

</style>
