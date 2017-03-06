<template>
    <div class="attr_select {{in_class}}">
        <div v-bind:style="select_style" class="select_input {{in_class}}">
            <div class="select_input_label">
                {{{label_html}}} {{label}}
            </div>

            <i class=" select_triangle_icon icon-play3"></i>
        </div>

        <div v-bind:style="list_style"
             v-show="show_list"
             class="option_list  {{in_class}}"
             >
            <attr-option v-for="item in options"
                         v-bind:value="item.value||'noneValue'"
                         v-bind:hr="item.hr"
                         v-bind:br="item.br"
                         v-bind:label="item.label"
                         v-bind:label_html="item.label_html"
                         v-bind:selected_func="selected_func"
                         v-bind:selected_value.sync="value"
                         v-bind:in_class="block?'inline_block':''"
                         v
            >

            </attr-option>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    .attr_select {

        position: relative;
        /*display: inline-block;*/

        .inline_block {
            display: inline-block;
            white-space: nowrap;
        }

        .option_list {
            position: absolute;
            font-size: 0;
            max-height: 0;
            overflow: hidden;
            transition: .3s all;
            opacity: 0;
            z-index: 44;
            background: rgb(245, 245, 245);

            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px rgba(34, 34, 34, 0.15);
            border-radius: 2px;
            padding: 0;


            div{
                font-size: 14px;
            }
        }

        &:hover .option_list, .option_list:hover {
            max-height: 9999px;
            opacity: 1;
            transition: .3s all;
        }

        .select_input {
            outline: none;
            -webkit-user-select: none;
            border: none;
            border-bottom: 1px solid #adadad;
            color: #292929;
            background: rgba(255, 255, 255, 0);
            padding: 4px 0px;
            margin: 4px 6px;
            min-width: 10px;
            font-size: 14px;
            white-space: nowrap;
            position: relative;
            padding-right: 16px;

            .select_input_label {
                overflow: hidden;
                color: rgb(84, 84, 84);

            }

            i.select_triangle_icon.icon-play3 {
                font-size: 9px !important;
                color: #666 !important;
                transform: rotate(270deg);
                display: inline-block;
                transition: .3s all;
                position: absolute;
                right: 0;
                width: 8px;
                height: 8px;
                bottom: 0;
                top: 0;
                margin: auto;

            }

        }

        &:hover i.select_triangle_icon.icon-play3 {
            transform: rotate(90deg);
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

        props: ['value', 'block', 'select_style','list_style', 'options', 'default_value', "in_class"],
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
        data(){
            return {
                show_list: true,
//                options: [
//                    {
//                        value: '0',
//                        label_html: '<i class="icon-reference-tl" style="font-size: 21px;">',
//                        label: "",
//                        selected: true,
//                    },
//                    {
//                        value: '1',
//                        label_html: '<i class="icon-reference-tm" style="font-size: 21px;">',
//                        label: ''
//                    },
//                    {
//                        value: '2',
//                        label_html: '<i class="icon-reference-tr" style="font-size: 21px;">',
//                        label: ''
//                    },
//                    {
//                        hr: true,
//                    },
//                    {
//                        value: '3',
//                        label_html: '<i class="icon-reference-cl " style="font-size: 21px;">',
//                        label: ''
//                    },
//                    {
//                        value: '4',
//                        label_html: '<i class="icon-reference-cm" style="font-size: 21px;">',
//                        label: ''
//                    },
//                    {
//                        value: '5',
//                        label_html: '<i class="icon-reference-cr" style="font-size: 21px;">',
//                        label: ''
//                    }, {
//
//                        hr: true,
//                    },
//                    {
//                        value: '6',
//                        label_html: '<i class="icon-reference-bl" style="font-size: 21px;">',
//                        label: ''
//                    },
//                    {
//                        value: '7',
//                        label_html: '<i class="icon-reference-bm" style="font-size: 21px;">',
//                        label: ''
//                    }
//                    ,
//                    {
//                        value: '8',
//                        label_html: '<i class="icon-reference-br" style="font-size: 21px;">',
//                        label: ''
//                    }
//
//                ]
            }
        },
        computed: {
            label: function ()
            {
                var ob = ARR.getByKey(this.options, "value",this.value );
                if (ob != undefined)
                {
                    if (ob.label != undefined)
                    {
                        return ob.label;
                    }

                } else
                {

                    if(this.value==Gob.MULT)
                    {
                        return Lang.from("多值")
                    }
                    return this.value
                }
            },

            label_html: function ()
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
            },

        },


        components: {

            "attr-option": attrOption
        }
    }

</script>
