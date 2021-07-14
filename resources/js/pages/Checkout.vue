<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <h3>ITEMS IN YOUR CART</h3>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-center">
                                    Name
                                </th>
                                <th class="text-center">
                                    Price
                                </th>
                                <th class="text-center">
                                    Amount
                                </th>
                                <th class="text-center">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in cart"
                                :key="item.name"
                            >
                                <td class="text-center">{{ item.name || '' }}</td>
                                <td class="text-center">{{ item.price ||''}}</td>

                                <td class="text-center">
                                    <v-btn
                                    rounded
                                    x-small
                                    class="mr-2 text-subtitle-1"
                                    @click="$store.commit('cart/SUBTRACT_QUANTITY_PRODUCT',item)">
                                        -
                                    </v-btn> {{ item.amount || '0'}}
                                    <v-btn
                                        rounded
                                        x-small
                                        class="ml-2 text-subtitle-1"
                                        @click="$store.commit('cart/ADD_QUANTITY_PRODUCT',item)"> + </v-btn>
                                </td>
                                <td class="text-center">
                                    <v-btn text
                                    @click="productDelete(item)">
                                        <v-icon color="red"> mdi-trash-can</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

            </v-col>
            <v-col cols="6">
                <v-stepper
                    v-model="step"
                    vertical

                >
                    <v-stepper-step
                        :complete="step > 1"
                        step="1"
                        editable
                    >
                        BILLING INFORMATION
                        <small>name, email, address...</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-form ref="billing-form">
                            <v-container>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                        v-model="cartDraft.name"
                                        :rules="nameRules"
                                        label="Name"
                                        required
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="cartDraft.lastName"
                                            :rules="nameRules"
                                            label="Last Name"
                                            required
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="cartDraft.email"
                                            :rules="emailRules"
                                            label="E-mail"
                                            required
                                        >

                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn
                            color="primary"
                            @click="step = 2"
                        >
                            Continue
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-step
                        :complete="step > 2"
                        step="2"
                        editable
                    >
                        Payment Information
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <v-form ref="payment-form">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Credit Card"
                                        required
                                        :rules="creditRules"
                                        counter="16"
                                        v-model="cartDraft.card"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select
                                        :rules="nameRules"
                                        :items="months"
                                        v-model="cartDraft.expMonth"
                                        label="Exp. Month"
                                        required
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select
                                        :rules="nameRules"
                                        :items="years"
                                        v-model="cartDraft.expYear"
                                        label="Exp. Year"
                                        required
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="4">
                                      <v-text-field
                                      required
                                      :rules="nameRules"
                                      v-model="cartDraft.cvv"
                                      counter="3"
                                      >

                                      </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn
                            color="primary"
                            @click="pay"
                            :loading="loading"
                        >
                            Pay {{ getTotal}}
                        </v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
    name: "Checkout",
    data() {
        return {
            loading:false,
            months:[
                {text: '01-jan', value: '1',},  {text: '02-feb', value: '2',},  {text: '03-mar', value: '3',},
                {text: '04-apr', value: '4',},  {text: '05-may', value: '5',},  {text: '06-jun', value: '6',},
                {text: '07-jul', value: '7',},  {text: '08-agu', value: '8',},  {text: '09-sep', value: '9',},
                {text: '10-oct', value: '10',},  {text: '01-nov', value: '11',},  {text: '12-dec', value: '12',},
            ],
            years:[ {text: '2021', value: 2021}, {text: '2022', value: 2022}, {text: '2023', value: 2023}, {text: '2024', value: 2024},
                {text: '2025', value: 2025}, {text: '2026', value: 2026}, {text: '2027', value: 2027}, {text: '2028', value: 2028}],
            cartDraft:{
                name: '',
                lastName:'',
                email: '',
                expMonth:'',
                expYear:'',
                cvv:'',
                card:'',
                items:[]
            },
            step: 1,
            lastName: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            creditRules:[
                v => /^(0|[1-9][0-9]*)$/.test(v) || 'Credit Card must be only numbers',
                v =>(v && v.length === 16) || '16 numbers are required'
            ]
        }
    },
    computed:{
        cart() {
            return this.$store.state.cart.cart
        },
        getTotal(){
           let cart = this.cart
            return cart
                .reduce((acc, current) => {
                    return ( parseFloat(acc) + ( parseFloat(current.price) * current.amount) ).toFixed(2)
            },0)
        }
    },
    methods:{
        productDelete(product) {
           try {
            let productIndex = this.$store.state.cart.cart.indexOf(product)
           this.$store.commit('cart/REMOVE_PRODUCT',productIndex)
           }catch(e) {
               console.error(e.message)
           }

        },
         pay() {
            try{
                if( this.$refs["billing-form"].validate() && this.$refs["payment-form"].validate()){
                    this.loading = true
                     this.$store.dispatch('cart/resetCart')
                     this.$refs["billing-form"].reset()
                     this.$refs["payment-form"].reset()
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                }
            }catch(e){
                console.log(e.message)
            }finally{
                setTimeout(()=>{ this.loading = false},1000)
            }

        }
    }
}
</script>

<style scoped>

</style>
