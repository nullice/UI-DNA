<template>

    <div class="exmo_inbox">
        <div class="exmo_box_name">{{name|lang}}</div>
        <input type="text" class="exmo_input_text" placeholder="值" v-model:value="edit_value">

        <input type="checkbox" class="exmo_icon_cheackbox" id="check_btn2" autocomplete="off" checked>
        <label class="exmo_button_icon mini" for="check_btn2"><i class="icon-layer-visible"></i></label>

        <input type="text" class="exmo_input_text" placeholder="赋值"  v-model:value="out_value">
    </div>

</template>
<style>
</style>

<script>

    export default{

        props: ['edit_value',"out_value",'name', "value_type" ],
        data(){
            return{

            }
        },

    }
</script>
