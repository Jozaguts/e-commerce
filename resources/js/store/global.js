const global = {
    namespaced: true,
    state: {
        error:false,
        message:''
    },
    mutations: {
        SET_MESSAGE(state, message) {
            state.message = message
        },
        SET_ERROR_FLAG(state) {
            state.error = !state.error
        }
    },
    actions: {

    },
    getters: {

    }
}
export default global
