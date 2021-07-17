const users = {
    namespaced: true,
    state: {
       users: [],
        user: undefined,
        currentUser: "" || localStorage.getItem('currentUser'),
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_USER(state, user) {
            state.user = user
        },
        SET_CURRENT_USER(state, user) {
            window.localStorage.setItem('currentUser',JSON.stringify(user))
            state.currentUser =  user
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
            try {
                let { data } = await axios.put(`/api/users/${state.user.id}`, user)
                if(data.success) {
                    commit('SET_USER',data.user)
                    await  dispatch('getUsers')
                    commit('global/MESSAGE_HANDLER',data.message,{ root: true })
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
                    let errorMessages = [];
                    for(let key in error.response.data.errors) {
                        console.log(error.response.data.errors[key])
                        errorMessages.push(JSON.stringify(error.response.data.errors[key][0]))
                    }
                    return {
                        success: false,
                        alert: {
                            show: true,
                            message: errorMessages[0],
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
        },
    },
}
export default users
