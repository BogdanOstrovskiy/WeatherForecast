<template>
    <div>
        <div v-if="preloader" class="text-center">
            <img src="~/assets/images/preloader/preloader.gif" alt="preloader">
        </div>
        <b-container v-else>
            <b-jumbotron
                    :header="weatherData.hasOwnProperty('name') ? weatherData.name : 'loading...'"
                    :lead="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''">
                <p v-if="weatherData.hasOwnProperty('dt')">Time of data calculation: {{ weatherData.dt | dateFormatDt  }}</p>
                <b-button
                        variant="outline-dark"
                        size="sm"
                        @click="update()"
                >update</b-button>
                <img
                        :src="`http://openweathermap.org/img/wn/${weatherDescription.hasOwnProperty('icon') ? weatherDescription.icon : 'default'}@2x.png`"
                        :alt="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
                        :title="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
                        class="card__icon"
                >
            </b-jumbotron>
            <b-row>
                <b-col>
                    <b-list-group class="group-info">
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('wind')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Wind: <b-badge variant="default" pill>{{ degToCard(weatherData.wind.deg) }} {{ weatherData.wind.speed }} m/s</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('main')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Temperature: <b-badge variant="default" pill>{{ weatherData.main.temp }} <sup>0</sup>C</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('main')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Pressure: <b-badge variant="default" pill>{{ weatherData.main.pressure }} hpa</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('main')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Humidity: <b-badge variant="default" pill>{{ weatherData.main.humidity }} %</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('main')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Clouds: <b-badge variant="default" pill>{{ weatherData.clouds.all }} %</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('sys')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Sunrise time: <b-badge variant="default" pill>{{ weatherData.sys.sunrise | dateFormatTime}}</b-badge>
                        </b-list-group-item>
                        <b-list-group-item
                                v-if="weatherData.hasOwnProperty('sys')"
                                class="d-flex justify-content-between align-items-center"
                        >
                            Sunset time: <b-badge variant="default" pill>{{ weatherData.sys.sunset | dateFormatTime }}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col>3 of 3</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import weatherConvertingMethods from '@/mixins/weatherСonvertingMethods'

    export default {
        name: "index",
        data() {
            return {
                weatherData: {},
                weatherDescription: {},
                coordinatesCity: {},
                preloader: true
            }
        },
        mixins: [weatherConvertingMethods],
        computed: {
            ...mapGetters({
                getWeatherByCoordinates: 'city/getWeatherByCoordinates'
            })
        },
        mounted() {
            this.getCoordinatesCity()
        },
        methods: {
            getCoordinatesCity() {
                if (this.$route.query.hasOwnProperty('coordinates')){
                    this.coordinatesCity = this.$route.query.coordinates
                    this.loadWeather()
                }
            },
            ...mapActions({
                loadWeatherByLocation: 'city/loadWeatherByLocation'
            }),
            update() {
                this.loadWeather()
            },
            loadWeather() {
                this.loadWeatherByLocation(this.coordinatesCity).then((response) => {
                    if (!response) return
                    this.preloader = false
                    this.weatherData = response
                    this.weatherDescription = response.weather[0]
                })
            }
        }
    }
</script>

<style scoped>
    .list-group-item {
        background: rgba(0, 0, 0, 0.03);
    }
    .jumbotron{
        background: rgba(0, 0, 0, 0.03);
        position: relative;
    }
    .card__icon{
        width: 200px;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>