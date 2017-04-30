/**
 * Created by bgllj on 2016/9/7.
 */
import ARR from "./Richang_JSEX/arrayARR.js"
import TYP from "./Richang_JSEX/typeTYP.js"
var zlib = require("zlib")

/**
 * Gob，选中图层。接管对选中图层的操作，把对 Gob 的操作分发给每个选中图层
 * 每当有选中图层方式变化，会执行 Gob.updateSelect
 *
 * @returns {GobCaryon}
 * @constructor
 */
var GobCaryon = function ()
{
    this.selectList = [];
    this.selectTypes = {
        bitmap: false,
        text: false,
        shape: false,
        smartObject: false,
        layerSet: false
    }
    /*当前选中图层类型，相应属性为真表示有此种类型图层被选中*/

    this.selectTime = 0;
    /* selectUpdate() 更新计数，可用于监控选中图层刷新事件*/

    this._unripe = true;//未准备好，不渲染。

    this.selectRender = false; //选择图层后渲染
    this.selectRenderVarList = false; //渲染改变的变量列表
    this.selectChanged = false;
    this.selectUpdateing = false;
    this.disableRender = false //不渲染
    this.disableAttrPanel = false //AttrPanel 关闭了，不需要更新


    this.nowSwitching = false;//是否在切换选中图层中
    this.stopSelectEvent = false;//不触发选择图层事件

    // //----异步赋值计数器
    // this.__asyncSetCounter = 0;
    // this._asyncSetSwitch = false;
    // Object.defineProperty(this, "_asyncSetCounter",
    //     {
    //
    //         set: function (x)
    //         {
    //             if (x < 0) x = 0;
    //             this.__asyncSetCounter = x;
    //             // console.info("_asyncSetCounter:", this.__asyncSetCounter)
    //             if (x == 0 && this._asyncSetSwitch)
    //             {
    //                console.group("__asyncSetCounter")
    // console.log("【this.nowSwitching = false】")
    // this.nowSwitching = false;
    // this._asyncSetSwitch = false;
    //
    // //----------------更新图层后渲染
    // console.log("this.selectRender:", this.selectRender, " varSystem.autoRender", setSystem.autoRender, " selectChanged:", this.selectChanged,
    //     " renderCaryon.status.rendering:", renderCaryon.status.rendering,
    // )
    // console.log("this.selectRenderVarList:", this.selectRenderVarList)
    // if (this.selectRender && setSystem.autoRender && !this.selectChanged && !renderCaryon.status.rendering)
    // {
    //     if (this.selectRenderVarList != undefined && this.selectRenderVarList.length > 0)
    //     {
    //         console.log("更新图层后渲染")
    //         // renderCaryon.renderDocument(true, this.selectRenderVarList)
    //     }
    // }
    // console.groupEnd();
    //             }
    //         },
    //         get: function ()
    //         {
    //             return this.__asyncSetCounter;
    //         }
    //     }
    // );


    //属性注册[1/8]
    this.position = this.__new_position();
    this.text = this.__new_text();
    this.shape = this.__new_shape();
    this.smartObject = this.__new_smartObject();
    this.quickEffect = this.__new_quickEffect();
    this.more = this.__new_more();


    //属性注册[2/8]
    //------------注册 getter 和 setter
    var root = this;
    giveSetter(this.position, ["position"], 1);
    giveSetter(this.text, ["text"], 1);
    giveSetter(this.shape, ["shape"], 1);
    giveSetter(this.smartObject, ["smartObject"], 1);
    giveSetter(this.quickEffect, ["quickEffect"], 1);
    giveSetter(this.more, ["more"], 1);


    return this;


    // END
    function giveSetter(object, names, index)
    {
        for (var z in object)
        {
            if (z[0] == "_")
            {
                continue;
            }
            var isObject
            if (object[z] == undefined)
            {
                isObject = false;
            } else
            {
                if (object[z].constructor == Object)
                {
                    isObject = true;
                }
                else
                {
                    isObject = false;
                }
            }

            if (isObject)
            {
                giveSetter(object[z], names.concat(z), index + 1);
            } else
            {
                Object.defineProperty(object, z, _doSET(z, names.concat(z), object[z], root));
            }
        }


        function _doSET(objectName, names, value, root)
        {
            _valueToObject(root, names, 0, value, true)//值写入 _XXX
            var s = new Function("x", `Gob._setData(${JSON.stringify(names)} , x )`);
            var g = new Function(` return Gob._getData(${JSON.stringify(names)} )`);
            var ob = {
                set: s,
                get: g
            }
            return ob;
        }

    }

}

//属性注册[3/8]
GobCaryon.prototype.__new_position = function ()
{
    return {
        x: null,
        y: null,
        w: null,
        h: null,
        $anchor: null,
        assignment: {x: null, y: null, w: null, h: null, $anchor: null},
        enableAssigns: {x: null, y: null, w: null, h: null, $anchor: null}
    }
}
GobCaryon.prototype.__new_text = function ()
{
    return {
        text: null,
        color: {r: null, g: null, b: null, $hex: null},
        size: null, /*字体尺寸*/
        fontPostScriptName: null, /*字体*/
        bold: null, /*仿粗体*/
        italic: null, /*仿斜体*/
        antiAlias: null, /*消除锯齿方式*/
        underline: null, /*下划线类型*/
        justification: null, /*段落对齐方式*/
        leading: null, /*行距*/
        tracking: null, /*字符间距*/
        baselineShift: null, /*基线偏移*/
        horizontalScale: null, /*水平缩放*/
        verticalScale: null, /*垂直缩放*/
        $enableTextFormula: null,
        assignment: {
            text: null,
            $enableTextFormula: null,
            color: null,
            size: null, /*字体尺寸*/
            fontPostScriptName: null, /*字体*/
            bold: null, /*仿粗体*/
            italic: null, /*仿斜体*/
            antiAlias: null, /*消除锯齿方式*/
            underline: null, /*下划线类型*/
            justification: null, /*段落对齐方式*/
            leading: null, /*行距*/
            tracking: null, /*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale: null, /*水平缩放*/
            verticalScale: null, /*垂直缩放*/
            $enableFormula: null,
        },
        enableAssigns: {
            text: null,
            $enableTextFormula: null,
            color: null, size: null, /*字体尺寸*/
            fontPostScriptName: null, /*字体*/
            bold: null, /*仿粗体*/
            italic: null, /*仿斜体*/
            antiAlias: null, /*消除锯齿方式*/
            underline: null, /*下划线类型*/
            justification: null, /*段落对齐方式*/
            leading: null, /*行距*/
            tracking: null, /*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale: null, /*水平缩放*/
            verticalScale: null, /*垂直缩放*/
        }
    }
}
GobCaryon.prototype.__new_shape = function ()
{
    return {
        strokeColor: {r: null, g: null, b: null, $hex: null}, /*描边颜色*/
        strokeColorEnabled: null, /*启用描边*/
        fillColor: {r: null, g: null, b: null, $hex: null}, /*填充颜色*/
        fillColorEnabled: null, /*启用填充*/
        lineWidth: null, /*边线宽度*/
        dashSet: null, /*虚线设置*/
        lineAlignment: null, /*描边选项-对齐*/
        lineCapType: null, /*描边选项-端点*/
        lineJoinType: null, /*描边选项-角点*/
        shapeSize: {x: null, y: null, h: null, w: null}, /*形状尺寸*/
        radian: {
            /*圆角*/
            topRight: null,
            topLeft: null,
            bottomRight: null,
            bottomLeft: null,
        },
        assignment: {
            strokeColor: null,
            strokeColorEnabled: null,
            fillColor: null,
            fillColorEnabled: null, /*启用填充*/
            lineWidth: null, /*边线宽度*/
            dashSet: null, /*虚线设置*/
            lineAlignment: null, /*描边选项-对齐*/
            lineCapType: null, /*描边选项-端点*/
            lineJoinType: null, /*描边选项-角点*/
            shapeSize: {x: null, y: null, h: null, w: null},
            radian: {
                /*圆角*/
                topRight: null,
                topLeft: null,
                bottomRight: null,
                bottomLeft: null,
            }
        },
        enableAssigns: {
            strokeColor: null,
            strokeColorEnabled: null,
            fillColor: null,
            fillColorEnabled: null, /*启用填充*/
            lineWidth: null, /*边线宽度*/
            dashSet: null, /*虚线设置*/
            lineAlignment: null, /*描边选项-对齐*/
            lineCapType: null, /*描边选项-端点*/
            lineJoinType: null, /*描边选项-角点*/
            shapeSize: {x: null, y: null, h: null, w: null},
            radian: {
                /*圆角*/
                topRight: null,
                topLeft: null,
                bottomRight: null,
                bottomLeft: null,
            }
        }
    }
}


