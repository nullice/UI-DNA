<template>
    <div class="color_input">

        <value-input v-bind:name="name" v-bind:edit_value.sync="o_color"
                     v-bind:out_value.sync="edit_value"
                     v-bind:enable_assign.sync="out_value"
                     v-bind:mini="mini"
        >
            <div class="color-bottom" v-bind:style="color_style" v-on:click="picker_color">

            </div>
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

    .color_input .input.exmo_input_text.edit_input {
        margin-left: 0;
    }
    .color_input .color-bottom:hover {
        box-shadow: 0 2px 4px rgba(17, 34, 34, 0.21);
    }

    .color_input  .exmo_inbox.value_input_box.mini{
        width: 225px;
    }

    .color_input  .exmo_inbox.value_input_box.mini:not(.press_out) .edit_input {
        width: 100px;
    }
    .color_input .exmo_inbox.value_input_box.mini:not(.press_out):hover .edit_input {
        width: 100px;
    }
    .color_input .exmo_inbox.value_input_box.mini.press_out .edit_input {
        width: 45px;

    }

    .color_input  .value_input_box .exmo_box_name {
        margin-right: 3px;
    }

</style>
<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import IchiColor  from "./../Caryon/IchiColor/ichi-color.js";
    export default{
        props: ['color', 'edit_value', "out_value", 'name', 'name_html', "value_type", "enable_assign", "mini", "mode_color"],
        watch: {
            "o_color": function (val)
            {
//                console.log("------------------")
//                console.log(val)
                this.ichi_color.set(val);
                this.color.r = this.ichi_color.r;
                this.color.g = this.ichi_color.g;
                this.color.b = this.ichi_color.b;

                this.color_style.background=this.ichi_color.hex;
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
                ichi_color: IchiColor(),
                Gob: Gob,
                color_style:{background:"#000"},
            }
        },
        methods:
        {
            picker_color:function ()
            {
                var self =  this;
                var set_color_callback = function (e)
                {
                    self.o_color = e.hex;

                }
                UI_action.show_message_color_picker("color1", this.ichi_color.hex,set_color_callback)
            },
            color_update:function ()
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
