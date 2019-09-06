import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";

export default ({store}) => {
    createPersistedState({
        key: 'session',
        storage: {
            getItem: (key) => Cookies.getJSON(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
            removeItem: (key) => Cookies.remove(key)
        }
    })(store)
}