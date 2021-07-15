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
        async login({ commit , state }, credentials) {
         return await axios.post('/api/users/login',credentials)
             .then(async ({data}) =>{
                 if(data.access_token) {
                     return new Promise((resolve) =>{
                          commit('SET_TOKEN', data.access_token)
                          commit('AUTHENTICATED')
                         window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
                         resolve('success');
                     })
                 }
             })
             .then( async ()=> await router.push('/admin'))
             .catch(error => error)
        },
        async logout({commit, dispatch}) {

            return await axios.post('/api/users/logout')
                .then(response=>{
                    if(response.data.success){
                        commit('DELETE_TOKEN')
                        commit('AUTHENTICATED')
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
