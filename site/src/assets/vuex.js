import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

// state
const state = {
    poast: { dires: [], covers: [], files: [] }
}

// getters
const getters = {
    getAllAlbums: function (state) {
        return state.poast.albums
    },
    getAllCovers: function (state) {
        return state.poast.covers
    },
    getAllSongs: function (state) {
        return state.poast.songs
    },
}

const actions = {
    onload: function ({ commit }) {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ info: "FIRST", album: 0 }), //treść wysyłana
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                commit('SET_POSTS', data)
            });
    }
}

// mutations
const mutations = {
    SET_POSTS(state, poast) {
        state.poast.albums = poast.albums
        state.poast.covers = poast.covers
        state.poast.songs = poast.songs
    }
}

//export store
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})