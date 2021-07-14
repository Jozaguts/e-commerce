const cart = {
    namespaced: true,
    state: {
       cart:[],
        snackbar: false,
        showCart:false,
        message:''
    },
    mutations: {
    SET_PRODUCT(state, item) {
        state.cart.push(item)
    },
    ADD_QUANTITY_PRODUCT(state,product) {
        state.cart.map(itemCart => {
            if (itemCart.id === product.id) {
                itemCart.amount++
            }
        })
    },
    SUBTRACT_QUANTITY_PRODUCT(state, product) {
    state.cart.map(itemCart => {
        if (itemCart.id === product.id && itemCart.amount > 0) {
            itemCart.amount--
        }
        else if(itemCart.amount === 0){
            let productIndex = state.cart.indexOf(product)
            state.cart.splice(productIndex,1)
        }
    })
    },
    REMOVE_PRODUCT(state, productIndex ) {
        state.cart.splice(productIndex,1)
    },
    TOGGLE_SNACKBAR(state, message){
        state.message = message
        state.snackbar = !state.snackbar

    },
    TOGGLE_SHOW_CART(state){
        state.showCart = !state.showCart
    },
    RESET_CART(state) {
        state.cart = []
    }
    },
    actions: {
    async resetCart({commit}) {
        try {
          return await setTimeout(async function () {
                await commit('RESET_CART')
            }, 1000)
        }catch (e) {
            console.error(e.message)
        }
    }
    },
    getters: {
        getCartSize(state) {
            return state.cart.length
        }
    }
}
export default cart
