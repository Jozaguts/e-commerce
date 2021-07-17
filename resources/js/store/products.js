const products = {
    namespaced: true,
    state: {
        products: [],
        pagination: {},
        currentProduct:{},
    },
    mutations: {
        SET_PRODUCTS(state, products ) {
            state.products = products
        },
        SET_PAGINATION(state, paginator) {
            state.pagination = paginator
        },
        SET_CURRENT_PRODUCT(state, { product_data, url }){
            state.currentProduct ={ product_data, url }
        },
    },
    actions: {
        async getProducts( { commit }) {
            try {
             let { data } = await axios.get(`/api/products`)
                commit('SET_PRODUCTS', data.data)
                delete data.data
                commit('SET_PAGINATION', data)
            } catch (e) {
                console.error(e.message)
            }
        },
        async getProduct({commit},slug) {
            try{
                return await axios.get(`/api/products/${slug}`)
                    .then(({data})=>{
                     commit('SET_CURRENT_PRODUCT',{ product_data: data.product, url: data.public_url } )
                    })
            }catch (e) {
                console.error(e.message)
            }
        },
        async update({commit},product ) {
            try{
                let {data} = await axios.put(`/api/products/${product.slug}`, product )
                commit('global/MESSAGE_HANDLER',data.message,{ root: true })
            }catch (error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
        async delete({commit,dispatch},slug){
            try{
                let { data } = await axios.delete(`/api/products/${slug}`)
                commit('global/MESSAGE_HANDLER',data.message,{ root: true })
                dispatch('getProducts')
            }catch (error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        }

    },
    getters: {
        getProducts(state) {
            return state.products
        },
        getPagination(state){
            return state.pagination
        },
        getCurrentProduct(state){
          return state.currentProduct
        }
    //     getProductDetails: (state) => (slug) => {
    //         const products = Array.from(state.products.data).find(product => product.slug === slug)
    //         return products
    //     }
    }
}
export default products
