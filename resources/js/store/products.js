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
                await axios.get(`/api/products`)
                    .then(({data}) => {
                        commit('SET_PRODUCTS', data.data)
                        delete data.data
                        commit('SET_PAGINATION', data)
                    })
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
        }
        // async productCreate({commit, dispatch, rootState}, userData) {
        //     commit('global/TOGGLE_LOADING', null, {root: true})
        //     try {
        //         await axios.post('/api/products/store', userData, {
        //             headers: {
        //                 Authorization: "Bearer " + rootState.auth.access_token,
        //             }
        //         })
        //             .then(response => {
        //                 commit('SET_PRODUCTS', response.data.data)
        //                 dispatch('global/setAndClearAlert', {
        //                     type: 'success',
        //                     messages: ['Product was created successfully']
        //                 }, {root: true});
        //             })
        //     } catch (error) {
        //         let alertMessages = [];
        //         for (const key in error.response.data.errors) {
        //             if (error.response.data.errors.hasOwnProperty(key)) {
        //                 alertMessages.push(error.response.data.errors[key][0]);
        //             }
        //         }
        //         dispatch('global/setAndClearAlert', {
        //             type: 'error',
        //             messages: alertMessages
        //         }, {root: true});
        //     } finally {
        //         commit('global/TOGGLE_LOADING', null, {root: true})
        //     }
        // },
        // async productEdit({commit, dispatch, rootState}, {data,id}) {
        //     try {
        //         await axios.post(`/api/products/update/${id}`, data,{
        //             headers: {
        //                 Authorization: "Bearer " + rootState.auth.access_token,
        //             },
        //         })
        //             .then(response => {
        //                 commit('SET_PRODUCTS', response.data.data)
        //                 dispatch('global/setAndClearAlert', {
        //                     type: 'success',
        //                     messages: ['Product was updated successfully']
        //                 }, {root: true});
        //             })
        //     } catch (error) {
        //         let alertMessages = [];
        //         for (const key in error.response.data.errors) {
        //             if (error.response.data.errors.hasOwnProperty(key)) {
        //                 alertMessages.push(error.response.data.errors[key][0]);
        //             }
        //         }
        //         dispatch('global/setAndClearAlert', {
        //             type: 'error',
        //             messages: alertMessages
        //         }, {root: true});
        //     }
        // },
        // async productDelete({commit, dispatch, rootState}, userData) {
        //     try {
        //         await axios.delete(`/api/products/delete/${userData.id}`, {
        //             headers: {Authorization: "Bearer " + rootState.auth.access_token}
        //         })
        //             .then(response => {
        //                 commit('SET_PRODUCTS', response.data.data)
        //                 dispatch('global/setAndClearAlert', {
        //                     type: 'success',
        //                     messages: ['Product was deleted successfully']
        //                 }, {root: true});
        //             })
        //     } catch (error) {
        //         let alertMessages = [];
        //         for (const key in error.response.data.errors) {
        //             if (error.response.data.errors.hasOwnProperty(key)) {
        //                 alertMessages.push(error.response.data.errors[key][0]);
        //             }
        //         }
        //         dispatch('global/setAndClearAlert', {
        //             type: 'error',
        //             messages: alertMessages
        //         }, {root: true});
        //     }
        // },
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
