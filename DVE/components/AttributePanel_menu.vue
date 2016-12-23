<template>
    <!--v-show="menu_active"-->
    <div class="menu_box {{in_class}}">
        <div v-bind:style="menu_style" class="menu_input {{in_class}}">
            <div class="menu_input_label">
                {{{label_html}}} {{label}}
                <slot></slot>
            </div>
        </div>
        <div v-show="show_list" class=" menu option_list {{in_class}}">


            <attr-option v-for="item in menu_data"
                         v-bind:value="item.value||item.name"
                         v-bind:state.sync="item.state"
                         v-bind:hr="item.hr"
                         v-bind:label="item.name"
                         v-bind:label_html="item.label_html"
                         v-bind:selected_func="selected_func"
                         v-bind:selected_value.sync="value"
                         v-bind:in_class="block?'inline_block':''"
            >

                <div v-if="item.type==='multi_select'" class="checked_sign_shadow"></div>
                <div v-if="item.type==='multi_select'" class="checked_sign"><i v-show="item.state"
                                                                               class="icon-checkmark"></i>
                </div>


            </attr-option>


        </div>
    </div>
</template>
<style lang="scss">

    .menu_box {

        position: relative;
        /*display: inline-block;*/

        .inline_block {
            display: inline-block;
        }

        .option_list.menu {
            position: absolute;
            max-height: 0;
            overflow: hidden;
            transition: .3s all;
            opacity: 0;
            z-index: 33;
            background: rgb(245, 245, 245);

            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px rgba(34, 34, 34, 0.15);
            border-radius: 2px;
            padding: 0;

            .option_hr {
                border-top: 1px solid rgba(0, 0, 0, 0.09);
                border-bottom: 1px solid rgba(255, 255, 255, 0.45);
            }

            .attr_option.selected:not(:hover) {
                background: rgba(192, 192, 192, 0.15);
            }

            .attr_option {
                position: relative;
            }

            .checked_sign_shadow {
                width: 30px;
                display: inline-block;
            }
            .checked_sign {
                display: inline-block;
                position: absolute;
                right: 10px;
                top: 0;
                bottom: 0;
                margin: auto;
                text-align: right;
                i {
                    line-height: 30px;
                }
            }

        }

        &:hover .option_list, .option_list:hover {
            max-height: 9999px;
            opacity: 1;
            transition: .3s all;
        }
    }


</style>
<script>

    import attrOption from "./AttributePanel_option.vue"
    import ARR from "../Caryon/Richang_JSEX/arrayARR.js"

    export default{
        ready: function ()
        {
            if (this.default_value != undefined)
            {
                if (this.value == undefined)
                {
                    this.value = this.default_value;
                }
            }

        },


        watch: {
            'value': function (newVal, oldVal)
            {
                if (this.default_value != undefined)
                {
                    if (newVal == undefined)
                    {
                        this.value = this.default_value;
                    }
                }
            }
        },

        props: ['menu_active', 'value', 'block', 'menu_style', 'menu_data', 'default_value', "in_class"],
        methods: {
            getLable: function ()
            {

            },

            selected_func: function ()
            {
                this.show_list = false;
                var _this = this;
                setTimeout(function ()
                {
                    _this.show_list = true;
                }, 200)
            }


        },
        name: 'menu-box',
        data(){

            return {
                show_list: true,
            }
        },
        computed: {
            label: function ()
            {
                if (this.options != undefined)
                {


                    var ob = ARR.getByKey(this.options, "value", this.value);
                    if (ob != undefined)
                    {
                        if (ob.label != undefined)
                        {
                            return ob.label;
                        }

                    } else
                    {
                        return ""
                    }
                }

            },

            label_html: function ()
            {
                if (this.options != undefined)
                {
                    var ob = ARR.getByKey(this.options, "value", this.value);
                    if (ob != undefined)
                    {
                        if (ob.label_html != undefined)
                        {
                            return ob.label_html;
                        }

                    } else
                    {
                        return ""
                    }
                }

            },

        },


        components: {
            "attr-option": attrOption,
        }
    }

</script>
