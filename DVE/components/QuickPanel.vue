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
                    <i class="iconfont  icon-gengduo-shuxiang"></i>
                </quick-icon-button>

            </div>

            <div class="quick_mores ">

                <!--圆角-->
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

                    <!--路径角变换-->
                    <div class="fun_block">
                        <div class="info">

                            <span title="此功能封装自 David Jensen（photoshopscripts.wordpress.com）的脚本：Photoshop Corner Editor 1.0.6">路径角变换*</span>
                            <span v-show="setSystem.ui.quick.shape_enable_curnerEditor">  <br> 使用前先用
                                <span class="click-text"
                                      v-on:click='selectTool("pathComponentSelectTool")'>
                                    路径选择工具</span>  选中形状
                            </span>

                            <div class="func_enable">
                                <div class="exmo_checkbox">
                                    <input type="checkbox" id="cablece1"
                                           v-model="setSystem.ui.quick.shape_enable_curnerEditor">
                                    <div class="exmo_checkbox_shadow"></div>
                                    <label for="cablece1">
                                        启用
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div v-show="setSystem.ui.quick.shape_enable_curnerEditor">
                            <div class="exmo_inbox">
                                <div class="exmo_box_name">圆角参数</div>
                                <input type="text" class="exmo_input_text" placeholder="如 2 或 2,2,0,0 或 2,3 5,3"
                                       v-model="o_shape_cornerEditor_radiiTxt">
                            </div>


                            <div class="exmo_inbox">
                                <div class="exmo_box_name">圆角模式</div>
                                <div class="exmo_radio">
                                    <input type="radio" id="cmethod0" value="0" name="group_corner_method"
                                           v-model="o_shape_cornerEditor_cornerMethod0">
                                    <div class="exmo_radio_shadow"></div>

                                    <label for="cmethod0">
                                        半径
                                    </label>
                                </div>

                                <div class="exmo_radio">
                                    <input type="radio" id="cmethod1" name="group_corner_method" value="1"
                                           v-model="o_shape_cornerEditor_cornerMethod0">
                                    <div class="exmo_radio_shadow"></div>
                                    <label for="cmethod1">
                                        Adobe
                                    </label>
                                </div>

                            </div>


                            <div class="exmo_inbox">
                                <div class="exmo_checkbox">
                                    <input type="checkbox" id="csvaeol1" v-model="o_shape_cornerEditor_editable">
                                    <div class="exmo_checkbox_shadow"></div>
                                    <label for="csvaeol1">
                                        保存原始角
                                    </label>
                                </div>
                            </div>

                            <div class="more_button_bar">
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(0)">圆角</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(1)">反圆</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(2)">斜切</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(3)">内直</button>

                            </div>

                        </div>


                    </div>

                </div>

                <!--形状高级选项-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.shape_advance}">
                    <div class="info">

                    </div>


                    <div class="fun_block">
                        <div class="info">
                            形状属性
                            <div class="more_button_bar_big inline">
                                <button class="exmo_button_ghost" v-on:click="func_shape_copyShapeProperty">复制</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_pasetShapeProperty">粘贴</button>
                            </div>
                        </div>

                    </div>

                    <div class="fun_block">
                        <!--<div class="info">-->
                        <!--CSS 与 SVG <span class="sub">使用 SVGO 优化 </span>-->
                        <!--</div>-->

                        <div class="info">
                            SVG
                            <div class="more_button_bar_big inline">
                                <button class="exmo_button_ghost" v-on:click="func_shape_copySvg">复制</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_saveSvg">导出</button>
                            </div>
                        </div>

                        <div class="exmo_inbox">
                            <div class="exmo_checkbox">
                                <input type="checkbox" id="qp_ssvgo" v-model="setSystem.ui.quick.shape_use_svgo">
                                <div class="exmo_checkbox_shadow"></div>
                                <label for="qp_ssvgo">
                                    使用 SVGO 优化
                                </label>
                            </div>
                        </div>


                    </div>


                </div>

            </div>


        </div>


    </a-area>


