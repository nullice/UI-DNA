<link rel="stylesheet" href="../bin/CSS/Ex-morphogen/exmo_main.css">
<template>


    <div class="input-assist-box" v-bind:class="{'input_foucs':input_foucs}">


        <!--<input type="text" @blur.stop="bl" @focus.stop="fs" >-->

        <div class="assist-range" v-if="assist_range_max!=undefined">
            <input type="range" v-model="edit_value" debounce="800" class="exmo_range" v-bind:max="assist_range_max"
                   v-bind:min="assist_range_min||0"  v-bind:style="o_range_style">
            <div class="max-info">{{assist_range_max}}</div>

        </div>


        <div v-bind:style="list_style"

             class="option_list  {{in_class}}"
        >
            <attr-option v-for="item in now_options"
                         v-bind:value="item.value||'noneValue'"
                         v-bind:hr="item.hr"
                         v-bind:br="item.br"
                         v-bind:label="item.label"
                         v-bind:label_html="item.label_html"
                         v-bind:selected_func="selected_func"
                         v-bind:in_title="item.title||''"
                         v-bind:in_class="(inline_block&&!item.block)?'inline_block':''"
                         v-bind:button="item.button"
            >

            </attr-option>
        </div>
    </div>


</template>
<style lang="scss" rel="stylesheet/scss">

    .exmo_inbox.value_input_box  .input-assist-box:not(:hover){
        max-height: 0px;
        transition: all .5s;
        overflow: hidden;
    }

    .exmo_inbox.value_input_box:hover  .input_foucs.input-assist-box, .input-assist-box:hover{
        max-height: 999px;
        transition: all .3s;
        overflow: hidden;
    }



    .input-assist-box {
        position: absolute;
        z-index: 44;
        background: whitesmoke;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px rgba(34, 34, 34, 0.15);
        border-radius: 2px;
        padding: 0;
        margin-left: 32px;

        .attr_option.inline_block {
            display: inline-block;
        }

        .assist-range {
            position: relative;
            input.exmo_range {
                padding: 10px;
                width: 90px;
            }

            .max-info {
                font-size: 8px;
                position: absolute;
                right: 12px;
                top: 18px;
                color: rgba(0, 0, 0, 0.46);
            }
        }

    }


</style>
<script>
    import attrOption from "./AttributePanel_option.vue"
    import ARR from "../Caryon/Richang_JSEX/arrayARR.js"

    export default{
        props: ["assist_type", "edit_value", "assign_value", 'assist_range_max',
            'assist_range_min', 'assist_range_width','input_foucs'],
        data(){
            return {
                o_editing: false,
                inline_block: true,
                options_normal: [
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: "info_pin",
                        button: true
                    }


                ],
                options_color: [
                    {
                        value: 'color_pick',
                        label_html: '<i class=" icon-tool-eyedropper" style="font-size: 14px;">',
                        title: "吸管",
                        selected_func: "color_pick",
                        button: true
                    },
                    {
                        value: 'color_none',
                        label_html: '<i class="icon-checkbox-unchecked" style="font-size: 11px;">',
                        title: "无色彩",
                        selected_func: "color_none",
                        button: true
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: "info_pin",
                        button: true
                    }


                ],
                options_boolean: [
                    {
                        value: 'boolean_true',
                        label_html: '<i class=" icon-checkmark" style="font-size: 14px;">',
                        title: "真",
                        selected_func: "boolean_true",
                        button: true
                    },
                    {
                        value: 'boolean_false',
                        label_html: '<i class="icon-cross2" style="font-size: 11px;">',
                        title: "假",
                        selected_func: "boolean_false",
                        button: true
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: "info_pin",
                        button: true,
                        block: true,
                    }
                ],
                options_path: [
                    {
                        value: 'open_file',
                        label_html: '<i class=" icon-folder-open" style="font-size: 14px;">',
                        title: "打开文件",
                        selected_func: "open_file",
                        button: true
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: "info_pin",
                        button: true
                    }
                ],
                    options_dashset: [
                        {
                            value: 'dashset_42',
                            label:"4,2",
                            label_html: ``,
                            title: "虚线 4,2",
                            selected_func: "dashset_42",
                            block: true,
                            button: true
                        },
                        {
                            br: true,
                        },
                        {
                            value: 'dashset_02',
                            label:"0,2",
                            label_html: ``,
                            title: "虚线 0,2",
                            selected_func: "dashset_02",
                            block: true,
                            button: true
                        },
                        {
                            br: true,
                        },
                        {
                            value: 'info_pin',
                            label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                            title: "创建变量标注",
                            selected_func: "info_pin",
                            block: true,
                            button: true
                        }
                    ],
                options_radian: [
                    {
                        value: 'radian_all',
                        label_html: '<i class=" icon-radio-unchecked" style="font-size: 14px;">',
                        title: "应用到所有圆角",
                        selected_func: "open_file",
                        button: true
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: "info_pin",
                        button: true
                    }
                ],
                options: [
                    {
                        value: 'test2',
                        label: "sss第三方",
                        block: true,
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'test',
                        label: "创建同步变量的文本图层",
                    },
                    {
                        br: true,
                    },
                    {
                        value: '0',
                        label_html: '<i class="icon-reference-tl" style="font-size: 21px;">',
                        label: "",
                        selected: true,
                    },
                    {
                        value: '1',
                        label_html: '<i class="icon-reference-tm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '2',
                        label_html: '<i class="icon-reference-tr" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        hr: true,
                    },
                    {
                        value: '3',
                        label_html: '<i class="icon-reference-cl " style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '4',
                        label_html: '<i class="icon-reference-cm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '5',
                        label_html: '<i class="icon-reference-cr" style="font-size: 21px;">',
                        label: ''
                    }, {

                        hr: true,
                    },
                    {
                        value: '6',
                        label_html: '<i class="icon-reference-bl" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '7',
                        label_html: '<i class="icon-reference-bm" style="font-size: 21px;">',
                        label: ''
                    }
                    ,
                    {
                        value: '8',
                        label_html: '<i class="icon-reference-br" style="font-size: 21px;">',
                        label: ''
                    }

                ]
            }

        },
        methods: {

            info_pin: function ()
            {
                alert(123)
            }

        },
        computed: {
            // 一个计算属性的 getter
            now_options: {
                get: function ()
                {

                    if (this.assist_type == "normal")
                    {
                        return this.options_normal
                    } else if (this.assist_type == "color")
                    {
                        return this.options_color
                    } else if (this.assist_type == "path")
                    {
                        return this.options_path
                    } else if (this.assist_type == "boolean")
                    {
                        return this.options_boolean
                    }else if (this.assist_type == "dashset")
                    {
                        return this.options_dashset

                    }else if (this.assist_type == "radian")
                    {
                        return this.options_radian
                    }







                    return this.options_normal;
                },
            },
            o_range_style:{
                get: function ()
                {
                    if(this.assist_range_width!=undefined)
                    {
                        return {
                            width:this.assist_range_width +"px"
                        }
                    }
                    else
                    {
                        return {
                            width:"90px"
                        }
                    }
                },
            }
        },
        components: {
            "attr-option": attrOption
        }


    }
</script>
