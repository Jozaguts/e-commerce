const global = {
    namespaced: true,
    state: {
        showMessage: false,
        message:'',
        alertType: 'success'
    },
    mutations: {
        MESSAGE_HANDLER(state, message) {
            if(message.errors) {
                let msg = undefined;
                for(let key in message.errors) {
                    if(message.errors.hasOwnProperty(key)){
                         [ msg ] = message.errors[key]
                    }
                }
                state.showMessage = !state.showMessage
                state.message = msg
                state.alertType = 'error'
            }else{
                state.showMessage = !state.showMessage
                state.message = message
                state.alertType = 'success'
            }
        },
        CLEAN_NOTIFICATION(state){
            state.showMessage = false
            state.message = ''
            state.alertType = 'success'
        }
    },
    actions: {},
    getters: {}
}
export default global
