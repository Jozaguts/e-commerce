<template>
    <v-navigation-drawer
        right
        :permanent="test"
        :value="isDrawerActive"
        app>
        <v-simple-table>
            <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Price
                </th>
                <th class="text-left">
                    Amount
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in cart"
                :key="item.name"
            >
                <td>{{ item.name ||'' }}</td>
                <td>{{ item.price || ''}}</td>
                <td>{{ item.amount || ''}}</td>
            </tr>
            </tbody>
        </template>
        </v-simple-table>
        <v-btn
            block
            color="green darken-4"
            @click="checkout"
            bottom
            class="white--text"
        >{{ btnText }}</v-btn>
    </v-navigation-drawer>
</template>
<script>
export default{
    name: "navigation-drawer",
    data(){
        return{
            test:false
        }
    },
    computed:{
        btnText(){
          return this.$store.getters['cart/getCartSize'] ? 'Checkout' : 'Close'
        },
        cart(){
            return this.$store.state.cart.cart
        },
        showCart(){
            return this.$store.state.cart.showCart
        },
        isDrawerActive() {
         return this.$store.state.cart.showCart
        }
    },
    methods:{
        checkout() {
            try{
                this.toggleDrawer()
                if (this.btnText === 'Checkout'){
                    this.$router.push('/checkout')
                }
            }catch(e){
                console.error(e.message)
            }
        },
        toggleDrawer(){
          this.$store.commit('cart/TOGGLE_SHOW_CART')
        }
    }

}
</script>
