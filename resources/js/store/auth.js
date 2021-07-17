import router  from "../router";

const auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        token:'',
    },
    mutations: {
        SET_TOKEN(state,token) {
            state.token = token
        },
        AUTHENTICATED(state) {
            state.isAuthenticated = !state.isAuthenticated
        },
        DELETE_TOKEN(state) {
            state.token = undefined;
        }
    },
    actions: {
        async login({ commit , state, dispatch }, credentials) {
            try{
                let { data } =  await axios.post('/api/users/login',credentials)
                if( data.success ) {
                    commit('SET_TOKEN', data['access_token'])
                    commit('AUTHENTICATED')
                    commit('users/SET_CURRENT_USER',data.data,{root:true})
                      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data['access_token']
                    return true
                }
            }catch(error) {
                commit('global/MESSAGE_HANDLER', error.response.data.message,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
        async logout({commit}) {
            try{
             let response = await axios.post('/api/users/logout')
                 if(response)
                     if(response.data.success){
                         commit('DELETE_TOKEN')
                         commit('AUTHENTICATED')
                         window.localStorage.removeItem('currentUser')
                     }
                await  router.push({name:'home'})
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

    }
}
export default auth
