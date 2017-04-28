<template>

    <a-area area_title="设置" area_id="setting_set_panel"
    >
        <h3>应用数据路径</h3>
        <div class="set-item">
            <div class="exmo_box_name">{{'用户数据' | lang}}  </div>
            <input type="readonly" class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_userDataDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>

        <div class="set-item">
            <div class="exmo_box_name">{{'日志' | lang}}  </div>
            <input type="readonly" class="exmo_input_text edit_input" v-bind:value="setSystem._path_logDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_logDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>


        <h3>自定义</h3>
        <div class="set-item">
            <div class="exmo_box_name">{{'外观 CSS' | lang}}  </div>
            <input type="readonly" class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_userDataDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>

        <div class="set-item">
            <div class="exmo_box_name">{{'javaScript' | lang}}  </div>
            <input type="readonly" class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_userDataDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>


        <h3>扩展所在路径</h3>
        <div class="set-item">
            <div class="exmo_box_name">{{'UI-DNA' | lang}}  </div>
            <input type="readonly" class="exmo_input_text edit_input" v-bind:value="setSystem._path_extensionDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_extensionDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>




        <h3>测试</h3>

        <div class="set-item">
            <div class="exmo_box_name">{{'Devtool' | lang}}  </div>
            <button class="exmo_button " v-on:click="openUrl('http://127.0.0.1:9217')">
                127.0.0.1:9217
            </button>
        </div>


        <div class="set-item">
            <div class="exmo_box_name">{{'语言' | lang}}  </div>
            <button class="exmo_button " v-on:click="setSystem.outDebugLanguageJson()">
                {{'导出测试语言文件' | lang}}

            </button>

            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini"
                    v-on:click="doOpen(setSystem._path_languageDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>

        <div class="set-item">
            <div class="exmo_box_name">{{'安装' | lang}}  </div>
            <button class="exmo_button " title="执行一次首次运行时解压并额外安装文件的操作，主要是自带的图片、文本填充素材"
                    v-on:click="appCaryon.unzipInstallExtra()">
                解压额外文件
            </button>
        </div>



        <div class="set-item">
            <div class="exmo_box_name">{{'实例' | lang}}  </div>
            <button class="exmo_button " title="让扩展面板被关闭时结束实例不在后台运行"
                    v-on:click="doUnPersistent">
                关闭后台运行
            </button>
        </div>


        <div class="set-item">
            <div class="exmo_box_name">{{'监视' | lang}}  </div>

            <div class="exmo_checkbox">
                <input type="checkbox" id="setdebugms" v-model="showDebugMicroscope">
                <div class="exmo_checkbox_shadow"></div>
                <label for="setdebugms">
                    启用
                </label>
            </div>
        </div>

        <debug-microscope v-if="showDebugMicroscope">Debug-microscope</debug-microscope>


    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">

    .setting_set_panel {
        height: calc(100% - 176px);
        overflow-y: scroll;
        border-bottom: none;

        h3 {
            margin: 0;
            padding: 0;
            font-size: 13px;
            padding-top: 10px;
            padding-bottom: 4px;
            color: rgba(82, 82, 82, 0.88);
            font-size: 12px;
            padding-top: 10px;
            font-weight: bold;
        }

        .set-item {
            margin: 6px 0;

            .exmo_checkbox {
                vertical-align: middle;
            }
            .button.exmo_button {
                font-size: 12px;
            }
        }
        .exmo_box_name {
            font-size: 12px;
            text-align: left;
            width: 65px;
        }

        input.exmo_input_text.edit_input {
            font-size: 12px;
            width: calc(100% - 115px);
        }

        .exmo_input_text, .exmo_select {
            padding: 2px 0;
        }
    }
</style>


<script>

    import Area from '../components/area.vue';
    import DebugPanel from "./DebugPanel.vue"

    export default {
        data(){
            return {
                UIDNA: UIDNA,
                setSystem: setSystem,
                openUrl: appCaryon.openUrl,
                showDebugMicroscope: false,
                appCaryon: appCaryon,
            }
        },
        methods: {
            doOpen: function (inPath)
            {
                opn(inPath)
            },
            doUnPersistent:function ()
            {
                gonzUnPersistent()
            }
        },
        components: {
            "a-area": Area,
            "debug-microscope": DebugPanel,
        },
    };
</script>
