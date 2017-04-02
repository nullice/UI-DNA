<template>

    <div v-show="setSystem.ui.panel.main.settingPanel" class="setting_panel ">

        asdfsadf3sdfsdf
            123123123
        1302828489



        <div class="buttom_bar">


            <div class="data_caryon_setting">
                <button v-on:click="doReturn" class="exmo_button_icon mini" title="{{'返回'|lang}}">
                    <i class="icon-settings"></i>
                </button>
            </div>

        </div>
    </div>


</template>
<style lang="scss" rel="stylesheet/scss">


    .setting_panel {
        position: absolute;
        z-index: 10;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 100%;
        background: rgba(240, 240, 240, 1);

        .buttom_bar {
            height: 50px;
            width: 100%;
            position: absolute;
            bottom: 0;
            border-top: 2px solid rgba(0, 0, 0, 0.08);


            .data_caryon_setting {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 10%;
                margin: auto;
                height: 24px;
                margin-top: 10px;

                .exmo_button_icon.mini {
                    padding: 6px 7px;
                    padding-top: 7px;
                }
            }
        }

    }


</style>
<script>
    export default{
        ready: function ()
        {

        },
        props: [],
        data(){
            return {
                setSystem: setSystem,
            }
        },
        methods: {
            doReturn: function ()
            {
                setSystem.ui.panel.main.settingPanel =false
            }


        },
        computed: {},
        components: {}
    }
</script>