GobCaryon.prototype.__new_smartObject = function ()
{
    return {
        linked: null, /*是否为链接对象*/
        link: null, /*链接地址*/
        fileReference: null, /*链接文件名*/
        assignment: {linked: null, link: null, fileReference: null},
        enableAssigns: {linked: null, link: null, fileReference: null}
    }
}

GobCaryon.prototype.__new_quickEffect = function ()
{
    return {
        dropShadow: {
            enable: null,
            color: {r: null, g: null, b: null, $hex: null}, /*填充颜色*/
            opacity: null, /*透明度*/
            x: null,
            y: null,
            blur: null, /*大小*/
            spread: null, /*扩展*/
        },
        copyEffect_All: null,
        copyEffect_dropShadow: null, /*阴影*/
        copyEffect_innerShadow: null, /*内阴影*/
        copyEffect_chromeFX: null, /*等高线*/
        copyEffect_frameFX: null, /*纹理*/
        copyEffect_bevelEmboss: null, /*斜面与浮雕*/
        copyEffect_innerGlow: null, /*内发光*/
        copyEffect_outerGlow: null, /*外发光*/
        copyEffect_patternFill: null, /*内部填充*/
        copyEffect_solidFill: null, /*描边*/
        copyEffect_gradientFill: null, /*渐变*/


        assignment: {
            dropShadow: {
                enable: null,
                color: null, /*填充颜色*/
                opacity: null, /*透明度*/
                x: null,
                y: null,
                blur: null, /*大小*/
                spread: null, /*扩展*/
            },
            copyEffect_All: null,
            copyEffect_dropShadow: null, /*阴影*/
            copyEffect_innerShadow: null, /*内阴影*/
            copyEffect_chromeFX: null, /*等高线*/
            copyEffect_frameFX: null, /*纹理*/
            copyEffect_bevelEmboss: null, /*斜面与浮雕*/
            copyEffect_innerGlow: null, /*内发光*/
            copyEffect_outerGlow: null, /*外发光*/
            copyEffect_patternFill: null, /*内部填充*/
            copyEffect_solidFill: null, /*描边*/
            copyEffect_gradientFill: null, /*渐变*/
        },
        enableAssigns: {
            dropShadow: {
                enable: null,
                color: null, /*填充颜色*/
                opacity: null, /*透明度*/
                x: null,
                y: null,
                blur: null, /*大小*/
                spread: null, /*扩展*/
            },
            copyEffect_All: null,
            copyEffect_dropShadow: null, /*阴影*/
            copyEffect_innerShadow: null, /*内阴影*/
            copyEffect_chromeFX: null, /*等高线*/
            copyEffect_frameFX: null, /*纹理*/
            copyEffect_bevelEmboss: null, /*斜面与浮雕*/
            copyEffect_innerGlow: null, /*内发光*/
            copyEffect_outerGlow: null, /*外发光*/
            copyEffect_patternFill: null, /*内部填充*/
            copyEffect_solidFill: null, /*描边*/
            copyEffect_gradientFill: null, /*渐变*/
        }
    }
}

GobCaryon.prototype.__new_more = function ()
{
    return {
        layerName: null, /*图层名*/
        $alias: null, /*别名*/
        $nameGroup0: null, /*名称组*/
        $nameGroup1: null,
        $nameGroup2: null,
        $nameGroup3: null,
        $nameGroup4: null,
        $nameGroup5: null,
        $nameGroup6: null,
        $nameGroup7: null,
        $nameGroup8: null,
        $nameGroup9: null,
        $class: null, /*图层类*/
        $tags: null, /*标签*/
        $note1: null, /*图层备注1*/
        $note2: null, /*图层备注1*/
        $note3: null, /*图层备注1*/
        visible: null, /*图层可视性*/
        layerColor: null, /*图层备注颜色*/
        mode: null, /*混合模式*/
        opacity: null, /*不透明度*/
        fillOpacity: null, /*填充不透明度*/

        assignment: {
            layerName: null, /*图层名*/
            $alias: null, /*别名*/
            $nameGroup0: null, /*名称组*/
            $nameGroup1: null,
            $nameGroup2: null,
            $nameGroup3: null,
            $nameGroup4: null,
            $nameGroup5: null,
            $nameGroup6: null,
            $nameGroup7: null,
            $nameGroup8: null,
            $nameGroup9: null,
            $class: null, /*图层类*/
            $tags: null, /*标签*/
            $note1: null, /*图层备注1*/
            $note2: null, /*图层备注1*/
            $note3: null, /*图层备注1*/
            visible: null, /*图层可视性*/
            layerColor: null, /*图层备注颜色*/
            mode: null, /*混合模式*/
            opacity: null, /*不透明度*/
            fillOpacity: null, /*填充不透明度*/
        },

        enableAssigns: {
            layerName: null, /*图层名*/
            $alias: null, /*别名*/
            $nameGroup0: null, /*名称组*/
            $nameGroup1: null,
            $nameGroup2: null,
            $nameGroup3: null,
            $nameGroup4: null,
            $nameGroup5: null,
            $nameGroup6: null,
            $nameGroup7: null,
            $nameGroup8: null,
            $nameGroup9: null,
            $class: null, /*图层类*/
            $tags: null, /*标签*/
            $note1: null, /*图层备注1*/
            $note2: null, /*图层备注1*/
            $note3: null, /*图层备注1*/
            visible: null, /*图层可视性*/
            layerColor: null, /*图层备注颜色*/
            mode: null, /*混合模式*/
            opacity: null, /*不透明度*/
            fillOpacity: null, /*填充不透明度*/
        }
    }
}


/** setter , 设置 Gob 属性值
 *
 * @param names 属性名路径列表，如 [position,enableAssigns,y]
 * @param value 要设置的值
 * @param onlySet 仅仅设置而不执行其他操作
 * @returns {Promise.<void>}
 * @private
 */
