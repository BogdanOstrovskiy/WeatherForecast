import {
    SAVE_CITY_TO_USER_LIST,
    REMOVE_CITY_FROM_USER_LIST
} from './city.mutation-types'

export default {
    [SAVE_CITY_TO_USER_LIST](state, data) {
        if (Object.keys(data).length > 0) {
            state.locationList.push(data)
        }
    },
    [REMOVE_CITY_FROM_USER_LIST](state, data) {
        if (Object.keys(data).length > 0) {
            let index = state.locationList.findIndex(elem => JSON.stringify(elem) === JSON.stringify(data))
            if (index !== -1) {
                state.locationList.splice(index, 1)
            }
        }
    }
}