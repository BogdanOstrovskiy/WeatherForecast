<template>
    <b-card
            class="text-center"
            style="max-width: 20%; margin-bottom: 20px"
            :title="weatherData.hasOwnProperty('name') ? weatherData.name : 'loading...'"
            :img-src="require(`../../assets/images/weather-card-bg/${weatherDescription.hasOwnProperty('icon') ? weatherDescription.icon : 'default'}.jpg`)"
            img-alt="Image"
            img-top
    >
        <b-card-text>
            <span class="card__temp">{{ weatherData.hasOwnProperty('main') ? weatherData.main.temp : '' }} <sup>0</sup>C</span>
            <img
                :src="`http://openweathermap.org/img/wn/${weatherDescription.hasOwnProperty('icon') ? weatherDescription.icon : 'default'}@2x.png`"
                :alt="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
                :title="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
                class="card__icon"
            >
            <span class="card__description">{{ weatherDescription.hasOwnProperty('description') ? weatherDescription.description : '' }}</span>
            <div v-if="detailInfo">
                <b-list-group>
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
                </b-list-group>
            </div>
        </b-card-text>
        <b-button
            size="sm"
            variant="outline-primary"
            @click="detailInfo = !detailInfo"
        >
            <template v-if="detailInfo">show less</template>
            <template v-else>show more</template>
        </b-button>
        <div slot="footer">
            <small
                v-if="weatherData.hasOwnProperty('dt')"
                class="text-muted"
            >Time of data calculation: {{ weatherData.dt | dateFormatDt  }}</small>
            <b-button-group
                class="pt-2"
                size="sm"
            >
                <b-button
                    variant="outline-dark"
                    @click="update()"
                >Update</b-button>
                <NuxtLink
                        class="btn btn-primary"
                        v-if="weatherData.hasOwnProperty('name')"
                        :to="{ path: `/${weatherData.name}`, query: {coordinates: coordinates}}"
                >
                    Detail
                </NuxtLink>
                <b-button
                    variant="warning"
                    @click="remove()"
                >Del</b-button>
            </b-button-group>
        </div>
    </b-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import weatherConvertingMethods from '@/mixins/weatherСonvertingMethods'

    export default {
        name: "WeatherCard",
        data() {
          return {
              weatherData: {},
              weatherDescription: {},
              detailInfo: false
          }
        },
        mixins: [weatherConvertingMethods],
        props: {
            coordinates: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            ...mapGetters({
                getWeatherByCoordinates: 'city/getWeatherByCoordinates'
            })
        },
        mounted() {
            this.loadWeather()
        },
        methods: {
            ...mapActions({
                loadWeatherByLocation: 'city/loadWeatherByLocation',
                removeCityFromList: 'city/removeCityFromList'
            }),
            update() {
                this.loadWeather()
            },
            remove() {
                this.removeCityFromList(this.coordinates)
            },
            loadWeather() {
                this.loadWeatherByLocation(this.coordinates).then((response) => {
                    this.weatherData = response
                    this.weatherDescription = response.weather[0]
                })
            }
        }
    }
</script>

<style scoped>
    .card__temp {
        font-weight: bold;
        font-size: 24px;
        white-space: nowrap;
    }
    .card__icon {
        width: 50px;
    }
    .card__description{
        font-size: 18px;
        text-transform: capitalize;
        display: block;
    }
    .card-img-top{
        height: 230px;
    }
</style>