GobCaryon.prototype._setData = async function (names, value, onlySet)
{

    // console.log(`_setData([${names}], ${value}):`)
    var isFormula = false;
    var doDocumentRender = false;
    var varUpdatelist = [];


    //-------- 【1】. 值写入实际存储的属性 this._XXX;
    var changeValue_Gob = _valueToObject(this, names, 0, value, true);

    if (onlySet)
    {
        return;
    }

    if (value == Gob.MULT)
    {
        return;
    }

    //属性注册[4/8]

    //-------- 2. 判断是否应该写入 dataCaryon ; 变量、表达式、自定义属性将写入dataCaryon
    /* 写入 dataCaryon 的情况：
     *  1. 属性值含有表达式
     *  2. 内置属性（$开头的属性）
     * */

    var flag_writeDataCaryon = false;//是否应该写入 dataCaryon
    var isVoidValue = false//是否是空值
    var isTypeText = false//是否是类型文本
    var isAssignment = false// 是否是“变量赋值命令”属性


    var _typeText_typeName = null//类型文本的类型

    var isText = false//是否是文本类型的值
    var _lastName = names[names.length - 1] //最终要设置的属性名称
    var _lastButOneName = names[names.length - 2] //最终属性前一个属性名称（倒数第二个属性名）

    if (value === "") //判断是否是空值
    {
        isVoidValue = true;
        /************************/
        flag_writeDataCaryon = true;
        /************************/
    } else
    {
        //0. 变量赋值属性
        if (names[1] == "assignment" || names[1] == "enableAssigns")
        {
            isAssignment = true;
            /************************/
            flag_writeDataCaryon = true;
            /************************/
        }
        //1. 文本值-------------------------------------------------
        else if (_lastName == "text") //文本
        {
            if (TYP.type(value) == "string")
            {
                // console.info("_getObjectValueByNames(this, names, 1).$enableTextFormula", _getObjectValueByNames(this, names, 1).$enableTextFormula)
                if (_getObjectValueByNames(this, names, 1).$enableTextFormula)//检查是否启用了文本表达式
                {
                    var _enableTextFormula = true
                } else
                {
                    var _enableTextFormula = false
                }

                if (_enableTextFormula)//文本表达式
                {
                    /************************/
                    flag_writeDataCaryon = true;
                    /************************/
                }
            }
        }
        //2. 内置属性------------------------------------------------
        else if (_lastName[0] === "$")
        {
            var _writeData = true;

            if (_lastName == "$hex") //$hex 属性不写入 dataCaryon，只作为颜色改变的触发属性
            {

                _writeData = false
                if (value == undefined)
                {
                    _writeData = true;

                } else
                {
                    if (value[0] != "#")
                    {
                        _writeData = true;
                        isFormula = true
                    }
                }
            }

            if (_lastName == "$enableTextFormula")
            {
                if (value == true)
                {
                    var temp = this.text.text;
                    this.text.text = ""
                    this.text.text = temp
                }
                else
                {
                    this.text.text = ""
                }
            }


            if (_lastName == "$anchor")
            {
                setSystem.gob.$anchor = +value
            }


            if (_writeData)
            {
                /************************/
                flag_writeDataCaryon = true;
                /************************/
            }

        }
        else
        {
            //3. 类型文本------------------------------------------------
            var _typeDefine = {
                boolean: {
                    type: "boolean",//属性名称
                    nameList: ["bold", "italic", "strokeColorEnabled", "fillColorEnabled", "linked", 'visible'
                        , "enable"], //这些名字的属性使用这一类型
                    valueEnum: ["true", "false", true, false], //当值为这些时被判定为类型文本
                    judgementFunc: null //自定义判断函数，不指定 valueEnum ，使用一个函数判断 value 是否是一个类型文本
                },
                underline: {
                    type: "underline",
                    nameList: ["underline"],
                    valueEnum: ["underlineOff", "underlineOnLeftInVertical", "underlineOnRightInVertical",
                        "verticalUnderlineLeft", "verticalUnderlineRight"]
                },
                justification: {
                    type: "justification",
                    nameList: ["justification"],
                    valueEnum: ["center", "right", "left",
                        "justifyAll", "justifyLeft", "justifyRight"]
                },
                lineJoinType: {
                    type: "lineJoinType",
                    nameList: ["lineJoinType"],
                    valueEnum: ["strokeStyleMiterJoin", "strokeStyleRoundJoin", "strokeStyleBevelJoin"]
                },
                lineCapType: {
                    type: "lineCapType",
                    nameList: ["lineCapType"],
                    valueEnum: ["strokeStyleButtCap", "strokeStyleRoundCap", "strokeStyleSquareCap"]
                },
                lineAlignment: {
                    type: "lineAlignment",
                    nameList: ["lineAlignment"],
                    valueEnum: ["strokeStyleAlignInside", "strokeStyleAlignCenter", "strokeStyleAlignOutside"]
                },
                antiAlias: {
                    type: "antiAlias",
                    nameList: ["antiAlias"],
                    valueEnum: null,
                    judgementFunc: function (value)
                    {
                        if (value != undefined)
                        {
                            if (value.slice(0, 9) == "antiAlias")
                            {
                                return true;
                            } else
                            {
                                return false;
                            }

                        }
                    }
                },
                pathText: {
                    type: "pathText",
                    nameList: ["link", "fileReference", 'layerName', 'fontPostScriptName'],
                    valueEnum: null,
                    judgementFunc: function (value)
                    {
                        if (value != undefined)
                        {
                            if (value[0] == ">")//>开头的路径要要经过变量处理
                            {
                                return false;
                            } else
                            {
                                return true;
                            }
                        }
                    }
                },
                rgnColor: {
                    type: "rgnColor",
                    nameList: ["r", "g", 'b'],
                    valueEnum: null,
                    judgementFunc: function (value)
                    {
                        return true
                    }
                },
                mode: {
                    type: "mode",
                    nameList: ["mode"],
                    valueEnum: ['normal', 'darken', 'dissolve', 'multiply', 'colorBurn', 'linearBurn', 'darkerColor',
                        'lighten', 'screen', 'colorDodge', 'linearDodge', 'lighterColor', 'overlay', 'softLight',
                        'hardLight', 'vividLight', 'linearLight', 'pinLight', 'hardMix', 'difference', 'exclusion',
                        'blendSubtract', 'blendDivide', 'hue', 'saturation', 'color', 'luminosity',]
                },

                layerColor: {
                    type: "layerColor",
                    nameList: ["layerColor"],
                    valueEnum: ['none', 'red', 'orange', 'yellowColor', 'grain', 'blue', 'violet', 'gray',]
                },


            }
            __checkTypeText(_typeDefine)

            //  -------------定义数据和方法：
            function __checkTypeText(_typeDefine)
            {

                for (var i in _typeDefine)
                {
                    var isType = ARR.hasMember(_typeDefine[i].nameList, _lastName);
                    if (isType)
                    {
                        if (_typeDefine[i].judgementFunc != undefined)
                        {
                            if (_typeDefine[i].judgementFunc(value))
                            {
                                isTypeText = true;
                                _typeText_typeName = _typeDefine[i].type
                                break;
                            }
                        }
                        else
                        {

                            if (ARR.hasMember(_typeDefine[i].valueEnum, value))
                            {
                                isTypeText = true;
                                _typeText_typeName = _typeDefine[i].type
                                break;

                            }
                        }
                    }
                }
            }

            //  END类型文本-------------------------------------------------

            //4. 变量表达式------------------------------------------------
            if (isTypeText == false)
            {
                if (varSystem.isFormula(value)) //只写入公式变量
                {
                    isFormula = true;
                    /************************/
                    flag_writeDataCaryon = true;
                    /************************/
                }
            }
            //5. 值------------------------------------------------
            /**/
        }
    }
    // console.log("flag_writeDataCaryon", flag_writeDataCaryon)
    // console.log("isFormula", isFormula)
    // console.log("isTypeText", isTypeText)

    //-------- 【3】. 把值分发到每个选中图层的 dataCaryon ，;
    var rendered = false;


    //1.保存选中图层状态
    if (this.selectList.length > 1)
    {
        var save = await enzymes.selectSave();
    }

    // console.info("-----------------------------------------selectList:", JSON.stringify(this.selectList))
    //2.每个图层执行一次分发操作：
    for (var i = 0; i < this.selectList.length; i++)
    {
        dataCaryon.info.status.saved = false;

        var changeValue_dataCaryon = false;// 是否改变了 dataCaryon 里原有的值
        //写入 dataCaryon
        if (flag_writeDataCaryon === true && (value != undefined))
        {
            // console.info("[[[writeDataCaryon]]]]]" + this.selectList[i].id, ":[", names, "] ", value)
            if (dataCaryon.layers[this.selectList[i].id] == undefined)//如果 dataCaryon 图层不存在，就创建
            {
                dataCaryon.addLayer(this.selectList[i]);
            }
            changeValue_dataCaryon = _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, value)
            if (changeValue_dataCaryon === "delete")
            {
                // console.info("[[[deleteDataCaryon]]]]]", dataCaryon.layers[this.selectList[i].id] == undefined, "id:", this.selectList[i].id, ":[", names, "] ", value)
            }


        }
        else//删除 dataCaryon 值
        {

            if (dataCaryon.layers[this.selectList[i].id] != undefined)
            {
                var result = _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, "", null, true)
                if (result === "delete")
                {
                    // console.info("[[[deleteDataCaryon]]]]]", dataCaryon.layers[this.selectList[i].id] == undefined, "id:", this.selectList[i].id, ":[", names, "] ", value)
                }

            }

        }


        // 即时修改-------------------------------------------------------------------------------------------
        // console.log("isFormula :" + isFormula + "  change:" + changeValue_Gob + "  change_i:" + changeValue_dataCaryon)
        // console.log(changeValue_dataCaryon, changeValue_Gob, isFormula)
        // console.log("this.nowSwitching =" + this.nowSwitching + "    " + names + "=>" + value)

        //统一渲染
        var renderOnce = false
        if (this.selectList.length > 1)
        {
            if (ARR.hasMember(["text", "shape",], names[0]))
            {
                if (_lastName != "text" && _lastButOneName != "shapeSize")
                {
                    renderOnce = true
                }

            }
            if (ARR.hasMember(["layerColor", "opacity", "fillOpacity", "mode", "visible"], _lastName))
            {
                renderOnce = true
            }
        }


        if (renderOnce == false)
        {
            if ((this.nowSwitching == false) && (this.disableRender != true) && (value != Gob.MULT))
            {
                if (names[1] != "assignment" && names[1] != "enableAssigns")
                {
                    if (changeValue_dataCaryon || changeValue_Gob)
                    {
                        doDocumentRender = true;
                        if ((isAssignment != true) && (isVoidValue != true))
                        {
                            console.log("【START】renderPatch--------" + names + "=>" + value)
                            rendered = true;

                            //-----------------------------------------------------------------
                            if (isFormula) //如果是变量表达式先解析"普通变量"
                            {
                                var finValue = await varSystem.evalVar(value, this.selectList[i].id, names)
                            }
                            else if (_enableTextFormula)
                            {
                                console.info("_enableTextFormula", _enableTextFormula)
                                var finValue = await varSystem.evalFormulasInText(value, this.selectList[i].id)
                            }
                            else
                            {
                                var reg = /[\+\-\*\/\%\(\)\!\^\?\:\>\<]/
                                var finValue = await varSystem.evalVar(value, this.selectList[i].id, names)
                            }
                            //-----------------------------------------------------------------

                            console.log(`renderCaryon.renderPatch(${this.selectList[i].id}, ${names}, ${finValue}, ${true})`)

                            try
                            {
                                var re = await renderCaryon.renderPatch(this.selectList[i].id, names, finValue, false)
                                if (re != undefined && re.newId != undefined && re.newId != this.selectList[i].id)
                                {
                                    var layerId = this.selectList[i].id
                                    Gob.selectList.map(function (x)
                                    {
                                        if (x.id == layerId)
                                        {
                                            x.id = re.newId
                                            x.type.typeName = "smartObject"
                                            x.type.layerKind = 5

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
                            } catch (e)
                            {
                                console.error("Gob._set()", e)
                            }


                            console.log("【END】renderPatch------" + names + "=>" + finValue)
                        }

                    }
                }
            }
        }

    }


    if (renderOnce)
    {
        if ((this.nowSwitching == false) && (this.disableRender != true) && (value != Gob.MULT))
        {
            if (names[1] != "assignment" && names[1] != "enableAssigns")
            {
                if (changeValue_dataCaryon || changeValue_Gob)
                {
                    doDocumentRender = true;
                    if ((isAssignment != true) && (isVoidValue != true))
                    {
                        console.log("【START】[renderOnce] renderPatch--------" + names + "=>" + value)
                        rendered = true;

                        //-----------------------------------------------------------------
                        if (isFormula) //如果是变量表达式先解析"普通变量"
                        {
                            var finValue = await varSystem.evalVar(value, this.selectList[0].id, names)
                        }
                        else if (_enableTextFormula)
                        {
                            console.info("_enableTextFormula", _enableTextFormula)
                            var finValue = await varSystem.evalFormulasInText(value, this.selectList[0].id)
                        }
                        else
                        {
                            var finValue = value;
                        }
                        //-----------------------------------------------------------------
                        console.log(`[renderOnce] renderCaryon.renderPatch(${-1020}, ${names}, ${finValue}, ${true})`)
                        try
                        {
                            await renderCaryon.renderPatch(-1020, names, finValue, true)
                        } catch (e)
                        {
                            logger.err("[renderOnce] Gob._set()", e)
                        }
                        console.log("【END】[renderOnce] renderPatch------" + names + "=>" + finValue)
                    }

                }
            }
        }
    }


//3.自动渲染文档:
//     if (setSystem.autoRender && this.disableRender != true)
//     {
//         if (this[names[0]]["enableAssigns"][names[names.length - 1]])
//         {
//             console.log("autoRender", (changeValue_dataCaryon || changeValue_Gob), this[names[0]]["enableAssigns"][names[names.length - 1]], names)
//             if (value != Gob.MULT && (changeValue_dataCaryon || changeValue_Gob))
//             {
//                 var _assign = this[names[0]]["assignment"][names[names.length - 1]];
//
//                 console.log("_assign:", _assign)
//                 if (_assign != undefined)
//                 {
//                     varUpdatelist = _assign.split((/[,，]/));
//                     console.log("varUpdatelist", varUpdatelist)
//                     if (varUpdatelist.length > 0)
//                     {
//                         if (doDocumentRender)
//                         {
//                             renderCaryon.renderDocument(true, varUpdatelist)
//                         } else
//                         {
//                             this.selectRender = true;
//                             this.selectRenderVarList = this.selectRenderVarList.concat(varUpdatelist);
//
//                         }
//                     }
//                 }
//             }
//         }
//     }


// 4.恢复选中图层状态
    if (this.selectList.length > 1)
    {
        if (rendered)
        {
            var save2 = await enzymes.selectSave();

            if (ARR.difference(save, save2).length != 0)
            {

                await enzymes.selectLoad(save);

            }
        }
    }


    // if (re != undefined)
    // {
    //     if (re.needUpdateGob)
    //     {
    //         Gob.updateGob(true);
    //     }
    // }
    Gob._asyncSetCounter--;


}


/**
 *  getter ，获取 Gob 属性值
 * @param names
 * @returns {*}
 * @private
 */
GobCaryon.prototype._getData = function (names)
{
    function _valueFromObject(fromObject, names, nameIndex, prefix)
    {
        var isLastName = nameIndex == names.length - 1
        if (isLastName)
        {
            if (prefix)
            {
                return fromObject["_" + names[nameIndex]];
            } else
            {
                return fromObject[names[nameIndex]];
            }
        } else
        {
            return _valueFromObject(fromObject[names[nameIndex]], names, nameIndex + 1, prefix)
        }
    }

    return _valueFromObject(this, names, 0, true);
}


/**
 * 更新选中图层。会触发 GobCaryon.updateGob()                                                                                                                                                                                                                                                                                                                                                           。
 */
GobCaryon.prototype.updateSelect = async function ()
{


    if (this.disableSelectEvent)// 如果设置了停止选择更新开关则返回
    {
        return;
    }

    if (this.stopSelectEvent)// 如果设置了停止选择更新开关则返回
    {
        return;
    }

    if (this.selectUpdateing)// 如果另外的更新未结束则返回。
    {
        return;
    }


    if (dataCaryon.layers == undefined)
    {
        await  dataCaryon.switchDocment(true)
    }


    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "【开始】选中图层周期 [updateSelect]--------------------")
    logger.group("%c[updateSelect]", "color:#09ae9d;")


    this.selectUpdateing = true; //标志正在更新选中图层
    this.nowSwitching = true;     //标志切换
    this.selectRender = false;
    this.selectRenderVarList = [];
    console.log("【this.nowSwitching = true】")

    //判断选中图层是否有改变

    var newList = (await enzymes.getSelectLayerArray()).reverse();//"获取图层"

    this.selectChanged = ((ARR.symDifference_ObjectArray(newList, this.selectList, "id")).length > 0);
    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "selectChanged:", this.selectChanged)
    this.selectList = newList;
    if (this.selectChanged)
    {
        this.selectTime++;
    }

    // 更新 Gob.selectTypes
    for (var x in this.selectTypes)
    {
        this.selectTypes[x] = false
    }

    for (var i = 0; i < this.selectList.length; i++)
    {
        for (var x in this.selectTypes)
        {
            if (this.selectList[i].type.typeName == x)
            {
                this.selectTypes[x] = true;
            }
        }
    }


    //******************
    try
    {

        if (this.disableAttrPanel != true)// AttrPanel 关闭了，不需要更新
        {
            await this.updateGob();
        }

    } catch (e)
    {
        logger.pin("Gob", "GobCaryon.prototype.updateSelect():updateGob() ", "updateGob")
    }

    //******************
    // }

    this.selectUpdateing = false;
    console.log("selectUpdateing:false")
    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "【结束】选中图层周期 [updateSelect]--------------------")
    console.groupEnd()
}


