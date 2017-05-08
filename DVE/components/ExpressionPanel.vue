<template>
    <div class="bottom_pad"></div>

    <div v-if="stopEventListen" class="stopEx">
        <button class="exmo_button_ghost" v-on:click="doContinue">{{"恢复运行" | lang}}  </button>
    </div>
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
                <button v-on:click="doOpenSettingPanel" class="exmo_button_icon mini" title="{{'打开设置'|lang}}">
                    <i class="icon-settings"></i>
                </button>
            </div>
        </menu-box>


        <button v-on:click="doDNAExpression" class="express_but exmo_button ">
            <span>{{"渲染" | lang}}</span>
            <express-effect v-show="o_render_status.rendering"></express-effect>
        </button>


        <menu-box
                v-bind:menu_data="o_menu_save"
                in_class="expresspanel_save"
        >

            <div class="data_caryon_save">
                <button v-on:click="doDataSave" class="exmo_button_icon mini" title="{{'保存 UI-DNA 数据到文档'|lang}}">
                    <i v-bind:class="{eff_animation_flip:o_data_status.status.saving}" class="icon-floppy-disk"></i>
                </button>
                <div v-show="o_data_status.status.saved" class="data_saved_icon"><i class="icon-checkmark"></i></div>
            </div>

        </menu-box>


        <!--<div class="more_option">-->
        <!--<label class="express_auto_save exmo_checkbox">-->
        <!--<input type="checkbox">-->
        <!--<div class="exmo_checkbox_shadow"></div>-->
        <!--自动保存-->
        <!--</label>-->
        <!--</div>-->


    </div>


