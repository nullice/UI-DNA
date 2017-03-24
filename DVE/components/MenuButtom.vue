<template>

    <div class="menu-buttom-box {{memu_name}}">

        <div class="menu-buttom" v-on:mouseout.stop="o_onoff_on=false">
            <!--<input v-model="o_onoff_on" type="checkbox" class="exmo_icon_cheackbox "-->
            <!--id="check_btn_memu_name{{memu_name}}_1">-->
            <!--<label class="exmo_button_icon mini" for="check_btn_memu_name{{memu_name}}_1">-->
            <!--<slot></slot>-->
            <!--</label>-->
            <label class="exmo_button_icon mini" v-on:click="click_menu_button">
                <slot v-on:click="click_menu_button"></slot>
            </label>


        </div>


        <div class="menu-box" v-bind:class="{'o_onoff_on':o_onoff_on ,'click_hidden':click_hidden}">
            <div class="option_list  {{in_class}}">
                <attr-option v-for="item in options"
                             v-bind:value="item.value||'noneValue'"
                             v-bind:hr="item.hr"
                             v-bind:br="item.br"
                             v-bind:label="item.label"
                             v-bind:label_html="item.label_html"
                             v-bind:selected_func="click_menu_func"
                             v-bind:selected_func_param="item.selected_func"
                             v-bind:in_title="item.title||''"
                             v-bind:in_class="(inline_block&&!item.block)?'inline_block':''"
                             v-bind:button="item.button"
                             v-bind:in_class2="item.class?item.class:''"
                             v-bind:state.sync="item.state"
                >


                    <div v-if="item.type==='multi_select'" class="checked_sign_shadow"></div>
                    <div v-if="item.type==='multi_select'" class="checked_sign"><i v-show="item.state"
                                                                                   class="icon-checkmark"></i>
                    </div>
                </attr-option>

            </div>
        </div>


    </div>


</template>
<style lang="scss" rel="stylesheet/scss">



    .menu-buttom-box {
        .menu-box {
            max-height: 0px;
            transition: all .5s;
            overflow: hidden;
        }

        .o_onoff_on, .menu-box:hover {
            max-height: 999px;
            transition: all .3s;
            overflow: hidden;

            &.click_hidden {
                max-height: 0px;
                transition: all .1s;
            }
        }

        .menu-buttom {
            position: absolute;
            right: 40px;
            margin-top: 10px;
            z-index: 3;

            .exmo_button_icon {
                font-size: 11px;

                i {
                    color: rgba(0, 0, 0, 0.4);
                    font-size: 12px;
                }
            }
        }

        .menu-box {



            position: absolute;
            z-index: 44;
            background: whitesmoke;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px rgba(34, 34, 34, 0.15);
            border-radius: 2px;
            padding: 0;
            right: 36px;
            margin-top: 34px;

            .attr_option.inline_block {
                display: inline-block;

            }
            .attr_option
            {
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
    }


</style>
<script>
    import attrOption from "./AttributePanel_option.vue"
    import ARR from "../Caryon/Richang_JSEX/arrayARR.js"
    import OBJ from "../Caryon/Richang_JSEX/objectOBJ.js"

    export default{
        props: ["memu_name", "options"],
        data(){
            return {
                o_onoff_on: false,
                click_hidden: false,


                o_editing: false,
                inline_block: true,
                options_radian: [
                    {
                        value: 'radian_all',
                        label_html: '<i class=" icon-radio-unchecked" style="font-size: 14px;">',
                        title: "应用到所有圆角",
                        selected_func: this.open_file,
                        button: true
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: this.info_pin,
                        button: true
                    }
                ],
//                options: [
//                    {
//                        value: 'test2',
//                        label: "sss第三方",
//                        block: true,
//                    },
//                    {
//                        br: true,
//                    },
//                    {
//                        value: 'test',
//                        label: "创建同步变量的文本图层",
//                    },
//                    {
//                        br: true,
//                    },
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
        methods: {

            click_menu_button: function ()
            {
//                alert(1)
                this.o_onoff_on = true
            },

            click_menu_func: function (func)
            {
                if (func != undefined)
                {
                    if (func.param != undefined && func.func != undefined)
                    {
                        func.func(func.param)
                    } else
                    {
                        func()
                    }

                    this.o_onoff_on = false
                    this.click_hidden = true;


                    var self = this;
                    setTimeout(function ()
                    {
                        self.click_hidden = false;
                    }, 500)
                }
            },

        },
        computed: {},
        components: {
            "attr-option": attrOption
        }


    }
</script>