/*------------------------------------------------------------------*/


GobCaryon.prototype.getLayerInfoObejct_position = async function (layerId)
{
    //[position]---------------------------------------------------------------
    var item_position = this.__new_position();

    try
    {
        var position = await enzymes.getLayerInfo_position_byId(layerId)
        item_position.x = position.x
        item_position.y = position.y
        item_position.w = position.w
        item_position.h = position.h

    } catch (e)
    {
        console.error("GobCaryon.getLayerInfoObejct_position id:", layerId, e)
    }


    return item_position
}


GobCaryon.prototype.getLayerInfoObejct_text = async function (layerId)
{
    //[text]---------------------------------------------------------------
    var item_text = this.__new_text();


    try
    {
        var text = await enzymes.getLayerInfo_text_byId(layerId);
        item_text.text = text.text;
        this._setTypeColor(item_text.color, text.color)
        item_text.size = text.size;
        item_text.fontPostScriptName = text.fontPostScriptName;
        item_text.bold = text.bold;
        item_text.italic = text.italic;
        item_text.antiAlias = text.antiAlias;
        item_text.underline = text.underline;
        item_text.justification = text.justification;
        item_text.leading = text.leading;
        item_text.tracking = text.tracking;
        item_text.baselineShift = text.baselineShift;
        item_text.horizontalScale = text.horizontalScale;
        item_text.verticalScale = text.verticalScale;
    } catch (e)
    {
        console.error("GobCaryon.getLayerInfoObejct_text id:", layerId, e)
    }
    return item_text
}


