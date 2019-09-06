import {
    SAVE_CITY_TO_USER_LIST,
    REMOVE_CITY_FROM_USER_LIST
} from './city.mutation-types'


export default {
    loadWeatherByLocation({ commit }, data) {
        if (!data) return
        if (!data.lat && !data.lon) return
        return this.$axios.$get(`${process.env.api}/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=150ec12c764d39e4722add615bdfa4af`).then((response) => {
             return response
        })
    },
    saveCityToUserList({ commit }, data) {
        commit(SAVE_CITY_TO_USER_LIST, data)
    },

    removeCityFromList({ commit }, data) {
        commit(REMOVE_CITY_FROM_USER_LIST, data)
    }
 }