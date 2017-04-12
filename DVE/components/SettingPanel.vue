<template>


    <div v-show="setSystem.ui.panel.main.settingPanel" class="setting_panel ">


        <bubble-box v-if="o_msg_bubble.show"
                    v-bind:msg="o_msg_bubble.msg"
                    v-bind:msg_title="o_msg_bubble.title"
                    v-bind:msg_color="o_msg_bubble.color"
        ></bubble-box>


        <set-area></set-area>
        <about-area></about-area>
        <div class="buttom_bar">
            <div class="data_caryon_setting">
                <button v-on:click="doReturn" class="exmo_button_icon mini" title="{{'返回'|lang}}">
                    <i class="icon-reply"></i>
                </button>
            </div>

        </div>


        <div class="set_logo">
            <i class="icon-settings"></i>
        </div>

        <div class="set_logo right">
            <i class="icon-settings"></i>
        </div>
    </div>


</template>
<style lang="scss" rel="stylesheet/scss">


    .set_logo {
        z-index: 1;
    }

    .set_logo i {
        pointer-events: none;
        font-size: 145px;
        position: absolute;
        opacity: .1;
        top: 0;
        margin-left: -72px;
        margin-top: -72px;
        display: inline-block;
        animation-iteration-count: infinite;
        -webkit-animation-duration: 3s;
        animation-name: rotate;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
    }

    .set_logo.right i {
        pointer-events: none;
        font-size: 200px;
        z-index: 12;
        opacity: .1;
        right: 0;
        top: initial;
        bottom: 0;
        margin-right: -106px;
        margin-bottom: -96px;
        -webkit-animation-duration: 4s;

    }

    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .setting_panel {
        position: fixed;
        z-index: 12;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 100%;
        background: rgba(240, 240, 240, 1);

        .message-box-bubbble {
            margin-top: 8px;
        }

        .buttom_bar {
            z-index: 13;
            height: 50px;
            width: 30px;
            right: 28px;
            position: absolute;
            bottom: 0;

            .data_caryon_setting {
                position: absolute;
                z-index: 33;
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

    import SetArea from './SettingPanel_Set.vue';
    import AboutArea from './SettingPanel_About.vue';
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';


    export default{
        ready: function ()
        {

        },
        props: [],
        data(){
            return {
                setSystem: setSystem,
                openUrl: appCaryon.openUrl,
                o_msg_bubble: UI_model.msg_bubble.setting_panel,

            }
        },
        methods: {
            doReturn: function ()
            {
                setSystem.ui.panel.main.settingPanel = false
            }


        },
        computed: {},
        components: {
            "about-area": AboutArea,
            "set-area": SetArea,
            "bubble-box": BubbleBox,
        }
    }
</script>
