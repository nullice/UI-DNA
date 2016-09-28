<template>

    <div class="exmo_inbox value_input_box" v-bind:class="{press_out:enable_assign}">
        <div class="exmo_box_name">{{name|lang}}</div>
        <input type="text" class="exmo_input_text edit_input"
               v-model:value="o_edit"
               v-bind:placeholder="o_edit_placeholder">

        <input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name|lowercase}}" autocomplete="off" checked
               v-model:value="enable_assign">
        <label class="exmo_button_icon mini" for="check_btn_{{name|lowercase}}"><i
                class="icon-layer-visible"></i></label>

        <input type="text" class="exmo_input_text out_input"
               v-model:value="o_out"
               v-bind:placeholder="o_out_placeholder">
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


    var muti_edit = false;
    //    var pressOut_input = false
    export default{
//        编辑值，输出值，值名称，值类型
        props: ['edit_value', "out_value", 'name', "value_type", "enable_assign"],
        data(){
            return {
                o_edit: "",
                o_edit_placeholder: "",
                o_edit_isMult: false,
                o_out: "",
                o_out_placeholder: "赋值",
                o_out_isMult: false,

//                pressOut_input: pressOut_input,
            }
        },
        computed: {
            o_edit: {
                // getter
                get: function ()
                {
                    if (this.edit_value === Gob.MULT)
                    {
                        this.o_edit_placeholder = Lang.fiterFunc("多值");
                        this.o_edit_isMult = true;
                        return ""
                    } else
                    {
                        this.o_edit_placeholder = Lang.fiterFunc("");
                        this.o_edit_isMult = false;
                        return this.edit_value;
                    }
                },
                // setter
                set: function (newValue)
                {
                    if (this.o_edit_isMult)
                    {
                        if (newValue != "")
                        {
                            this.edit_value = newValue;
                        }
                    } else
                    {
                        this.edit_value = newValue;
                    }
                }
            },
            o_out: {
                // getter
                get: function ()
                {
                    console.log("o_out out_value:", this.out_value)
                    if (this.out_value === Gob.MULT)
                    {
                        this.o_out_placeholder = Lang.fiterFunc("多值");
                        this.o_out_isMult = true;
                        return ""
                    } else
                    {
                        this.o_out_placeholder = Lang.fiterFunc("");
                        this.o_out_isMult = false;
                        return this.out_value;
                    }
                },
                // setter
                set: function (newValue)
                {
                    if (this.o_out_isMult)
                    {
                        if (newValue != "")
                        {
                            this.out_value = newValue;
                        }
                    } else
                    {
                        this.out_value = newValue;
                    }
                }
            }

        }
    }
</script>
