<template>
    <div class="header">
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <nuxt-link
                        v-if="$nuxt.$route.name != 'index'"
                        to="/"
                        class="link-back"
                        title="back to Home page"
                    >BACK</nuxt-link>
                </b-col>
                <b-col
                    class="text-right text-right location"
                    title="you location"
                >
                    <Widget />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Widget from '@/components/utils/Widget'

    export default {
        name: "TheHeader",
        components: {
            Widget
        }
    }
</script>

<style scoped>
    .header {
        position: fixed;
        height: 60px;
        width: 100vw;
        background-color: #0099FF;
        z-index: 10;
        padding: 5px 20px;
    }
    .link-back {
        color: #F5F5F5;
        font-weight: bold;
        padding: 13px 0;
        display: inline-block;
    }
    .location {
        color: #fff;
        text-transform: uppercase;
    }
</style>