<template>
    <div class="bottom_pad"></div>


    <div class="express_pad">

        <!--<div class="more_option">-->
        <!--<label class="express_auto_save exmo_checkbox">-->
        <!--<input type="checkbox">-->
        <!--<div class="exmo_checkbox_shadow"></div>-->
        <!--自动保存-->
        <!--</label>-->
        <!--</div>-->


        <!--<div class="auto_express">-->
        <!--<input v-model:value="o_setting.autoRender" type="checkbox" class="exmo_icon_cheackbox" id="auto_express_check_btn2" autocomplete="off" >-->
        <!--<label class="exmo_button_icon mini" for="auto_express_check_btn2" title="{{'自动渲染'|lang}}"><i-->
        <!--class="icon-spinner9"></i></label>-->
        <!--</div>-->
        <menu-box
                v-bind:menu_data="o_menu_setting"
                in_class="expresspanel_setting"
        >
            <div class="data_caryon_setting">
                <button v-on:click="doFreshen" class="exmo_button_icon mini" title="{{'设置'|lang}}">
                    <i class="icon-settings"></i>
                </button>
            </div>
        </menu-box>




        <button v-on:click="doDNAExpression" class="express_but exmo_button ">
            <span>{{"渲染" | lang}}</span>
            <express-effect v-show="o_render_status.rendering"></express-effect>
        </button>

        <div class="data_caryon_save">
            <button v-on:click="doDataSave" class="exmo_button_icon mini">
                <i v-bind:class="{eff_animation_flip:o_data_status.status.saving}" class="icon-floppy-disk"></i>
            </button>
            <div v-show="o_data_status.status.saved" class="data_saved_icon"><i class="icon-checkmark"></i></div>

            <!--<div class="more_option">-->
            <!--<label class="express_auto_save exmo_checkbox">-->
            <!--<input type="checkbox">-->
            <!--<div class="exmo_checkbox_shadow"></div>-->
            <!--自动保存-->
            <!--</label>-->
            <!--</div>-->

        </div>
    </div>


</template>
<style lang="scss" rel="stylesheet/scss">

    .express_pad {
        height: 50px;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: inherit;
        border-top: 2px solid rgba(0, 0, 0, 0.08);
        overflow: visible;
        z-index: 10;


        .menu_box{
            .option_list.menu {
                bottom: -8px;
            }
            .option_list.menu.expresspanel_setting {
                right: calc(10% - 24px);
            }

        }







        .more_option {
            position: absolute;
            width: 100px;
            height: 40px;
            background: rgb(240, 240, 240);
            top: 0;
            margin-left: -100px;
        }

        .express_but {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 128px;
            height: 30px;
            margin: auto;
            overflow: hidden;

            span {
                z-index: 3;
                position: relative;
            }

            .express_effect.socket {
                transform: scale(.6);
                opacity: .31;
            }
        }

        .auto_express {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 10%;
            margin: auto;
            height: 24px;

            .exmo_button_icon.mini {
                padding: 2px 5px;
                padding-top: 1px;
            }
            .exmo_button_icon.mini i {
                font-size: 13px;
                padding: 0;
                padding-top: 0;
            }
        }

        .data_caryon_save {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 10%;
            margin: auto;
            height: 24px;
            margin-top: 10px;

            .express_auto_save.exmo_checkbox {
                vertical-align: middle;
                margin-top: -4px;
                transition: .3s all;
                opacity: 0;
            }

            &:hover .express_auto_save.exmo_checkbox {
                transition: .3s all;
                opacity: 1;
            }

            .exmo_button_icon.mini {
                padding: 6px 7px;
                padding-top: 7px;
            }
            .exmo_button_icon.mini i {
                font-size: 14px;
                color: #747474;
                margin-left: .5px;
            }

            .data_saved_icon {
                position: absolute;
                width: 6px;
                height: 6px;
                font-size: 6px;
                background: #747474;
                color: #BEFFB0;
                padding: 3px;
                border-radius: 10px;
                top: 14px;
                left: 16px;
            }
        }

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

    .bottom_pad {
        height: 88px;
    }

    .eff_animation_flip {
        animation: flip .7s infinite;
    }

    @keyframes flip {
        0% {
            transform: rotate(0deg);
        }

        25% {
            transform: rotateY(45deg);
        }

        50% {
            transform: rotateY(90deg);
        }

        75% {
            transform: rotateY(135deg);
        }

        100% {
            transform: rotateY(180deg);
        }
    }


</style>
<script>

    import expressEffect from "./ExpressionPanel_expressEffect.vue"
    import  Menu from "./AttributePanel_menu.vue"


    export default{
        data(){
            return {
                msg: 'hello vue',
                o_data_status: dataCaryon.info,
                o_render_status: renderCaryon.status,
                o_setting: setSystem,
                o_menu_setting: {

                    more: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                        child: {
                            rgba: true,
                            rgb: false,
                            hex: true,
                            int: false,

                        }
                    },
                    setting: {
                        name: Lang.from("重启 UI-DNA"),
                        type: "button",
                        state: false,
                        selected_func:function ()
                        {
                            alert(123)
                        },

                    },
                },
                o_menu_save: {
                    hue: {
                        name: "Hue",
                        type: "multi_select",
                        state: true,
                    },
                    hr: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                    },
                    hsl: {
                        name: "HSL",
                        type: "multi_select",
                        state: true,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsl255: {
                        name: "HSL 255",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsl240: {
                        name: "HSL 240",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsv: {
                        name: "HSB",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            v: true,
                        }
                    },
                    hwb: {
                        name: "HWB",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            w: true,
                            b: true,
                        }
                    },
                    rgb: {
                        name: "RGB",
                        type: "multi_select",
                        state: true,
                        child: {
                            r: true,
                            g: true,
                            b: true,
                        }
                    },
                    labPs: {
                        name: "Lab",
                        type: "multi_select",
                        state: false,
                        child: {
                            l: true,
                            a: true,
                            b: true,
                        }
                    },
                    xyz: {
                        name: "XYZ",
                        type: "multi_select",

                        state: false,
                        child: {
                            x: true,
                            y: true,
                            z: true,
                        }
                    },
                    more: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                        child: {
                            rgba: true,
                            rgb: false,
                            hex: true,
                            int: false,

                        }
                    },
                    setting: {
                        name: "更多设置",
                        type: "select",
                        state: false,

                    },
                },

            }
        },

        methods: {
            doDNAExpression: function ()
            {
                renderCaryon.renderDocument();
            },
            doDataSave: function ()
            {
                dataCaryon.save();
            }
            ,
            doFreshen: function ()
            {
                Gob.updateSelect()
            }

        },
        components: {
            "menu-box": Menu,
            "express-effect": expressEffect
        }
    }
</script>
