<template>

    <a-area area_title="快捷功能" area_id="attr_panel">
        <!--<pre> {{Gob_selectTypes|json}}</pre>-->


        <div class="quick_funcs_box">
            <h4>形状</h4>

            <div class="quick_buts">

                <quick-icon-button v-bind:func="func_shape_combine" v-bind:in_title="Lang.from('合并形状')">
                    <i class="icon-xor-union"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func=" func_shape_symDifference" v-bind:in_title="Lang.from('形状对称差')">
                    <i class="icon-xor-difference"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func="func_shape_intersect" v-bind:in_title="Lang.from('形状交集')">
                    <i class="icon-xor-intersect"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func="func_shape_subtract" v-bind:in_title="Lang.from('减去形状')">
                    <i class="icon-xor-subtract"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('设置圆角')" name="radius"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.radius" v-bind:func="func_shape_radius">
                    <i class="icon-sampler-stroke-swatch"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('更多功能')" name="shape_advance"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.shape_advance" v-bind:func="func_shape_shape_advance">
                    <i class="icon-sampler-stroke-swatch"></i>
                </quick-icon-button>

            </div>

            <div class="quick_mores ">
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.shape_advance}">
                    <h4>更多选择器</h4>
                    <div class="info">
                        sdfsdafsdafdsafaaasdf
                        撒打发撒打发撒打发撒打发
                    </div>

                    <div class="exmo_inbox">
                        <div class="exmo_box_name">选择性</div>
                        <input type="text" class="exmo_input_text" placeholder="占位符" value="普通编辑框">
                    </div>

                    <div class="exmo_inbox">
                        <div class="exmo_box_name">挂机下是否</div>
                        <input type="text" class="exmo_input_text" placeholder="占位符" value="普通编辑框">
                    </div>
                </div>


                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.radius}">
                    <div class="fun_block">
                        <div class="info">
                            设置圆角 {{o_radius_now}}
                        </div>

                        <div class="exmo_inbox">
                            <div class="exmo_box_name">圆角</div>
                            <input type="text" class="exmo_input_text" placeholder="如 2 或 2,2,0,0"
                                   v-model="setSystem.ui.quick.shape_radius"
                                   v-on:input="func_shape_radius">
                        </div>
                    </div>


                    <div class="fun_block">
                        <div class="info">
                            路径角变换
                        </div>

                        <div class="exmo_inbox">
                            <div class="exmo_box_name">圆角参数</div>
                            <input type="text" class="exmo_input_text" placeholder="如 2 或 2,2,0,0 或 2,3 5,3">
                        </div>


                        <div class="exmo_inbox">
                            <div class="exmo_box_name">圆角模式</div>

                            <div class="exmo_radio">
                                <input type="radio" id="cmethod0" name="group_corner_method" placeholder="占位符"
                                       value="普通编辑框">
                                <div class="exmo_radio_shadow"></div>

                                <label for="cmethod0">
                                    Radius
                                </label>
                            </div>

                            <div class="exmo_radio">
                                <input type="radio" id="cmethod1" name="group_corner_method" placeholder="占位符">
                                <div class="exmo_radio_shadow"></div>
                                <label for="cmethod1">
                                    Adobe
                                </label>
                            </div>

                        </div>

                        <div class="exmo_checkbox">
                            <input type="checkbox" id="csvaeol1"  placeholder="占位符">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="csvaeol1">
                                保存原始角
                            </label>
                        </div>

                    </div>

                </div>


            </div>


        </div>


    </a-area>


</template>
<style lang="scss" rel="stylesheet/scss">

    .quick_funcs_box {

        .quick_more_item {

            .fun_block:not(:nth-last-of-type(1)) {
                margin-bottom: 16px;
                padding-bottom: 14px;
                border-bottom: 1px dashed rgba(0, 0, 0, 0.22);
            }

            h4 {
                font-weight: normal;
                font-size: 13px;
                padding: 2px 0;
                margin: 0;
            }

            .info {
                overflow: hidden;
                font-size: 12px;
                color: #797878;
                padding-bottom: 6px;
                margin-bottom: 4px;
            }

            padding: 0px 16px;
            overflow: hidden;
            visibility: hidden;
            max-height: 0;
            transition: all .4s;
            background-color: rgba(228, 229, 229, 1);
            width: 100%;
            margin-left: -16px;
            background: linear-gradient(180deg, rgba(158, 158, 158, 0.44) 0%, rgba(153, 153, 153, 0.24) 6px, rgba(153, 153, 153, 0.16) 98%, rgba(205, 205, 205, 0.52) 100%);
        }
        .quick_more_item.more_on {

            padding: 10px 16px;

            visibility: visible;
            max-height: 999px;
        }

    }