GobCaryon.prototype.getLayerInfoObejct_shape = async function (layerId)
{
    // [shape]---------------------------------------------------------------
    var item_shape = this.__new_shape();


    try
    {
        var shape = await enzymes.getLayerInfo_shape_byId(layerId);
        item_shape.strokeColorEnabled = shape.strokeColorEnabled;
        this._setTypeColor(item_shape.strokeColor, shape.strokeColor);
        item_shape.fillColorEnabled = shape.fillColorEnabled;
        this._setTypeColor(item_shape.fillColor, shape.fillColor);
        item_shape.lineWidth = shape.lineWidth;
        item_shape.dashSet = shape.dashSet;
        item_shape.lineAlignment = shape.lineAlignment;
        item_shape.lineCapType = shape.lineCapType;
        item_shape.lineJoinType = shape.lineJoinType;
        item_shape.shapeSize = shape.shapeSize;
        item_shape.radian = shape.radian;
    } catch (e)
    {
        console.error("GobCaryon.getLayerInfo_shape_byId id:", layerId, e)
    }


    return item_shape
}

GobCaryon.prototype.getLayerInfoObejct_smartObject = async function (layerId)
{
    // [smartObject]---------------------------------------------------------------
    var item_smartObject = this.__new_smartObject();


    try
    {
        var smartObject = await enzymes.getLayerInfo_smartObject_byId(layerId);
        item_smartObject.link = smartObject.link;
        item_smartObject.linked = smartObject.linked;
        item_smartObject.fileReference = smartObject.fileReference;
    } catch (e)
    {
        console.error("GobCaryon.getLayerInfoObejct_smartObject id:", layerId, e)
    }


    return item_smartObject
}


GobCaryon.prototype.getLayerInfoObejct_quickEffect = async function (layerId, getRaw)
{
    // [quickEffect]---------------------------------------------------------------
    var item_quickEffect = this.__new_quickEffect();


    try
    {
        var quickEffect = await enzymes.getLayerInfo_quickEffect_byId(layerId);
        item_quickEffect.dropShadow.enable = quickEffect.dropShadow.enable;
        item_quickEffect.dropShadow.opacity = quickEffect.dropShadow.opacity;
        this._setTypeColor(item_quickEffect.dropShadow.color, quickEffect.dropShadow.color);
        item_quickEffect.dropShadow.x = quickEffect.dropShadow.x;
        item_quickEffect.dropShadow.y = quickEffect.dropShadow.y;
        item_quickEffect.dropShadow.blur = quickEffect.dropShadow.blur;
        item_quickEffect.dropShadow.spread = quickEffect.dropShadow.spread;
        if (getRaw)
        {
            item_quickEffect.copyEffect_All = JSON.stringify(quickEffect.raw);
        } else
        {
            item_quickEffect.copyEffect_All = quickEffect.copyEffect_All;
        }

        item_quickEffect.copyEffect_dropShadow = quickEffect.copyEffect_dropShadow;
        item_quickEffect.copyEffect_innerShadow = quickEffect.copyEffect_innerShadow;
        item_quickEffect.copyEffect_chromeFX = quickEffect.copyEffect_chromeFX;
        item_quickEffect.copyEffect_frameFX = quickEffect.copyEffect_frameFX;
        item_quickEffect.copyEffect_bevelEmboss = quickEffect.copyEffect_bevelEmboss;
        item_quickEffect.copyEffect_innerGlow = quickEffect.copyEffect_innerGlow;
        item_quickEffect.copyEffect_outerGlow = quickEffect.copyEffect_outerGlow;
        item_quickEffect.copyEffect_patternFill = quickEffect.copyEffect_patternFill;
        item_quickEffect.copyEffect_solidFill = quickEffect.copyEffect_solidFill;
        item_quickEffect.copyEffect_gradientFill = quickEffect.copyEffect_gradientFill;
    } catch (e)
    {
        console.error("GobCaryon.getLayerInfoObejct_quickEffect id:", layerId, e)
    }


    return item_quickEffect
}


GobCaryon.prototype.getLayerInfoObejct_more = async function (layerId)
{
    // [more]---------------------------------------------------------------
    var item_more = this.__new_more();

    try
    {
        var moreInfo = await enzymes.getLayerInfo_more_byId(layerId);
        item_more.layerName = moreInfo.layerName;
        item_more.visible = moreInfo.visible;
        item_more.layerColor = moreInfo.layerColor;
        item_more.mode = moreInfo.mode;
        item_more.opacity = moreInfo.opacity;
        item_more.fillOpacity = moreInfo.fillOpacity;

    } catch (e)
    {
        console.error("GobCaryon.getLayerInfoObejct_more id:", layerId, e)
    }


    return item_more
}


