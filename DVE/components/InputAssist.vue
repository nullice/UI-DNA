<link rel="stylesheet" href="../bin/CSS/Ex-morphogen/exmo_main.css">
<template>


    <div class="input-assist-box {{assist_type}} {{(assist_range_max!=undefined)?'range':''}} {{input_foucs?'input_foucs':''}}">

        <!--<input type="text" @blur.stop="bl" @focus.stop="fs" >-->

        <div class="assist-range" v-if="assist_range_max!=undefined">
            <input type="range" v-model="edit_value" debounce="800" class="exmo_range" v-bind:max="assist_range_max"
                   v-bind:min="assist_range_min||0" v-bind:style="o_range_style">
            <div class="max-info">{{edit_value}} / {{assist_range_max}}</div>

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
                         v-bind:selected_func="item.selected_func"
                         v-bind:selected_func_param="getThis"
                         v-bind:in_title="item.title||''"
                         v-bind:in_class="(inline_block&&!item.block)?'inline_block':''"
                         v-bind:button="item.button"
            >
            </attr-option>
        </div>
    </div>


</template>
<style lang="scss" rel="stylesheet/scss">


    .input-assist-box.range {
        width: calc(100% - 32px);

    }

    .exmo_inbox.value_input_box .input-assist-box:not(:hover) {
        max-height: 0px;
        max-width: 0;
        transition: all .5s;
        overflow: hidden;
    }

    .exmo_inbox.value_input_box:hover .input_foucs.input-assist-box, .input-assist-box:hover {
        max-height: 999px;
        max-width: 999px;
        transition: all .3s;
        overflow: hidden;
    }

    .mini .input-assist-box.assign_normal {
        margin-left: calc(50% + 34px);
    }

    .input-assist-box.assign_normal {
        margin-left: calc(50% + 8px);
    }

    .color_input .mini .input-assist-box.assign_normal {
        margin-left: calc(50% + 42px);
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
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
            }

            .max-info {
                font-size: 9px;
                position: absolute;
                right: 12px;
                top: 18px;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.46);
            }
        }

    }