</style>
<script>
    import AttrOption from "./AttributePanel_option.vue"
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    import AttrSelect from "./AttributePanel_select.vue"
    import SelectInput from "./AttributePanel_selectInput.vue"
    import AttrTextarea from "./AttributePanel_textarea.vue"
    import QuickIconButton from "./QuickPanel_iconButton.vue"

    export default{
        watch: {
            "Gob.selectTime": async function (val)
            {
                if (setSystem.ui.quick.shape_enable_curnerEditor)
                {
                    this.func_shape_cornerEditor_updateInfoByXmp()
                }

            }

        },

        props: [],
        data(){
            return {
                more_onoff: {
                    one: false,
                    radius: false,
                    shape_advance: false,
                },
                Lang: Lang,
                Gob: Gob,
                setSystem: setSystem,
                Gob_selectTypes: Gob.selectTypes, /*当前选中图层类型状态，以此控制功能按钮是否显示*/
                o_editing: false,
                inline_block: true,
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

                ],

                o_shape_cornerEditor_radiiTxt: "",

            }

        },
        methods: {
            click_onecMore: function (moreName)
            {
                for (var x in  this.more_onoff)
                {
                    if (x != moreName)
                    {
                        this.more_onoff[x] = false
                    }
                    else
                    {
                        this.more_onoff[x] = !this.more_onoff[x]
                    }
                }
            },

            func_shape_one: function ()
            {

            },
            func_shape_combine: function ()
            {
                Proteins.exec("quick_shape_path_combine")
            },
            func_shape_subtract: function ()
            {
                Proteins.exec("quick_shape_path_subtract")
            },
            func_shape_intersect: function ()
            {
                Proteins.exec("quick_shape_path_intersect")
            },
            func_shape_symDifference: function ()
            {
                Proteins.exec("quick_shape_path_symDifference")
            },
            func_shape_radius: _.debounce(function (e)
            {

                var text = this.setSystem.ui.quick.shape_radius

                if (text != undefined && text.split != undefined)
                {
                    var textArr = text.split(/[,，\ ]/)

                    var reg = /[0-9]*/
                    var intArr = []

                    for (var i = 0; i < textArr.length; i++)
                    {
                        if (i > 4)
                        {
                            break
                        }
                        var _int = reg.exec(textArr[i])[0]
                        if (_int != undefined && _int.length > 0)
                        {
                            intArr.push(_int)
                        }
                    }

                    if (intArr.length > 0)
                    {
                        var setValue = intArr[0]
                        this.Gob.shape.radian.topLeft = +setValue
                        if (intArr[1] != undefined) setValue = intArr[1]
                        this.Gob.shape.radian.topRight = +setValue
                        if (intArr[2] != undefined) setValue = intArr[2]
                        this.Gob.shape.radian.bottomRight = +setValue
                        if (intArr[3] != undefined) setValue = intArr[3]
                        this.Gob.shape.radian.bottomLeft = +setValue
                    }


                }


            }, 500),

            func_shape_shape_advance: function ()
            {
                this.click_onecMore("shape_advance")
            },

            func_shape_cornerEditor_updateInfoByXmp: async function ()
            {

                var info = await Proteins.exec("encapsulate_cornerEditor_getEditLog")
                console.info(info)

            }

        },
        computed: {
            // 一个计算属性的 getter
            o_range_style: {
                get: function ()
                {
                    if (this.assist_range_width != undefined)
                    {
                        return {
                            width: this.assist_range_width + "px"
                        }
                    }
                    else
                    {
                        return {
                            width: "90px"
                        }
                    }
                },
            },
            o_radius_now: {
                get: function ()
                {
                    var text =
                        this.Gob.shape.radian.topLeft + ", "
                        + this.Gob.shape.radian.topRight + ","
                        + this.Gob.shape.radian.bottomRight + ","
                        + this.Gob.shape.radian.bottomLeft
                }
            },

            getThis: {
                get: function ()
                {
                    return this;
                },
            }
        },
        components: {
            "attr-option": AttrOption,
            "value-input": ValueInput,
            "a-area": Area,
            "attr-select": AttrSelect,
            "select-input": SelectInput,
            "attr-textarea": AttrTextarea,
            "quick-icon-button": QuickIconButton

        }


    }
</script>