GobCaryon.prototype._setTypeColor = function (typeColor, color)
{
    typeColor.r = color.r
    typeColor.g = color.g
    typeColor.b = color.b

    if (color.r == undefined || color.g == undefined || color.b == undefined)
    {

        typeColor.$hex = null;

    } else
    {
        ichiColor.set(color);
        typeColor.$hex = ichiColor.hex;
    }
}


/**
 * 更新选中图层对象的数据。会从“实际图层”和 DataCaryon 拉取图层数据到 Gob。
 * 默认情况下会触发渲染
 * @param disableRender 禁止 Gob 更新期间渲染图层
 * @returns {Promise.<void>}
 */
GobCaryon.prototype.updateGob = async function (disableRender)
{

    var self = this;
    logger.group("[updateGob]")
    console.time("updateGob 耗时")
    this.disableRender = disableRender || false;
    logger.pin("Gob", "GobCaryon.prototype.updateGo",
        `updateGob [START]`, "disableRender:" + this.disableRender)

    //----------1. 要拉取的数据：

    console.time("updateGob前期准备耗时")
    var temp = {};

    //属性注册[5/8`]
    var new_position = this.__new_position;
    var new_text = this.__new_text;
    var new_shape = this.__new_shape;
    var new_smartObject = this.__new_smartObject;
    var new_quickEffect = this.__new_quickEffect;
    var new_more = this.__new_more;

    //属性注册[6/8]
    temp.position = new_position();
    temp.text = new_text();
    temp.shape = new_shape();
    temp.smartObject = new_smartObject();
    temp.quickEffect = new_quickEffect();
    temp.more = new_more();
    console.timeEnd("updateGob前期准备耗时")


    console.time("拉取每个选中图层的数据")
    //----------2. 拉取每个选中图层的数据：
    try
    {
        if (this.selectList.length > 0)
        {
            if (this.selectList.length < setSystem.inset.selectMax)/*小于最大选中限制时，拉取每个图层的数据*/
            {
                for (var i = 0; i < this.selectList.length; i++)
                {

                    //属性注册[7/8]
                    //[position]---------------------------------------------------------------
                    console.time("position获取耗时")
                    var item_position = await this.getLayerInfoObejct_position(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_position, "position")
                    _objectToObject(item_position, temp.position, true, !(i == 0));
                    console.timeEnd("position获取耗时")

                    //[text]---------------------------------------------------------------
                    console.time("text获取耗时")
                    var item_text = await this.getLayerInfoObejct_text(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_text, "text")
                    _objectToObject(item_text, temp.text, true, !(i == 0));
                    console.timeEnd("text获取耗时")

                    // [shape]---------------------------------------------------------------
                    console.time("shape获取耗时")
                    var item_shape = await this.getLayerInfoObejct_shape(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_shape, "shape")
                    _objectToObject(item_shape, temp.shape, true, !(i == 0));
                    console.timeEnd("shape获取耗时")

                    // [smartObject]---------------------------------------------------------------
                    console.time("smartObject获取耗时")
                    var item_smartObject = await this.getLayerInfoObejct_smartObject(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_smartObject, "smartObject")
                    _objectToObject(item_smartObject, temp.smartObject, true, !(i == 0));
                    console.timeEnd("smartObject获取耗时")


                    // [quickEffect]---------------------------------------------------------------
                    console.time("quickEffect获取耗时")
                    var item_quickEffect = await this.getLayerInfoObejct_quickEffect(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_quickEffect, "quickEffect")
                    _objectToObject(item_quickEffect, temp.quickEffect, true, !(i == 0));
                    console.timeEnd("quickEffect获取耗时")

                    // [more]---------------------------------------------------------------
                    console.time("more获取耗时")
                    var item_more = await this.getLayerInfoObejct_more(this.selectList[i].id);
                    _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_more, "more")
                    _objectToObject(item_more, temp.more, true, !(i == 0));
                    console.timeEnd("more获取耗时")
                }
            } else/*大于最大选中限制时，忽略*/
            {
                console.log("GobCaryon.updateGob 大于最大选中限制时，忽略")
                _setObejctAll(temp, Gob.MULT)
                Gob.position.$anchor = setSystem.gob.$anchor;

                function _setObejctAll(object, value)
                {

                    for (var v in object)
                    {
                        if (v != 'enableAssigns')
                        {
                            if (object[v] instanceof Object)
                            {
                                _setObejctAll(object[v], value)

                            } else
                            {
                                object[v] = value
                            }
                        }
                    }
                }


            }
        }
    } catch (e)
    {
        console.error("GobCaryon.updateGob 拉取每个选中图层的数据", e)
    }
    console.timeEnd("拉取每个选中图层的数据")
    //属性注册[8/8]

    console.group("====_objectToObject_async====================================================")

    console.time("属性赋值到Gob耗时")
    // console.group("--position--------------------------", temp.position)


    try
    {
        console.time("属性赋值到 Gob.XXX 耗时")
        // console.time("属性赋值到Gob.position耗时")
        await _objectToGob_async(temp.position, ["position"], this)
        // console.timeEnd("属性赋值到Gob.position耗时")
        // console.groupEnd()

        // console.group("--text--------------------------", temp.text,)
        // console.time("属性赋值到Gob.text耗时")
        await _objectToGob_async(temp.text, ["text"], this)
        // console.timeEnd("属性赋值到Gob.text耗时")
        // console.groupEnd()

        // console.group("--shape--------------------------", temp.shape,)
        // console.time("属性赋值到Gob.shape耗时")
        await _objectToGob_async(temp.shape, ["shape"], this)
        // console.timeEnd("属性赋值到Gob.shape耗时")
        // console.groupEnd()

        // console.group("--smartObject--------------------------", temp.smartObject,)
        // console.time("属性赋值到Gob.smartObject耗时")
        await _objectToGob_async(temp.smartObject, ["smartObject"], this)
        // console.timeEnd("属性赋值到Gob.smartObject耗时")
        // console.groupEnd()

        // console.group("--quickEffect--------------------------", temp.quickEffect,)
        // console.time("属性赋值到Gob.quickEffect耗时")
        await _objectToGob_async(temp.quickEffect, ["quickEffect"], this)
        // console.timeEnd("属性赋值到Gob.quickEffect耗时")
        // console.groupEnd()

        // console.group("--more--------------------------", temp.more,)
        // console.time("属性赋值到Gob.more耗时")
        await _objectToGob_async(temp.more, ["more"], this)
        // console.timeEnd("属性赋值到Gob.more耗时")
        // console.groupEnd()


        console.timeEnd("属性赋值到 Gob.XXX 耗时")
    } catch (e)
    {
        console.error("GobCaryon.updateGob _objectToGob_async", e)
    }


    console.timeEnd("属性赋值到Gob耗时")
    console.info("============")
    console.groupEnd()


    setTimeout(function ()
    {
        self.disableRender = false;//恢复默认值；
        self._neverUpdate = false //未更新过 = false
        self.nowSwitching = false
        console.log("【this.nowSwitching = false】")
    }, 800)


    // this.nowSwitching = false;
    // this._asyncSetSwitch = false;

    // //----------------更新图层后渲染
    // console.log("this.selectRender:", this.selectRender, " varSystem.autoRender", setSystem.autoRender, " selectChanged:", this.selectChanged,
    //     " renderCaryon.status.rendering:", renderCaryon.status.rendering,
    // )
    // console.log("this.selectRenderVarList:", this.selectRenderVarList)
    //
    //
    // if (this.selectRender && setSystem.autoRender && !this.selectChanged && !renderCaryon.status.rendering)
    // {
    //     if (this.selectRenderVarList != undefined && this.selectRenderVarList.length > 0)
    //     {
    //         console.log("更新图层后渲染")
    //         // renderCaryon.renderDocument(true, this.selectRenderVarList)
    //     }
    // }
    console.groupEnd();


    if (this._unripe)
    {
        setTimeout(function ()
        {
            self._unripe = false;
            logger.info("[准备完成] _unripe")
        }, 500)

    }
    console.timeEnd("updateGob 耗时")
    logger.groupEnd()


    //[END]-----------------


    function _setValue(oldValue, value, ignoreNull)
    {
        if (oldValue == undefined)
        {
            if (ignoreNull)
            {

            }
            else
            {
                return value;
            }

        }

        // console.log(oldValue + ":" + value + " MULT " + (oldValue != value))
        if (oldValue == GobCaryon.prototype.MULT || oldValue != value)
        {
            return GobCaryon.prototype.MULT;
        } else
        {
            return value;
        }
    }


    /**
     * 从 dataCaryon 拉取数据
     */
    function _fromDataCaryon(layerData, object, objectName)
    {//layerData : dataCaryon.layers[layerId]

        if (layerData == undefined)
        {
            return null
        }

        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                if (layerData[objectName] != undefined)
                {
                    if (layerData[objectName][x] != undefined)
                    {
                        _fromDataCaryon(layerData[objectName], object[x], x)
                    }
                }

            } else
            {
                if (layerData[objectName] != undefined)
                {
                    if (layerData[objectName][x] != undefined)
                    {
                        if (object[x] != Gob.MULT)
                        {
                            object[x] = layerData[objectName][x];
                        }

                    }
                }
            }
        }

    }


    function _objectToObject(object, sameObject, checkMUTI, ignoreNull, asyncCounter)
    {

        for (var x in object)
        {
            // console.log(" x in object：", x)
            if ((object[x] != undefined) && (object[x].constructor == Object))
            {
                if (sameObject[x] == undefined)
                {
                    sameObject[x] = {};
                }

                // console.log(
                //     "【_objectToObject-2】:", object[x], sameObject[x], {
                //         x: x,
                //         "object[x]": object[x],
                //         "sameObject[x]": sameObject[x]
                //     }
                // )
                _objectToObject(object[x], sameObject[x], checkMUTI, ignoreNull, asyncCounter)
            } else
            {
                // if (asyncCounter)
                // {
                //     if (sameObject[x] != object[x])
                //     {
                //         Gob._asyncSetCounter++;
                //         console.log("[+]" + x, "   " + Gob._asyncSetCounter)
                //     }
                // }

                if (checkMUTI)
                {
                    sameObject[x] = _setValue(sameObject[x], object[x], ignoreNull)
                } else
                {
                    sameObject[x] = object[x]
                }

            }
        }

    }


    async function _objectToGob_async(srcObject, names, gobThis)
    {

        if (names == undefined)
        {
            names = [];
        }

        for (var x in srcObject)
        {
            var nowNames = names.slice(0)
            nowNames.push(x);

            // console.log("names:", names, "nowNames:", nowNames)
            if ((srcObject[x] != undefined) && (srcObject[x].constructor == Object))
            {
                await _objectToGob_async(srcObject[x], nowNames.slice(0), gobThis)
            } else
            {
                await gobThis._setData(nowNames, srcObject[x], true)
            }
        }

    }


    function _objectToObject_asyncSetCounter(object, sameObject, checkMUTI, ignoreNull, asyncCounter)
    {
        var _temp = 0
        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                if (sameObject[x] == undefined)
                {
                    sameObject[x] = {};
                }
                _objectToObject_asyncSetCounter(object[x], sameObject[x], checkMUTI, ignoreNull, asyncCounter)
            } else
            {
                if (asyncCounter)
                {
                    if (sameObject[x] != object[x])
                    {
                        _temp++;
                    }
                }
            }
        }

        if (_temp > 0)
        {
            Gob._asyncSetCounter += _temp;

            console.log("ob._asyncSetCounter +=", _temp, JSON.stringify(object))
        }
    }


}