</style>
<script>
    import attrOption from "./AttributePanel_option.vue"
    import ARR from "../Caryon/Richang_JSEX/arrayARR.js"
    import OBJ from "../Caryon/Richang_JSEX/objectOBJ.js"

    export default{
        props: ["assist_type", "edit_value", "assign_value", "enable_assign", 'assist_range_max',
            'assist_range_min', 'assist_range_width', 'input_foucs', 'names', 'input_title'],
        data(){
            return {
                o_editing: false,
                inline_block: true,
                options_normal: [
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: this.info_pin,
                        button: true
                    }
                ],

                options_assign_normal: [{
                    value: 'assign_apply_same',
                    label_html: '<i class="icon-windows" style="font-size: 14px;">',
                    title: "应用所用启用的赋值项",
                    selected_func: this.assign_apply_same,
                    button: true
                }],

                options_position_x: [{
                    value: 'info_pin',
                    label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                    title: "创建变量标注",
                    selected_func: this.info_pin,
                    button: true
                }
                    , {
                        value: 'position_setCenter',
                        label_html: '<i class="icon-distribute-horizontally" style="font-size: 14px;">',
                        title: "贴靠中间",
                        selected_func: this.position_setCenter,
                        button: true
                    }

                    , {
                        value: 'position_setRight',
                        label_html: '<i class=" icon-export" style="font-size: 14px;  display: inline-block; transform: rotate(-90deg);">',
                        title: "贴靠右边",
                        selected_func: this.position_setRight,
                        button: true
                    }],

                options_position_y: [
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: this.info_pin,
                        button: true
                    }, {
                        value: 'position_setCenter',
                        label_html: '<i class="icon-distribute-vertically" style="font-size: 14px;">',
                        title: "贴靠中间",
                        selected_func: this.position_setCenter,
                        button: true
                    },
                    {
                        value: 'position_setBottom',
                        label_html: '<i class=" icon-export" style="font-size: 14px;">',
                        title: "贴靠底边",
                        selected_func: this.position_setButtom,
                        button: true
                    }],


                options_color: [
                    {
                        value: 'color_eyedropper',
                        label_html: '<i class=" icon-tool-eyedropper" style="font-size: 14px;">',
                        title: "吸管",
                        selected_func: this.color_eyedropper,
                        button: true
                    },
                    {
                        value: 'color_none',
                        label_html: '<i class="icon-checkbox-unchecked" style="font-size: 11px;">',
                        title: "无色彩",
                        selected_func: this.color_none,
                        button: true
                    },
                    {
                        value: 'ps_color_picker',
                        label_html: '<i class=" icon-workspace" style="font-size: 14px;">',
                        title: "Photoshop 的色彩选择器",
                        selected_func: this.ps_color_picker,
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
                options_boolean: [
                    {
                        value: 'boolean_true',
                        label_html: '<i class=" icon-checkmark" style="font-size: 14px;">',
                        title: "真",
                        selected_func: this.boolean_true,
                        button: true
                    },
                    {
                        value: 'boolean_false',
                        label_html: '<i class="icon-cross2" style="font-size: 11px;">',
                        title: "假",
                        selected_func: this.boolean_false,
                        button: true
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: this.info_pin,
                        button: true,
                        block: true,
                    }
                ],
                options_path: [
                    {
                        value: 'open_file',
                        label_html: '<i class=" icon-folder-open" style="font-size: 14px;">',
                        title: "打开文件",
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
                options_dashset: [
                    {
                        value: 'dashset_42',
                        label: "4,2",
                        label_html: ``,
                        title: "虚线 4,2",
                        selected_func: this.dashset_42,
                        block: true,
                        button: true
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'dashset_02',
                        label: "0,2",
                        label_html: ``,
                        title: "虚线 0,2",
                        selected_func: this.dashset_02,
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
                        selected_func: this.info_pin,
                        block: true,
                        button: true
                    }
                ],
                options_radian: [
                    {
                        value: 'radian_all',
                        label_html: '<i class=" icon-radio-unchecked" style="font-size: 14px;">',
                        title: "应用到所有圆角",
                        selected_func: this.apply_all_radian,
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

            info_pin: async function (self)
            {

                /*1 创建一个变量
                 * 2 把 assign_value 添加此变量
                 * 3 新建文本图层
                 * 4 文本图层的文本内容设置为此变量
                 * */
                /*创建变量-----------------------------*/
                var linkVarName = ""
                var _newVar = false
                if (self.assign_value == undefined || self.assign_value == "")/*没有 assign*/
                {
                    _newVar = true
                } else
                {
                    var _varNames = self.assign_value.split((/[,，]/));

                    _newVar = true
                    for (var x in _varNames)
                    {
                        if (_varNames[x][0] != '@')
                        {
                            linkVarName = _varNames[0]
                            _newVar = false
                        }
                    }
                }

                if (_newVar)
                {
                    linkVarName = "_pin_";
                    for (var i = 0; i < 71020; i++)
                    {
                        if (varSystem.vars[linkVarName + i] == undefined)
                        {
                            linkVarName = linkVarName + i;
                            varSystem.addVar(linkVarName, this.edit_value)

                            if (self.assign_value == undefined || self.assign_value == "")
                            {
                                this.assign_value = linkVarName
                            } else
                            {
                                this.assign_value += ", " + linkVarName
                            }

                            break;
                        }
                    }
                }

                this.enable_assign = true;

                /*创建图层----------------------*/

                if (this.input_title == undefined)
                {
                    var textValue = this.edit_value
                } else
                {
                    var textValue = this.input_title + ": " + this.edit_value
                }


                var relayer = await Proteins.exec("inputAssist_creatTextLayerLinkVar", {
                    name: linkVarName,
                    varName: linkVarName,
                    value: textValue,
                    positionX: null,
                    positionY: null,
                    title: this.input_title
                })


                console.info("relayer:", relayer)

                /*文本图层内容设置为变量--------------------*/
                if (relayer != undefined) //写 dataCaryon
                {
                    try
                    {
                        if (dataCaryon.layers[relayer.id] == undefined) //如果 dataCaryon 图层不存在，就创建
                        {
                            dataCaryon.addLayer(relayer);
                        }
                        console.info(`OBJ.setObjectValueByNames(dataCaryon.layers[${relayer.id}],` + `{{${linkVarName}}})`)
                        OBJ.setObjectValueByNames(dataCaryon.layers[relayer.id], ["text", "text"], `${this.input_title}: {{${linkVarName}}}`)
                        OBJ.setObjectValueByNames(dataCaryon.layers[relayer.id], ["text", "$enableTextFormula"], true)
                        dataCaryon.layerTags_addTags(relayer.id, "$pin")

                    } catch (e)
                    {
                        logger.err("info_pin:dataCaryon:", e)
                    }
                }

            },

            ps_color_picker: async function (self)
            {

                var defualtHex = ichiColor.set(this.edit_value).hex.slice(1)
                var hex = await Proteins.exec("inputAssist_photoshopColorPicker_hex", {defualtHex: defualtHex})
                if (hex != undefined)
                {
                    if (hex[0] == "#")
                    {
                        this.edit_value = hex;
                    }
                }
            },
            color_eyedropper: async function (self)
            {
                var oldColor = await Proteins.exec("inputAssist_getForegroundColor_hex")
                var editHexValue = ichiColor.set(this.edit_value).hex.slice(1)
                await Proteins.exec("inputAssist_setForegroundColor_hex", {hexValue: editHexValue})


                var selectStateSign = JSON.stringify(Gob.selectList)
                var tool = await Proteins.exec("inputAssist_getCurrentTool")
                var color = await Proteins.exec("inputAssist_getForegroundColor_hex")
                var _times = 0
                await Proteins.exec("inputAssist_setCurrentTool", {toolName: "eyedropperTool"})
                var self = this
                watchColor()


                async function watchColor()
                {
//                    console.info("watchColor:", _times)
                    _times++;

                    var now_selectStateSign = JSON.stringify(Gob.selectList)
                    var now_tool = await Proteins.exec("inputAssist_getCurrentTool")
                    var now_color = await Proteins.exec("inputAssist_getForegroundColor_hex")

                    if (now_selectStateSign != selectStateSign)
                    {
//                        console.info("watchColor_end-0",now_selectStateSign )
                        return;

                    }

                    if (now_tool != "eyedropperTool")
                    {
//                        console.info("watchColor_end-1",now_tool )
                        return;

                    }

                    if (now_color != color)
                    {
//                        console.info("watchColor_end-2",now_color )

//                        self.edit_value = now_color;
                        setTimeout(function ()
                        {
                            self.edit_value = now_color;
                        }, 300)


                        await Proteins.exec("inputAssist_setCurrentTool", {toolName: tool})
                        await Proteins.exec("inputAssist_setForegroundColor_hex", {hexValue: oldColor.slice(1)})
                        return;

                    }

                    setTimeout(watchColor, 300)
                }
            },
            color_none: function ()
            {
                this.edit_value = "#"
            },
            boolean_true: function ()
            {
                this.edit_value = "true"
            },
            boolean_false: function ()
            {
                this.edit_value = "false"
            },
            open_file: async function ()
            {
                var result = window.cep.fs.showOpenDialog(true, false, "打开一个图片", null, ["jpeg", "jpg", "bmp", "png", "gif", "psd", "psb", "svg", "eps"], "常见图片类型");

                if (result != undefined && result.data != undefined)
                {
                    console.info("open_file:result:", result.data, "result")
                    if (result.data.length == 1)
                    {
                        this.edit_value = result.data[0]
                    }
                    else if (result.data.length > 1)
                    {
                        var save = await enzymes.selectSave();
                        Gob.stopSelectEvent = true;
                        Gob.disableSelectEvent = true
                        Gob.disableRender = true
                        var ob = {linked: true};
                        var filePoint = 0

                        for (var i = 0; i < Gob.selectList.length; i++)
                        {
                            ob.link = getAfile()
                            var re = await enzymes.setLayerInfo_smartObject_byId(ob, Gob.selectList[i].id, true)
                            if (re != undefined && re.newId != undefined && re.newId != this.selectList[i].id)
                            {
                                var layerId = this.selectList[i].id
                                Gob.selectList.map(function (x)
                                {
                                    if (x.id == layerId)
                                    {
                                        x.id = re.newId
                                    }
                                })

                                if (save != undefined)
                                {
                                    save = save.map(function (x)
                                    {
                                        if (x == layerId)
                                        {
                                            return re.newId
                                        } else
                                        {
                                            return x
                                        }
                                    })
                                }
                            }
                        }


                        function getAfile()
                        {
                            if (filePoint >= result.data.length)
                            {
                                filePoint = 0
                            }

                            return result.data[filePoint++]
                        }

                        Gob.stopSelectEvent = false;
                        Gob.disableSelectEvent = false
                        Gob.disableRender = false
                        await enzymes.selectLoad(save);

                    }
                }
                ;
            },

            apply_all_radian: async function ()
            {
                Gob.shape.radian.topLeft = this.edit_value
                Gob.shape.radian.topRight = this.edit_value
                Gob.shape.radian.bottomLeft = this.edit_value
                Gob.shape.radian.bottomRight = this.edit_value
            },


            position_setRight: async function ()
            {
                var reg = /(bottom\()|(center\()/
                var str = _.trim(this.edit_value)
                var reg_Name =/^[@$￥]/
                if (reg_Name.test(str))
                {
                    str = `right(${str} - 0)`
                    this.edit_value = str

                } else if (reg.test(str))
                {
                    var reg2 = /center\(/
                    if (reg2.test(str))
                    {
                        var reg2 = /\(.+[,，]/
                        str = str.replace(reg2, "(")
                    }

                    str = str.replace(reg, "right(")

                    this.edit_value = str
                }
                else
                {

                    UI_action.show_message_bubble("att_panel", "", Lang.from("需要对象变量的表达式 @ "))
                }
            },
            position_setButtom: async function ()
            {
                var reg = /(right\()|(center\()/
                var str = _.trim(this.edit_value)
                var reg_Name =/^[@$￥]/
                if (reg_Name.test(str))
                {
                    str = `bottom(${str} - 0)`
                    this.edit_value = str

                } else if (reg.test(str))
                {
                    var reg2 = /center\(/
                    if (reg2.test(str))
                    {
                        var reg2 = /\(.+[,，]/
                        str = str.replace(reg2, "(")
                    }


                    str = str.replace(reg, "bottom(")

                    this.edit_value = str
                } else
                {
                    UI_action.show_message_bubble("att_panel", "", Lang.from("需要对象变量的表达式 @ "))
                }
            },
            position_setCenter: async function ()
            {

                var reg = /(right\()|(bottom\()/
                var reg_Name =/^[@$￥]/

                var str = _.trim(this.edit_value)
                if (reg_Name.test(str))
                {
                    str = `center( 1/2, ${str})`
                    this.edit_value = str

                } else if (reg.test(str))
                {
                    str = str.replace(reg, "center(")
                    this.edit_value = str
                } else
                {
                    UI_action.show_message_bubble("att_panel", "", Lang.from("需要对象变量的表达式 @ "))
                }
            },


            assign_apply_same: function ()
            {
                var self = this

                for (var z in Gob)
                {
                    if (Gob[z].enableAssigns != undefined)
                    {
                        _apply(z)
                    }
                }
                function _apply(item)
                {
                    for (var x in Gob[item].enableAssigns)
                    {
                        if (Gob[item].enableAssigns[x])
                        {
                            Gob[item].assignment[x] = self.edit_value
                        }

                    }

                }
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
                    } else if (this.assist_type == "dashset")
                    {
                        return this.options_dashset

                    } else if (this.assist_type == "radian")
                    {
                        return this.options_radian
                    }
                    else if (this.assist_type == "position_x")
                    {
                        return this.options_position_x
                    }
                    else if (this.assist_type == "position_y")
                    {
                        return this.options_position_y
                    }
                    else if (this.assist_type == "assign_normal")
                    {
                        return this.options_assign_normal
                    }
                    return this.options_normal;
                },
            },
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
                            width: "calc(100% - 30px);"
                        }
                    }
                },
            },

            getThis: {
                get: function ()
                {
                    return this;
                },
            }
        },
        components: {
            "attr-option": attrOption
        }


    }
</script>
