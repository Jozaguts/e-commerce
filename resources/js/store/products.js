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
        SET_CURRENT_PRODUCT(state, { product_data, media }){
            state.currentProduct ={ product_data, media }
        },
    },
    actions: {
        async getProducts( { commit }) {
            try {
             let { data } = await axios.get(`/api/products`)
                console.log( data.data)
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
                     commit('SET_CURRENT_PRODUCT',{ product_data: data.product, media: data.media } )
                    })
            }catch (e) {
                console.error(e.message)
            }
        },
        async update({commit}, {slug, product} ) {
            try{
                let {data} = await axios.post(`/api/products/${slug}`,  product,
                    {
                        '_method': 'PUT',
                        headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
                    }
                )
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
        },
        async create({commit, dispatch}, formData) {
            let { data } = await axios.post('/api/products',formData)

        },
        async updateStatus({commit}, {slug}){
            try{
                let { data } = await axios.patch(`/api/products/${slug}`)
                commit('global/MESSAGE_HANDLER',data.message,{ root: true })
            }catch(error){
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
