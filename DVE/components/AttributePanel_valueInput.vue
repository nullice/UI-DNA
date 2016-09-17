<template>

    <div class="exmo_inbox value_input_box" v-bind:class="{press_out:pressOut_input}">
        <div class="exmo_box_name">{{name|lang}}</div>
        <input type="text" class="exmo_input_text edit_input" placeholder="值" v-model:value="edit_value">

        <input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name|lowercase}}" autocomplete="off" checked
               v-model:value="pressOut_input">
        <label class="exmo_button_icon mini" for="check_btn_{{name|lowercase}}"><i
                class="icon-layer-visible"></i></label>

        <input type="text" class="exmo_input_text out_input" placeholder="赋值" v-model:value="out_value">
    </div>

</template>
<style lang="scss">

    .value_input_box .exmo_box_name {
        width: 24px;
    }

    .exmo_inbox.value_input_box {
        width: 240px;
    }

    .edit_input {
        width: 150px;
        transition: all 0.5s;
    }

    .out_input {
        width: 0px;
        min-width: 0px;
        transition: all 0.5s;
        /*display: none;*/
    }

    .press_out {
        .edit_input {
            width: 75px;
        }

        .out_input {
            width: 75px;
            /*display: inline-block;*/
        }
    }
</style>

<script>

    var pressOut_input = false
    export default{
//        编辑值，输出值，值名称，值类型
        props: ['edit_value', "out_value", 'name', "value_type", "enableAssign"],
        data(){
            return {
                pressOut_input: pressOut_input,

            }
        },

    }
</script>
