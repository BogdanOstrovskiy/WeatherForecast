import {
    SET_CURRENT_LOCATION
} from './user.mutation-types'

export default {
    [SET_CURRENT_LOCATION](state, data) {
        state.currentLocation = data
    }
}