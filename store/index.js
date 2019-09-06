import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules'

const store = () => {
    return new Vuex.Store({
        modules,
        state,
        mutations,
        actions,
        getters
    })
}

export default store