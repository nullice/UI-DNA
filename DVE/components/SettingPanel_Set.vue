<template>

    <a-area area_title="设置" area_id="setting_set_panel"
    >
        <h3>应用数据路径</h3>
        <div class="set-item">
            <div class="exmo_box_name">{{'用户数据' | lang}}  </div>
            <input type="readonly"   class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini" v-on:click="doOpen(setSystem._path_userDataDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>

        <div class="set-item">
            <div class="exmo_box_name">{{'日志' | lang}}  </div>
            <input type="readonly"    class="exmo_input_text edit_input"  v-bind:value="setSystem._path_logDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini" v-on:click="doOpen(setSystem._path_logDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>
        </div>



        <h3>自定义</h3>
        <div class="set-item">
            <div class="exmo_box_name">{{'外观 CSS' | lang}}  </div>
            <input type="readonly"   class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">
            <button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini" v-on:click="doOpen(setSystem._path_userDataDir)">
                <i class="icon-layer-group-collapsed"></i>
            </button>

        </div>

        <!--<div class="set-item">-->
            <!--<div class="exmo_box_name">{{'javascript' | lang}}  </div>-->
            <!--<input type="readonly"   class="exmo_input_text edit_input" v-bind:value="setSystem._path_userDataDir">-->
            <!--<button title="{{'打开文件夹' | lang}}" class="exmo_button_icon mini" v-on:click="doOpen(setSystem._path_userDataDir)">-->
                <!--<i class="icon-layer-group-collapsed"></i>-->
            <!--</button>-->
        <!--</div>-->


        <h2>测试</h2>


    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">

    .setting_set_panel {
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


    export default {
        data(){
            return {
                UIDNA: UIDNA,
                setSystem: setSystem,


            }
        },

        methods: {

            doOpen:function (inPath)
            {
                opn(inPath)
            }

        },

        components: {
            "a-area": Area
        },

    };

</script>
