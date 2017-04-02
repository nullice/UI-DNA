<template>

    <a-area area_title="关于" area_id="setting_about_panel"
            v-bind:area_suspend="true"
            v-bind:area_disable_fixbut="true"
            v-bind:area_disable_fixbut_max="true"

    >



    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">


</style>


<script>

    import Area from '../components/area.vue';

    export default {
        data(){
            return {

            }
        },

        methods: {


        },

        components: {
            "a-area": Area
        },

    };

</script>
