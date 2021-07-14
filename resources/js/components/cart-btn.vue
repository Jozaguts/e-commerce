<template>
    <v-btn
        elevation="2"
        outlined
        tile
        x-large
        @click="addToCart(product)"
    >
        <v-icon>
            mdi-cart
        </v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "CartBtn",
    props: {
        product: {
            required:true,
            type: Object
        }
    },
    computed:{
        cart(){
            return this.$store.state.cart.cart
        }
    },
    methods: {
        addToCart(product) {
            try{
                let productExist = this.cart.find(item => item.id === product.id)
                if ( productExist) {
                    this.$store.commit('cart/ADD_QUANTITY_PRODUCT', product)
                }else {
                    this.$set(product, 'amount',1)
                    this.$store.commit('cart/SET_PRODUCT', product)
                }
            }catch (e){
                console.log(e.message)
            }finally {
                setTimeout(()=>{
                    this.$store.commit('cart/TOGGLE_SNACKBAR','ADDED PRODUCT')
                },300)
            }
        }
    }
}
</script>

<style scoped>

</style>