</template>
<style lang="scss" rel="stylesheet/scss">

    .stopEx {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(110, 110, 110, 0.6);
        z-index: 999;

        .exmo_button_ghost {
            cursor: default;
            background-color: rgba(255, 255, 255, 0.74);
            border-color: rgba(255, 255, 255, 0.0);
            color: #5C5C5C;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 128px;
            height: 34px;
            margin: auto;
            text-align: center;

            &:hover {
                background: #fff;
            }
            &:active {
                color: #5C5C5C;
                background-color: rgba(214, 214, 214, 0.74);
            }
        }

    }

    .express_pad {
        height: 50px;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: inherit;
        border-top: 2px solid rgba(0, 0, 0, 0.08);
        overflow: visible;
        z-index: 10;

        .menu_box {
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
                padding-top: 1px; /*UI-DNA:{{dsf}}px*/
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
                pointer-events: none;
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
                stopEventListen: eventCaryon.stopEventListen,
                o_menu_setting: {
                    freshen: {
                        name: Lang.from("刷新"),
                        title: Lang.from("刷新 UI-DNA 属性"),
                        type: "button",
                        state: false,
                        selected_func: this.doFreshen,
                    },
                    doClean: {
                        name: Lang.from("清理数据"),
                        title: Lang.from("清理当前文档已失效的数据"),
                        type: "button",
                        state: false,
                        selected_func: this.doClean,
                    },
                    hr: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                    },
                    doStopEx: {
                        name: Lang.from("暂停"),
                        title: Lang.from("暂停 UI-DNA 运行"),
                        type: "button",
                        selected_func: this.doStopEx,

                    },

                    hr2: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                    },
                    setting_c: {
                        name: Lang.from("冷重启"),
                        title: Lang.from("不保留当前应用状态的重启"),
                        type: "button",
                        state: false,
                        selected_func: function ()
                        {
                            appCaryon.restarCold_UI_DNA()
                        },
                    },
                    setting: {
                        name: Lang.from("重启"),
                        title: Lang.from("重启 UI-DNA"),
                        type: "button",
                        state: false,
                        selected_func: function ()
                        {
                            appCaryon.restar_UI_DNA()
                        },
                    },

                },
                o_menu_save: {
//                    hue: {
//                        name: "Hue",
//                        type: "multi_select",
//                        state: true,
//                    },
//                    hr: {
//                        type: "multi_select",
//                        state: true,
//                        hr: true,
//                    },

                    exportPSDJSON: {
                        name: Lang.from("导出 PSD 信息"),
                        title: Lang.from(""),
                        type: "select",
                        state: setSystem.inset.able_saveDoc,
                        selected_func: async function ()
                        {
                            var data = JSON.stringify( await  enzymes.getDocumentInfoJson_byActive(),null,4)

                            var docInfo = await  enzymes.getDocumentBaseInfo_byActive()
                            if (docInfo != undefined)
                            {
                                var name = docInfo.fileNanme + ".psdinfo.json";
                            } else
                            {
                                var name = "export.psdinfo.json"
                            }
                            appCaryon.userSaveFile(data, name, "josn", Lang.from("导出到文件"))
                        },
                    },
                    exportDNA: {
                        name: Lang.from("导出 DNA"),
                        title: Lang.from("导出 DNA 属性、变量列表、当前文档设置"),
                        type: "select",
                        state: setSystem.inset.able_saveDoc,
                        selected_func: async function ()
                        {
                            var data = JSON.stringify(dataCaryon.getSaveDataObject())

                            var docInfo = await  enzymes.getDocumentBaseInfo_byActive()
                            if (docInfo != undefined)
                            {
                                var name = docInfo.fileNanme + ".UI-DNA.json";
                            } else
                            {
                                var name = "export.UI-DNA.json"
                            }
                            appCaryon.userSaveFile(data, name, "josn", Lang.from("导出到文件"))
                        },
                    },
                    importDNA: {
                        name: Lang.from("载入 DNA"),
                        title: Lang.from("载入 DNA 属性、变量列表、当前文档设置，会丢失当前数据"),
                        type: "select",
                        state: setSystem.inset.able_saveDoc,
                        selected_func: function ()
                        {

                            var varStr = appCaryon.userReadFile(Lang.from("打开一个 DNA 数据文件"), ["json"])
                            try
                            {
                                var ob = JSON.parse(varStr)
                                if (ob != undefined)
                                {
                                    dataCaryon.load(ob)
                                }

                            } catch (e)
                            {
                                console.error("ExpressionPanel.vue - importDNA()", e)
                            }
                        },
                    },
                    hr1: {hr: true},
                    ableDocSave: {
                        name: Lang.from("同时保存文档"),
                        type: "multi_select",
                        state: setSystem.inset.able_saveDoc,
                        selected_func: function ()
                        {
                            setSystem.inset.able_saveDoc = !setSystem.inset.able_saveDoc
                        },
                    },
                },

            }
        },

        methods: {
            doDNAExpression: function ()
            {
                renderCaryon.renderDocument();
            },
            doDataSave: async function ()
            {
                await  dataCaryon.save();
                if (setSystem.inset.able_saveDoc)
                {
                    enzymes.saveActiveDocument()
                }
            }
            ,
            doFreshen: function ()
            {
                setSystem.ui.panel.att.nowFreshen = true
                Gob.updateSelect()
                setTimeout(function ()
                {
                    setSystem.ui.panel.att.nowFreshen = false
                }, 800)

            }
            ,
            doOpenSettingPanel: function ()
            {
                setSystem.ui.panel.main.settingPanel = true
            },

            doClean: async function ()
            {
                var count = 0
                var allLayerArray = await  enzymes.getAllLayerArray()

                for (var x in  dataCaryon.layers)
                {
                    if (ARR.getByKey(allLayerArray, "id", x) == undefined)
                    {
                        console.log("clean data deleted emty layer:", x)
                        delete  dataCaryon.layers[x]
                        count++
                    }
                }
                varSystem.cleanVarNameList()
                UI_action.show_message_bubble("layer_selector", "", Lang.from("已清理 ") + count + Lang.from(" 项无用数据"), "")

            },
            doStopEx: async function ()
            {
                this.stopEventListen = !this.stopEventListen
                eventCaryon.stopEventListen = this.stopEventListen
            },
            doContinue: async function ()
            {
                this.stopEventListen = false
                eventCaryon.stopEventListen = false
                Gob.updateSelect()
            }

        },
        components: {
            "menu-box": Menu,
            "express-effect": expressEffect
        }
    }
</script>
