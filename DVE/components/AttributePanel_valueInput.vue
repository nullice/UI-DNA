<template>


    <div class="exmo_inbox value_input_box" v-bind:class="{press_out:enable_assign, mini:mini}">

        <div class="exmo_box_name" v-on:click="click_uppercase"
             v-bind:title="title"
        >{{name|lang}} {{{name_html}}}

        </div>
        <slot></slot>
        <input type="text" class="exmo_input_text edit_input "
               v-bind:type="readonly?'readonly':'text'"
               v-model:value="o_edit"
               debounce="800"
               v-bind:placeholder="o_edit_placeholder"
               v-bind:class="{'uppercase':o_uppercase}"
               @focus.stop="on_foucs"
               @blur.stop="on_blur"

        >


        <input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name+title|lowercase}}" autocomplete="off"
               checked
               v-model:value="enable_assign">
        <label class="attr_value_set exmo_button_icon mini" for="check_btn_{{name+title|lowercase}}"
               title="{{'赋值到:' |lang}}"><i
                class="icon-carousel-right"></i></label>

        <input type="text" class="exmo_input_text out_input"
               v-model:value="o_out"
               v-bind:placeholder="o_out_placeholder">

        <input-assist v-show="o_foucs"
                      v-bind:assist_type="assist_type"  v-bind:edit_value.sync="o_edit"
                      v-bind:assign_value.sync="o_out"  v-bind:assist_range_max="assist_range_max"
                      v-bind:assist_range_min="assist_range_min"  v-bind:assist_range_width="assist_range_width"

        ></input-assist>
    </div>

</template>
<style lang="scss" rel="stylesheet/scss">


    input.edit_input[type="readonly"] {
        color: rgb(173, 173, 173);
    }

    .exmo_inbox.value_input_box.mini {
        width: 128px;
        overflow: hidden;

        .edit_input {
            width: 85px;
        }

        &:not(.press_out) {
            .edit_input {
                width: 85px;
                transition: all 0.3s;
            }

            &:hover .edit_input {
                width: 60px;
            }
        }

        &.press_out {
            .edit_input {
                width: 23px;
                transition: all 0.3s;
            }

            .out_input {
                width: 23px;
                transition: all 0.3s;

            }
        }

    }

    label.attr_value_set.exmo_button_icon {
        opacity: 0;
        display: none;
    }

    .value_input_box:hover label.attr_value_set.exmo_button_icon {
        opacity: 1;
        display: inline-block;
    }

    .exmo_icon_cheackbox:checked + label.attr_value_set.exmo_button_icon {
        opacity: 1;
        display: inline-block;
    }

    .value_input_box .exmo_box_name {
        width: 24px;
        transition: all 0.3s;
    }

    .exmo_inbox.value_input_box {
        width: 260px;
        overflow: hidden;
        transition: all 0.3s;
        white-space: nowrap;
    }

    .value_input_box:not(.press_out) {

        .edit_input {
            width: 217px;
            transition: all 0.3s;
        }

        &:hover .edit_input {
            width: 190px;
        }

    }

    .out_input {
        width: 0px;
        min-width: 0px;
        transition: all 0.3s;

        /*display: none;*/
    }

    .press_out {
        .edit_input {
            width: 97px;
            transition: all 0.3s;
        }

        .out_input {
            width: 97px;
            transition: all 0.3s;

            /*display: inline-block;*/
        }
    }

    .uppercase {
        text-transform: uppercase;
    }


</style>

<script>

    import InputAssist from '../components/InputAssist.vue';

    var muti_edit = false;
    //    var pressOut_input = false
    export default{
//        编辑值，输出值，值名称，值类型
        props: ['edit_value', "title", "out_value", 'name', 'name_html', "value_type", "enable_assign", "mini",
            "mode_color", "enable_uppercase", 'readonly',
            'assist_type','assist_range_max','assist_range_min','assist_range_width'],
        data(){
            return {
                o_edit: "",
                o_edit_placeholder: "",
                o_edit_isMult: false,
                o_out: "",
                o_out_placeholder: "赋值",
                o_out_isMult: false,
                o_uppercase: false,
                o_foucs: false,
//                pressOut_input: pressOut_input,
            }
        },
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

        },
        methods: {
            on_foucs: function ()
            {
                this.o_foucs = true;
            },
            on_blur:function ()
            {

                this.o_foucs = false;
            },
            click_uppercase: function ()
            {
                if (this.enable_uppercase)
                {
                    this.o_uppercase = !this.o_uppercase
                    console.log("click_uppercase")

                }

            },
            bl: function() {

                alert("blur")

            },

            fs: function() {

                alert("focus")

            },
        },
        components: {
            "input-assist": InputAssist
        }

    }
</script>
