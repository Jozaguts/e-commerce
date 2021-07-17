const users = {
    namespaced: true,
    state: {
       users: [],
        user: undefined,
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
        SET_USER(state, user) {
            state.user = user
        },
    },
    actions: {
        async getUsers({commit}) {
            try{
                let { data:{ data} } = await axios.get('/api/users')
               commit('SET_USERS',data)
            }catch(error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
        async getUser( { commit, rootState }, id,) {
           let { data: { data } } = await axios.get(`/api/users/${id}`)
            commit('SET_USER',data)
        },
        async update({commit,dispatch, state},user) {
            try {
                let { data } = await axios.put(`/api/users/${state.user.id}`, user)
                if(data.success) {
                    commit('SET_USER',data.data)
                    await  dispatch('getUsers')
                    commit('global/MESSAGE_HANDLER',data.message,{ root: true })
                    return { success: true }
                }
            }catch(error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
        async create({commit,dispatch}, user ) {
            try{
              let {data}  =  await axios.post('/api/users', user)
                if(data.success) {
                    await  dispatch('getUsers')
                    commit('global/MESSAGE_HANDLER',data.message,{ root: true })
                    return { success: true }
                }
            }catch(error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
        async delete( {dispatch,commit}, id){
            try{
                let {data} =  await axios.delete(`/api/users/${id}`)
                commit('global/MESSAGE_HANDLER',data.message,{ root: true })
                await dispatch('getUsers')
            }catch(error){
                commit('global/MESSAGE_HANDLER',error.response.data,{ root: true })
                console.error(error.response.data.message)
            }finally{
                setTimeout(()=>{
                    commit('global/CLEAN_NOTIFICATION', null,{ root: true })
                },2000)
            }
        },
    },
    getters:{}
}
export default users