function _objectToObject(object, sameObject, checkMUTI, ignoreNull, asyncCounter)
{

    for (var x in object)
    {
        // console.log(" x in object：", x)
        if ((object[x] != undefined) && (object[x].constructor == Object))
        {
            if (sameObject[x] == undefined)
            {
                sameObject[x] = {};
            }

            // console.log(
            //     "【_objectToObject-2】:", object[x], sameObject[x], {
            //         x: x,
            //         "object[x]": object[x],
            //         "sameObject[x]": sameObject[x]
            //     }
            // )
            _objectToObject(object[x], sameObject[x], checkMUTI, ignoreNull, asyncCounter)
        } else
        {
            // if (asyncCounter)
            // {
            //     if (sameObject[x] != object[x])
            //     {
            //         Gob._asyncSetCounter++;
            //         console.log("[+]" + x, "   " + Gob._asyncSetCounter)
            //     }
            // }

            if (checkMUTI)
            {
                sameObject[x] = _setValue(sameObject[x], object[x], ignoreNull)
            } else
            {
                sameObject[x] = object[x]
            }

        }
    }

}

//----------------------------------------------------------------------------
//segment：

/**
 * 导出 Gob 各项的 json 文本
 * @param segment Gob 项
 * @param enableAssign 是否导出 Assign 内容
 *
 */
GobCaryon.prototype.exportGobRNA = function (segment, enableAssign, use_mRNA, format)
{
    var self = this;
    var segment = segment.toLowerCase()


    if (format == true)
    {
        var format = 2;
    } else
    {
        var format = 0;
    }

    if (segment === "position")
    {
        var ob = {}
        _copyOb(Gob.position, ob)
        return returnFilter(JSON.stringify({position: ob}, null, format))
    }
    else if (segment === "text")
    {
        var ob = {}
        _copyOb(Gob.text, ob)
        return returnFilter(JSON.stringify({text: ob}, null, format))
    }
    else if (segment === "shape")
    {
        var ob = {}
        _copyOb(Gob.shape, ob)

        delete ob.shapeSize;
        return returnFilter(JSON.stringify({shape: ob}, null, format))
    }
    else if (segment === "smartObject")
    {
        var ob = {}
        _copyOb(Gob.smartObject, ob)
        return returnFilter(JSON.stringify({smartObject: ob}, null, format))
    }
    else if (segment.toLowerCase() === "quickEffect")
    {
        var ob = {}
        _copyOb(Gob.quickEffect, ob)
        return returnFilter(JSON.stringify({quickEffect: ob}, null, format))
    }
    else if (segment === "more")
    {
        var ob = {}
        _copyOb(Gob.more, ob)
        return returnFilter(JSON.stringify({more: ob}, null, format))
    }

    function returnFilter(value)
    {

        if (use_mRNA)
        {
            return self.mRNA_encode(value, segment)

        } else
        {
            return value
        }


    }

    function _copyOb(ob, newOb)
    {
        for (var x in ob)
        {
            if (x[0] != undefined && x[0] != "_")
            {
                if (enableAssign)
                {
                } else
                {
                    if (x == "assignment" || x == "enableAssigns")
                    {
                        continue
                    }
                }


                if (TYP.type(ob[x]) === "object")
                {
                    newOb[x] = {}
                    _copyOb(ob[x], newOb[x])

                } else
                {
                    newOb[x] = ob[x]
                }
            }
        }

    }
}


