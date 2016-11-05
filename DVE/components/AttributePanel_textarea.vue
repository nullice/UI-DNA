<template>

    <textarea class="exmo_inbox value_input_box"
              v-model:value="o_edit"
              debounce="800"
              v-bind:placeholder="o_edit_placeholder"
    >
    </textarea>

        <input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name|lowercase}}" autocomplete="off" checked
               v-model:value="enable_assign">
        <label class="attr_value_set exmo_button_icon mini" for="check_btn_{{name|lowercase}}" title="{{'赋值到:' |lang}}"><i
                class="icon-carousel-right"></i></label>

        <input type="text" class="exmo_input_text out_input"
               v-model:value="o_out"
               v-bind:placeholder="o_out_placeholder">


</template>
<style>
    textarea.exmo_inbox.value_input_box {
        border: none;
        font-family: inherit;
        background: rgba(0, 0, 0, 0.00);
        outline: none;
        border-bottom: 1px solid #ADADAD;
        padding: 8px;
        margin-top: 4px;
        width: 95%;
    }

    textarea.exmo_inbox.value_input_box:hover {
        background: rgba(0, 0, 0, 0.03);
    }

</style>
<script>

    export default{
        props: ['edit_value', "out_value", 'name', 'name_html', "value_type", "enable_assign", "mini"],
        data(){
            return {
                o_edit: "",
                o_edit_placeholder: "",
                o_edit_isMult: false,
                o_out: "",
                o_out_placeholder: "赋值",
                o_out_isMult: false,
            }
        },
        components: {}
        ,
        computed: {
            o_edit: {
                //
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
