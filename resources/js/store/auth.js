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
                      window.localStorage.setItem('currentUser',JSON.stringify(data.data))
                      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data['access_token']
                    return true
                }
            }catch(error) {
                commit('global/SET_ERROR_FLAG',null, { root: true })
                commit('global/SET_MESSAGE',error.response.data.message,{ root: true })
                console.error(error.response.data.message)
            }
        },
        async logout({commit}) {

            return await axios.post('/api/users/logout')
                .then(response=>{
                    if(response.data.success){
                        commit('DELETE_TOKEN')
                        commit('AUTHENTICATED')
                        window.localStorage.removeItem('currentUser')
                    }
                })
                .then( async ()=> await   router.push({name:'home'}))
                .catch(error => error)
        }
    },
    getters: {

    }
}
export default auth