GobCaryon.prototype.importGobRNA = function (segment, gobRNA)
{
    var segment = segment.toLowerCase()


    if (gobRNA.length > 8)
    {
        var head = gobRNA.slice(0, 7);
        if ((head === "UI-mRNA" || head === "UI-DNA-"))
        {
            gobRNA = this.mRNA_decode(gobRNA)
        }
    }


    if (segment === "position")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.position === "object")
        {
            _objectToObject(ob.position, this.position, false, true)
        }
    }
    else if (segment === "text")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.text === "object")
        {
            _objectToObject(ob.text, this.text, false, true)
        }
    }
    else if (segment === "shape")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.shape === "object")
        {
            _objectToObject(ob.shape, this.shape, false, true)
        }
    }
    else if (segment === "smartObject")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.smartObject === "object")
        {
            _objectToObject(ob.smartObject, this.smartObject, false, true)
        }
    }
    else if (segment === "quickEffect")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.quickEffect === "object")
        {
            _objectToObject(ob.quickEffect, this.quickEffect, false, true)
        }
    }
    else if (segment === "more")
    {
        var ob = JSON.parse(gobRNA)
        if (typeof ob.more === "object")
        {
            _objectToObject(ob.more, this.more, false, true)
        }
    }

}


GobCaryon.prototype.exportEffectRNA = async function (mRNA_encode, format)
{

    if (format == true)
    {
        var format = 2;
    } else
    {
        var format = 0;
    }


    if (Gob.selectList[0] != undefined)
    {
        var id = Gob.selectList[0].id;
        var quickEffect = await Gob.getLayerInfoObejct_quickEffect(id, true);
        var ob = JSON.parse(quickEffect.copyEffect_All)


        //删除无用项
        if (ob != undefined && typeof ob.value === "object")
        {
            for (var x in  ob.value)
            {
                if (ob.value[x].value != undefined)
                {
                    if (ob.value[x].value["enabled"] != undefined)
                    {
                        if (ob.value[x].value.enabled.value === false)
                        {
                            delete  ob.value[x]
                        }
                    } else
                    {
                        for (var i in  ob.value[x].value)
                        {
                            if (ob.value[x].value[i].value != undefined && ob.value[x].value[i].value["enabled"] != undefined)
                            {
                                if (ob.value[x].value[i].value["enabled"].value === false)
                                {
                                    delete  ob.value[x].value[i]
                                }

                            }
                        }

                        if (OBJ.isEmptyObject(ob.value[x].value))
                        {
                            delete   ob.value[x]
                        }

                    }
                }
            }
        }


        var more = await Gob.getLayerInfoObejct_more(id);

        ob = {
            copyEffect_All: ob,
            more: {
                mode: more.mode,
                opacity: more.opacity,
                fillOpacity: more.fillOpacity,
            }
        }

        var rna = JSON.stringify(ob, null, format)
        if (mRNA_encode)
        {
            rna = this.mRNA_encode(rna, "Effect")
        }
        return rna
    }
}

GobCaryon.prototype.importEffectRNA = async function (str)
{
    console.log("importEffectRNA", str)
    if (str.length > 8)
    {
        var head = str.slice(0, 7);
        if ((head === "UI-mRNA" || head === "UI-DNA-"))
        {
            str = this.mRNA_decode(str)
        }

        var ob = JSON.parse(str)

        if (typeof ob.copyEffect_All === "object")
        {
            if (this.selectList.length > 1)
            {
                var save = await enzymes.selectSave();
            }


            this.stopSelectEvent = true
            for (var x in this.selectList)
            {
                await  enzymes.selectLayer_byID(this.selectList[x].id)
                await enzymes.setLayerInfo_quickEffect_byId(ob, this.selectList[x].id)

                console.log(ob.more)
                if (typeof ob.more === "object")
                {
                    await enzymes.setLayerInfo_more_byId(ob.more, this.selectList[x].id)
                }

            }

            if (this.selectList.length > 1)
            {
                await enzymes.selectLoad(save);
            }
            this.stopSelectEvent = false
            this.updateGob(true)

        }

    }


}


//压缩字符串
GobCaryon.prototype.mRNA_encode = function (text, signMark)
{
    var buffer = zlib.deflateSync(text)
    var rnaStr = base65536.encode(buffer);

    //添加标识文本
    if (signMark != undefined)
    {
        rnaStr = "UI-mRNA-" + signMark + ":{" + rnaStr + "}"
    }
    return rnaStr;
}

//解压字符串
GobCaryon.prototype.mRNA_decode = function (rnaStr)
{
    //忽略标识文本
    if (rnaStr.length > 8)
    {
        var head = rnaStr.slice(0, 7);
        var last = rnaStr.slice(-1);
        if ((head === "UI-mRNA" || head === "UI-DNA-") && last === "}")
        {
            var firstM = rnaStr.search("{")
            rnaStr = rnaStr.slice(firstM + 1, -1)
        }
    }


    var buffer = base65536.decode(rnaStr);
    var rawBuffer = zlib.unzipSync(buffer)
    return rawBuffer.toString();
}


// GobCaryon.prototype.exportGobRNA


// 代表多值的常量
GobCaryon.prototype.MULT = "%$*/Gob-MUTIPLE/*$%";

/**
 * 把值赋予指定对象指定路径成员
 *
 * @param toObject 欲赋值目标对象
 * @param objectNames 对象成员的路径，即名称数组（数字如 a.b.c 为 ["a","b","c"] ）
 * @param nameIndex 路径起始位置，通常从 0 开始
 * @param value 要设置的值
 * @param prefix 是否设置前缀"_",为真的话，会赋值到带前缀的成员，（如指定路径 a.b.c 会赋值到 a.b._c）
 * @param deleteNOTupdateGob 当 value 为 "" 删除原值时，不更新 Gob
 * @private
 */
function _valueToObject(toObject, objectNames, nameIndex, value, prefix, deleteNOTupdateGob)
{
    var isLastName = nameIndex == objectNames.length - 1

    if (toObject[objectNames[nameIndex]] == undefined && isLastName != true)
    {
        toObject[objectNames[nameIndex]] = {};
    }

    if (isLastName != true)
    {
        return _valueToObject(toObject[objectNames[nameIndex]], objectNames, nameIndex + 1, value, prefix, deleteNOTupdateGob)
    } else
    {
        if (prefix)
        {
            var change = (toObject["_" + objectNames[nameIndex]] != value);
            toObject["_" + objectNames[nameIndex]] = value;

            return change;//返回是否改变原值

        } else
        {
            if (value === "")
            {
                if (toObject[objectNames[nameIndex]] != undefined)
                {
                    delete  toObject[objectNames[nameIndex]];


                    if (deleteNOTupdateGob != true)
                    {
                        console.log("delete to Gob.updateGob.")
                        Gob.updateGob(true);
                    }


                }

                return "delete";
            }
            var change = ( toObject[objectNames[nameIndex]] != value);
            toObject[objectNames[nameIndex]] = value;
            return change;//返回是否改变原值
        }

    }
}


/**
 * 根据属性名路径列表（names）获取对象属性的值
 * @param object 对象
 * @param names 属性名路径列表，如 [position,enableAssigns,y]
 * @param aheadEndTime 提取结束个数，如设置为 1 则是获取倒数第 2 个属性的值，
 * @returns {*}
 * @private
 */
function _getObjectValueByNames(object, names, aheadEndTime)
{
    var nowValue;
    for (var i = 0; i < (names.length - (aheadEndTime || 0)); i++)
    {
        if (i == 0)
        {

            if (object[names[i]] != undefined)
            {
                nowValue = object[names[i]];
            } else
            {
                return null
            }

        } else
        {
            if (nowValue[names[i]] != undefined)
            {
                nowValue = nowValue[names[i]];
            } else
            {
                return null
            }
        }

    }

    return nowValue
}


function _inArray(name, array)
{
    for (var x in array)
    {
        if (name == array[x])
        {
            return true;
        }
    }
    return false;
}
//----------------------------------------

export default GobCaryon;