</template>
<style lang="scss" rel="stylesheet/scss">


    span.click-text {
        color: #5D88CB;
        cursor: pointer;

        &:hover {
            color: #2771E4;
            text-decoration: underline;
        }
    }

    .quick_funcs_box {

        .quick_more_item {

            .exmo_inbox {
                width: 100%;
                margin-bottom: 8px;
            }

            input.exmo_input_text {
                width: calc(100% - 90px);
            }

            .exmo_checkbox, .exmo_radio {
                color: #777;
                vertical-align: middle;
                label {
                    font-size: 12px;
                }
            }

            .exmo_checkbox {
                margin-top: 6px;
            }
            .more_button_bar {
                text-align: center;
                width: 100%;
                padding-top: 12px;
                button.exmo_button_ghost {
                    font-size: 12px;
                    padding: 3px 16px;
                }

            }

            .more_button_bar_big {
                text-align: center;
                width: 100%;

                &.inline {
                    display: inline-block;
                    text-align: right;
                    position: absolute;
                    right: 0;
                }

                button.exmo_button_ghost {
                    font-size: 12px;
                    padding: 3px 20px;
                    margin: 0 8px;
                }
            }

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
                -webkit-user-select: text;
                font-size: 12px;
                color: #797878;
                padding-bottom: 6px;
                margin-bottom: 4px;
                position: relative;

                .sub {
                    color: rgba(0, 0, 0, 0.34);
                    padding-left: 5px;
                }

                .func_enable {
                    position: absolute;
                    right: 10px;
                    top: 0px;
                    margin-top: -5px;
                }
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
                o_shape_cornerEditor_cornerMethod0: 0,
                o_shape_cornerEditor_editable: true,
            }

        },
        methods: {
            selectTool: function (toolName)
            {
                Proteins.exec("inputAssist_setCurrentTool", {toolName: toolName})
            },
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


                if (info.cornerPatternMetadata != undefined)
                {
                    this.o_shape_cornerEditor_radiiTxt = info.cornerPatternMetadata
                }

                if (info.cornerMethodMetadata != undefined)
                {
                    this.o_shape_cornerEditor_cornerMethod0 = info.cornerMethodMetadata
                }

            },

            func_shape_cornerEditor_do: function (type)
            {
                var itemIndexArr = []
                Gob.selectList.forEach(function (x) {itemIndexArr.push(x.itemIndex)})
                var parameOb = {

                    radiiTxt: this.o_shape_cornerEditor_radiiTxt, //圆角参数文本
                    cornerType: +type,//= 0Round;  1Inverse; 2Chamfer;  3Inset
                    cornerMethod: +this.o_shape_cornerEditor_cornerMethod0,//0 Radius 模式, 1 Adobe 模式
                    editable: this.o_shape_cornerEditor_editable, // Save Original Corners
                    selectedLayers: itemIndexArr//当前选中图层 itemIndex 数组，提供这个能提高速度
                }


                Proteins.exec("encapsulate_cornerEditor_do", parameOb)

            },
            func_shape_pasetShapeProperty: function ()
            {
                Proteins.exec("quick_shape_advance_pasetShapeProperty")
            }
            ,
            func_shape_copyShapeProperty: function ()
            {
                Proteins.exec("quick_shape_advance_copyShapeProperty")
            },
            func_shape_copySvg: async function ()
            {
                var svgFin = ""
                if (Gob.selectList.length < 2)
                {
                    await _func()
                } else
                {

                    var save = await enzymes.selectSave()
                    Gob.stopSelectEvent = true
                    for (var i = 0; i < Gob.selectList.length; i++)
                    {
                        await enzymes.selectLayer_byID(Gob.selectList[i].id)
                        //-----------------------
                        await _func()
                        if (i < Gob.selectList.length - 1)
                        {
                            svgFin = svgFin + "\n\n"
                        }

                        //-----------------------
                    }
                    Gob.stopSelectEvent = false
                    await enzymes.selectLoad(save)
                }


                async function _func()
                {
                    if (await  Proteins.exec("quick_shape_advance_copyShapeSVG") == 0)
                    {
                        var svg = NodeCopy.paste()
                        if (setSystem.ui.quick.shape_use_svgo)
                        {
                            try
                            {
                                var svgo = await svgoAsync(svg)

                                if (svgo.data != undefined)
                                {
                                    svg = svgo.data
                                }
                            } catch (e)
                            {
                                console.error(e)
                            }
                        }
                        svgFin = svgFin + svg;
                    }

                }

                NodeCopy.copy(svgFin)

            },
            func_shape_saveSvg: async function ()
            {
                var svgFin = []
                var layerNames = []
                if (Gob.selectList.length < 2)
                {
                    await _func()
                    layerNames.push(Gob.selectList[0].name)
                } else
                {
                    var save = await enzymes.selectSave()
                    Gob.stopSelectEvent = true
                    for (var i = 0; i < Gob.selectList.length; i++)
                    {
                        await enzymes.selectLayer_byID(Gob.selectList[i].id)
                        //-----------------------
                        await _func()
                        layerNames.push(Gob.selectList[i].name)

                        //-----------------------
                    }
                    Gob.stopSelectEvent = false
                    await enzymes.selectLoad(save)
                }


                if (svgFin.length == 1)
                {

                    var result = window.cep.fs.showSaveDialogEx("保存 SVG", "", ["svg"], layerNames[0] + ".svg", "SVG");
                    if (0 == result.err)
                    {
                        if (result.data.length == 0)
                        {
                            console.log("用户放弃了保存");
                        }
                        else
                        {
                            var svaeResult = window.cep.fs.writeFile(result.data, svgFin[0]);
                        }
                    }


                } else if (svgFin.length > 1)
                {

                    var result = window.cep.fs.showOpenDialog(true, true, "选择文件夹", "", "")
                    if (0 == result.err)
                    {
                        if (result.data.length == 0)
                        {
                            console.log("用户放弃了保存");
                        }
                        else
                        {
                            console.log("result.data",result.data);
                            for (var i = 0; i < svgFin.length; i++)
                            {
                                var writePath = path.join(result.data[0], FIL.filterFileName(layerNames[i], "_")+".svg")
                                console.log("svg writePath:", writePath)
                                window.cep.fs.writeFile(writePath, svgFin[i]);

                            }

                        }
                    }


                }


                //end------------------
                async function _func()
                {
                    if (await  Proteins.exec("quick_shape_advance_copyShapeSVG") == 0)
                    {
                        var svg = NodeCopy.paste()
                        if (setSystem.ui.quick.shape_use_svgo)
                        {
                            try
                            {
                                var svgo = await svgoAsync(svg)

                                if (svgo.data != undefined)
                                {
                                    svg = svgo.data
                                }
                            } catch (e)
                            {
                                console.error(e)
                            }
                        }

                        svgFin.push(svg)
                    }

                }
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
