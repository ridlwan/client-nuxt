export const state = () => ({
    users: [],
    data: [],
    errors: []
})

export const mutations = {
    SET_USER_DATA(state, payload) {
        state.users = payload
    },
    SET_DATA(state, payload) {
        state.data = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    }
}

export const actions = {
    getUsersData({ commit }, payload ) {
        let search = payload ? payload : ''
        return new Promise((resolve) => {
            this.$axios.get(`/users?q=${search}`).then((response) => {
                commit('SET_USER_DATA', response.data)
                resolve()
            })
        })
    },
    storeUsersData({ dispatch, commit }, payload) {
        return new Promise((resolve) => {
            this.$axios.post('/users', payload).then(() => {
                dispatch('getUsersData')
                resolve()
            })
                .catch((error) => {
                    commit('SET_ERRORS', error.response.data)
                })
        })
    },
    getData({ commit }, payload) {
        return new Promise((resolve) => {
            this.$axios.get(`/users/${payload}`).then((response) => {
                commit('SET_DATA', response.data)
                resolve()
            })
        })
    },
    updateUserData({ dispatch, commit }, payload) {
        return new Promise((resolve) => {
            this.$axios.put(`/users/${payload.id}`, payload).then(() => {
                dispatch('getUsersData')
                resolve()
            })
                .catch((error) => {
                    commit('SET_ERRORS', error.response.data)
                })
        })
    },
    destroyUsersData({ dispatch, commit }, payload) {
        return new Promise((resolve) => {
            this.$axios.delete(`/users/${payload}`).then(() => {
                dispatch('getUsersData')
                resolve()
            })
                .catch((error) => {
                    commit('SET_ERRORS', error.response.data)
                })
        })
    },
}