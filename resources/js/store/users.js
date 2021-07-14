const users = {
    namespaced: true,
    state: {
       users: [],
        user: undefined
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        async getUsers({commit}) {
            await axios.get('/api/users').then( ( { data } ) =>{
                let { users } = data
                commit('SET_USERS',users)
            })
        },
        async getUser( { commit, rootState }, id,) {
            await axios.get(`/api/users/${id}`)
                .then( ( { data } ) => {
                    commit('SET_USER',data)
            })
        },
        async update({commit,dispatch, state},user) {
            return await axios.put(`/api/users/${state.user.id}`, user)
                .then(( { data } ) =>{
                    if(data.success) {
                        commit('SET_USER',data.user)
                        dispatch('getUsers')
                        return {
                            success: true,
                            alert: {
                                show: true,
                                message: data.message,
                                type: 'success',
                            }
                        }
                    }
            })
        },
        async create({commit}, user ) {
            return await axios.post('/api/users', user)
                .then( ( { data } ) => {
                    if(data.success) {
                        return {
                            success: true,
                            alert: {
                                show: true,
                                message: data.message,
                                type: 'success',
                            }
                        }
                    }
                })
                .catch( error => {
                    return {
                        success: false,
                        alert: {
                            show: true,
                            message:error.response.data.message,
                            type: 'error',
                        }
                    }
                })
        },
        async delete( {dispatch}, id){
            return await axios.delete(`/api/users/${id}`)
                .then( ( { data } ) => {
                    if(data.success) {
                        dispatch('getUsers')
                        return data
                    }
                })
                .catch( e => console.log(e.message))
        }
    },
    getters: {

    }
}
export default users
