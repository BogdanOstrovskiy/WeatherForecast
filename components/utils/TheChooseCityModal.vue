<template>
    <b-modal
        id="modal-center" c
        entered
        lg
        title="Сhoose a new city"
        @hide="close"
    >
        <template>
            <div>
                <div>
                    <label>
                        <gmap-autocomplete
                            @place_changed="setPlace"
                            :selectFirstOnEnter="true"
                        >
                        </gmap-autocomplete>
                    </label>
                </div>
                <gmap-map
                        :center="center"
                        :zoom="12"
                        style="width:100%;  height: 400px;"
                >
                </gmap-map>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "TheChooseCityModal",
        data() {
            return {
                center: {
                    lat: 0,
                    lng: 0
                }
            };
        },
        computed: {
            ...mapGetters({
                currentLocation: 'user/getCurrentLocation'
            })
        },
        created(){
            this.center = {
                lat: this.currentLocation.lat,
                lng: this.currentLocation.lon
            }
        },
        methods: {
            ...mapActions({
                saveCityToUserList: 'city/saveCityToUserList'
            }),
            setPlace(place) {
                if (place.hasOwnProperty('geometry')) {
                    this.center = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    }
                }
            },
            close(e) {
                if (e.trigger === 'ok') {
                    let location = {
                        lat: this.center.lat,
                        lon: this.center.lng
                    }
                    this.saveCityToUserList(location)
                }
            }
        }
    };
</script>

<style scoped>
</style>