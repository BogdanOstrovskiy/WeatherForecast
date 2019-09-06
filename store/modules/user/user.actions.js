import {
    SET_CURRENT_LOCATION
} from './user.mutation-types'


export default {
    async setCurrentLocation({ commit }, params) {
        if (params) {
            commit(SET_CURRENT_LOCATION, params)
        } else {
            try {
                let auth = '90a7f576-4fe7-489d-bd06-a97319baa14a';
                let res = await this.$axios.$get(`https://api.ipfind.com/me?auth=${auth}`)
                let currentLocation = {
                    lat: res.latitude,
                    lon: res.longitude
                }
                commit(SET_CURRENT_LOCATION, currentLocation)
            } catch (e) {
                console.error(e)
            }
        }
    }
}