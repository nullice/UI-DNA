<template>
    <div class="color_input">

        <value-input v-bind:name="name" v-bind:edit_value.sync="o_color"
                     v-bind:out_value.sync="edit_value"
                     v-bind:enable_assign.sync="out_value"
                     v-bind:mini="mini"
                     v-bind:enable_uppercase="true"

        >
            <div class="color-bottom" v-bind:style="color_style"
                 v-bind:class="{'type_none':type_none}" v-on:click="picker_color">


            </div>
            <!--[{{type_none}}]-->
        </value-input>
    </div>
</template>
<style>
    .color-bottom {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #519AAB;
        border: 1px solid rgba(0, 0, 0, 0.01);
        border-radius: 3px;
        vertical-align: middle;
    }

    .color-bottom.type_none {
        border: 1px solid rgba(90, 90, 90, 0.53);
        background: linear-gradient(45deg, rgba(195, 195, 195, 0.490196), rgba(208, 208, 208, 0.490196) 45%, rgb(169, 169, 169) 45%, rgba(92, 92, 92, 0.64) 55%, rgba(205, 205, 205, 0.490196) 55%, rgba(211, 211, 211, 0.490196))!important;

    }




    .color_input .input.exmo_input_text.edit_input {
        margin-left: 0;
    }

    .color_input .color-bottom:hover {
        border: 1px solid #fff;
        box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.2);
    }

    .color_input .exmo_inbox.value_input_box.mini {
        width: 250px;
    }

    .color_input .exmo_inbox.value_input_box.mini:not(.press_out) .edit_input {
        width: 150px;
    }

    .color_input .exmo_inbox.value_input_box.mini:not(.press_out):hover .edit_input {
        width: 150px;
    }

    .color_input .exmo_inbox.value_input_box.mini.press_out .edit_input {
        width: 65px;

    }

    .exmo_inbox.value_input_box.mini.press_out .out_input {
        width: 52px;
    }

    .color_input .value_input_box .exmo_box_name {
        margin-right: 3px;
    }

</style>
<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import IchiColor  from "./../Caryon/IchiColor/ichi-color.js";
    export default{
        props: ['color', 'edit_value', "out_value", 'name', 'name_html',
            "value_type", "enable_assign", "mini", "mode_color", "type_none"
            ,"color_enable"],
        watch: {
            "o_color": function (val)
            {

                if (val != "#")
                {
                    this.color.r = this.ichi_color.r;
                    this.color.g = this.ichi_color.g;
                    this.color.b = this.ichi_color.b;
                    this.color_style.background = this.ichi_color.hex;
                    this.type_none = false;
                }
                else if (this.type_none != true)
                {
                    this.type_none = true;
                }


            },
            "type_none": function (val)
            {

                if (val)
                {
//                    this.color_style.background = "linear-gradient( 45deg, rgba(255, 255, 255, 0.49), rgba(255, 255, 255, 0.49) 45%, #5C5C5C 45%, rgba(255, 255, 255, 0.49) 55%, rgba(255, 255, 255, 0.49) 55%, rgba(255, 255, 255, 0.49) 100% )";
                    this.o_color = "#"
                }
                this.color_enable =!val
            },
            "color_enable":function (val)
            {
                this.type_none =!val
            },
            "color.r": function (val)
            {
                this.color_update();
            },
            "color.g": function (val)
            {
                this.color_update();
            },
            "color.b": function (val)
            {
                this.color_update();
            },
        },
        data(){

            return {
                o_color: "",
                o_color_out: '',
                o_set_type_none: false,
                ichi_color: IchiColor(),
                Gob: Gob,
                color_style: {background: "#000"},
            }
        },
        methods: {
            picker_color: function ()
            {
                var self = this;
                var set_color_callback = function (e)
                {
                    self.o_color = e.hex;

                }
                UI_action.show_message_color_picker("color1", this.ichi_color.hex, set_color_callback)
            },
            color_update: function ()
            {
                this.ichi_color.set(this.color);
                this.o_color = this.ichi_color.hex;
            }

        }

        ,
        components: {
            "value-input": ValueInput,
        }
    }
</script>
