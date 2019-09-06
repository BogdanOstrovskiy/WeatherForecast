import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyA1aCOiBYFBzETVvF1iv_26PwuyX0U3dY8",
        libraries: "places" // necessary for places input
    }
});