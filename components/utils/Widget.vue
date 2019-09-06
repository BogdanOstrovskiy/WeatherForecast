<template>
    <div>
        <span>{{ weatherData.hasOwnProperty('name') ? weatherData.name : 'loading...' }}</span>
        <span class="card__temp">{{ weatherData.hasOwnProperty('main') ? weatherData.main.temp : '' }} <sup>0</sup>C</span>
        <img
            :src="`http://openweathermap.org/img/wn/${weatherDescription.hasOwnProperty('icon') ? weatherDescription.icon : 'default'}@2x.png`"
            :alt="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
            :title="weatherDescription.hasOwnProperty('description') ? weatherDescription.description : ''"
            class="card__icon"
        >
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "Widget",
        data() {
            return {
                weatherData: {},
                weatherDescription: {},
                autoUpdateInterval: 1000 * 60 * 5
            }
        },
        computed: {
            ...mapGetters({
                getWeatherByCoordinates: 'city/getWeatherByCoordinates',
                currentLocation: 'user/getCurrentLocation'
            })
        },
        mounted() {
            this.loadWeather()
            this.autoUpdate()
        },
        methods: {
            ...mapActions({
                loadWeatherByLocation: 'city/loadWeatherByLocation'
            }),
            autoUpdate() {
                setInterval(() => {
                    this.loadWeather()
                }, this.autoUpdateInterval)
            },
            loadWeather() {
                this.loadWeatherByLocation(this.currentLocation).then((response) => {
                    if (response) {
                        this.weatherData = response
                        this.weatherDescription = response.weather[0]
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .card__icon {
        width: 50px;
    }
    .card__temp{
        font-size: 18px;
        padding: 0 30px;
    }
</style>