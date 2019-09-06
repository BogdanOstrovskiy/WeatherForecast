<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <b-card-group
                    v-for="(chunkList, indexList) in getChunk()"
                    :key="indexList"
                    deck
                    class="justify-content-md-center"
                >
                    <template v-for="(item, index) in chunkList">
                        <WeatherCard
                            :key="index"
                            :coordinates="item"
                        />
                        <b-card
                                v-if="chunkList.length === index + 1 && getChunk().length === indexList + 1"
                                style="max-width: 20%; margin-bottom: 20px"
                                :img-src="require('../assets/images/ui/plus-button.png')"
                                img-alt="add new city"
                                img-center
                                class="card-new"
                                v-b-modal.modal-center
                        >
                        </b-card>
                    </template>
                </b-card-group>
                <b-card-group
                    v-if="getChunk().length === 0"
                    deck
                    class="justify-content-md-center"
                >
                    <b-card
                            style="max-width: 20%; margin-bottom: 20px; height: 560px;"
                            :img-src="require('../assets/images/ui/plus-button.png')"
                            img-alt="add new city"
                            img-center
                            class="card-new"
                            v-b-modal.modal-center
                    >
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <TheChooseCityModal />
    </b-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import WeatherCard from '@/components/utils/WeatherCard'
    import TheChooseCityModal from '@/components/utils/TheChooseCityModal'
    import _ from 'lodash'

    export default {
        components: {
            WeatherCard,
            TheChooseCityModal
        },
        computed: {
            ...mapGetters({
                getAllCitiesList: 'city/getAllCitiesList'
            })
        },
        async asyncData({ app, store }) {
            let currentLocation = {}
            try {
                let auth = '90a7f576-4fe7-489d-bd06-a97319baa14a';
                let res = await app.$axios.$get(`https://api.ipfind.com/me?auth=${auth}`)
                currentLocation = {
                    lat: res.latitude,
                    lon: res.longitude
                }
                store.dispatch('user/setCurrentLocation', currentLocation);
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            getChunk() {
                return _.chunk(this.getAllCitiesList, 4)
            }
        }
    }
</script>

<style scoped>
    .card-new{
        border: 2px dashed #7f828b;
        position: relative;
    }
    .card-new:hover {
        background-color: #ccc;
        cursor: pointer;
    }
    .card-new .card-img{
        width: 100px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
