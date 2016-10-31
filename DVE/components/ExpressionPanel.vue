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


        <div class="auto_express">
            <input type="checkbox" class="exmo_icon_cheackbox" id="auto_express_check_btn2" autocomplete="off" checked>
            <label class="exmo_button_icon mini" for="auto_express_check_btn2" title="{{'自动渲染'|lang}}"><i
                    class="icon-spinner9"></i></label>
        </div>

        <button v-on:click="doDNAExpression" class="express_but exmo_button ">{{"渲染"|lang}}</button>

        <div class="dataCaryonSave">
            <button class="exmo_button_icon mini">
                <i class="icon-floppy-disk"></i>
            </button>
            <div class="data_saved_icon"><i class="icon-checkmark"></i></div>

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
<style lang="scss">


    .express_pad {
        height: 50px;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: inherit;
        border-top: 2px solid rgba(0, 0, 0, 0.08);

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

        .dataCaryonSave {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 10%;
            margin: auto;
            height: 24px;

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
    }

    .bottom_pad {
        height: 50px;
    }


</style>
<script>

    export default{
        data(){
            return {
                msg: 'hello vue',
                o_dataSaved: false,

            }
        },
        methods: {
            doDNAExpression: function ()
            {
                renderCaryon.renderDocument();
            }


        },
        components: {}
    }
</script>
